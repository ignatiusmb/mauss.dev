import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { contentParser } from './article';
import { sortCompare, splitAt } from './helper';
import Aqua from '@ignatiusmb/aqua';
const markIt = require('markdown-it')({
	html: true,
	typographer: true,
	highlight: (str: string, language: string) => {
		const strList = str.split('\n');
		const dataset: any = { language };
		if (strList[0][0] === '~') {
			const [title, lineNumber] = strList[0].split('#');
			dataset['title'] = title.slice(1);
			if (lineNumber) dataset['lineStart'] = parseInt(lineNumber);
		}
		const content = strList.slice(dataset['title'] ? 1 : 0).join('\n');
		return Aqua.code.highlight(content, dataset);
	},
});

const countReadTime = (content: string) => {
	const paragraphs = content.split('\n').filter((p) => p);
	const words = paragraphs.reduce((acc, cur) => {
		if (cur.trim().startsWith('<!--')) return acc;
		if (cur.trim().match(/^\r?\n<\S+>/)) return acc;
		const wordsArray = cur.split(' ').filter((w) => w);
		return acc + wordsArray.length;
	}, 0);
	const images = content.match(/(!\[.+\]\(.+\))/g);
	const total = words + (images ? images.length * 12 : 0);
	const time = Math.round(total / 270);
	return time ? time : 1;
};

const extractMeta = (metadata: string) => {
	if (!metadata) return {};
	const lines = metadata.split(/\r?\n/);
	return lines.reduce((acc: { [key: string]: any }, cur: string) => {
		if (!cur.includes(': ')) return acc;
		const [key, val]: [string, string] = splitAt(cur.indexOf(': '), cur);

		if (key.includes(':')) {
			const [attr, category] = splitAt(key.indexOf(':'), key);
			if (!acc[attr]) acc[attr] = {};
			acc[attr][category] = val.trim();
		} else if (val.includes(',')) {
			const items = val.split(',').map((v) => v.trim());
			acc[key] = items.filter(Boolean);
		} else acc[key] = val.trim();

		return acc;
	}, {});
};

export const aquaMark = (content: string) => markIt.render(content);

export function parseFile(filename: string, hydrate: Function) {
	const content = readFileSync(filename, 'utf-8');
	const fmExpression = /---\r?\n([\s\S]+?)\r?\n---/;
	const [rawData, metadata] = fmExpression.exec(content) || ['', ''];

	const frontMatter = extractMeta(metadata);
	const [cleanedFilename] = filename.split(/[/\\]/).slice(-1);
	const article = metadata ? content.slice(rawData.length + 1) : content;
	const result = hydrate(frontMatter, article, cleanedFilename);
	if (!result) return;

	if (result.date && result.date.published && !result.date.updated) {
		result.date.updated = result.date.published;
	}

	result.read_time = countReadTime(article);
	if (result.content) {
		const { content, ...rest } = result;
		result.content = contentParser(rest, content);
		result.content = aquaMark(result.content);
	}
	return result;
}

export function parseDir(dirname: string, hydrate: Function) {
	return readdirSync(dirname)
		.filter((name) => !name.startsWith('draft.') && name.endsWith('.md'))
		.map((filename) => parseFile(join(dirname, filename), hydrate))
		.sort(sortCompare);
}
