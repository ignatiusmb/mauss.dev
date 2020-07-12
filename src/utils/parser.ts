import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { sortCompare, splitAt } from './helper';
import Aqua from '@ignatiusmb/aqua';
const markIt = require('markdown-it')({
	html: true,
	typographer: true,
	highlight: (str: string, language: string) => {
		const strList = str.split('\n');
		const dataset = { language };
		if (strList[0][0] === '~') {
			const [title, lineNumber] = strList[0].split('#');
			dataset['title'] = title.slice(1);
			if (lineNumber) dataset['lineStart'] = parseInt(lineNumber);
		}
		const content = strList.slice(dataset['title'] ? 1 : 0).join('\n');
		return Aqua.code.highlight(content, dataset);
	},
});

const countAverageRating = (str: string) => {
	const ratings = str.split(',').map((v) => parseInt(v.trim()));
	return ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
};

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

const extractMeta = (metadata: string) =>
	metadata.split(/\r?\n/).reduce((acc, cur: string) => {
		if (!cur.includes(': ')) return acc;
		const [key, val]: [string, string] = splitAt(cur.indexOf(': '), cur);

		if (key === 'tags' || key === 'genres') {
			acc[key] = val.split(',').map((v: string) => v.trim());
		} else if (key === 'rating') {
			acc[key] = countAverageRating(val);
		} else if (key.slice(0, 4) === 'link') {
			if (!acc['link']) acc['link'] = [];
			if (!key.includes(':')) acc['link'] = val.trim();
			else acc['link'].push({ name: key.slice(5), url: val.trim() });
		} else if (key.includes(':')) {
			const [attr, category] = splitAt(key.indexOf(':'), key);
			if (!acc[attr]) acc[attr] = {};
			acc[attr][category] = val.trim();
		} else acc[key] = val.trim();

		return acc;
	}, {});

export const aquaMark = (content: string) => markIt.render(content);

export function parseFile(filename: string, parseCallback: Function) {
	const content = readFileSync(filename, 'utf-8');
	const fmExpression = /---\r?\n([\s\S]+?)\r?\n---/;
	const [rawData, metadata] = fmExpression.exec(content);

	const frontMatter = extractMeta(metadata);
	const [cleanedFilename] = filename.split(/[\/\\]/).slice(-1);
	const article = content.slice(rawData.length + 1);
	const result = parseCallback(frontMatter, article, cleanedFilename);

	if (result.date_published && !result.date_updated) {
		result.date_updated = result.date_published;
	}

	result.read_time = countReadTime(article);
	result.content = aquaMark(result.content);
	return result;
}

export function parseDir(dirname: string, fileParse: Function) {
	return readdirSync(dirname)
		.filter((name) => !name.startsWith('draft.') && name.endsWith('.md'))
		.map((filename) => parseFile(join(dirname, filename), fileParse))
		.sort(sortCompare);
}
