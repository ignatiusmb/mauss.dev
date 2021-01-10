import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { contentParser } from './article';
import { sortCompare, splitAt } from './helper';
import marker from './marker';

const countReadTime = (content: string) => {
	const paragraphs = content.split('\n').filter((p) => {
		return p && !/^[!*]/.test(p); // remove empty and not sentences
	});
	const words = paragraphs.reduce((acc, cur) => {
		if (cur.trim().startsWith('<!--')) return acc;
		if (cur.trim().match(/^\r?\n<\S+>/)) return acc;
		const wordCount = cur.split(' ').filter(Boolean);
		return acc + wordCount.length;
	}, 0);
	const images = content.match(/(!\[.+\]\(.+\))/g);
	const total = words + (images || []).length * 12;
	return Math.round(total / 240) || 1;
};

const extractMeta = (metadata: string) => {
	if (!metadata) return {};
	const lines = metadata.split(/\r?\n/);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return lines.reduce((acc: Record<string, any>, cur) => {
		if (!cur.includes(': ')) return acc;
		const [key, val] = splitAt(cur.indexOf(': '), cur);

		if (key.includes(':')) {
			const [attr, category] = splitAt(key.indexOf(':'), key);
			if (!acc[attr]) acc[attr] = {};
			acc[attr][category] = val.trim();
		} else if (val.includes(',') && key !== 'description') {
			const items = val.split(',').map((v) => v.trim());
			acc[key] = items.filter(Boolean);
		} else acc[key] = val.trim();

		return acc;
	}, {});
};

export interface HydrateFn<I, O = I> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(data: { frontMatter: I | any; content: string; filename: string }): O | undefined;
}

export function parseFile<I, O = I>(pathname: string, hydrate: HydrateFn<I, O>): O;
export function parseFile<I, O = I>(pathname: string, hydrate: HydrateFn<I, O>): O | undefined {
	const content = readFileSync(pathname, 'utf-8');
	const fmExpression = /---\r?\n([\s\S]+?)\r?\n---/;
	const [rawData, metadata] = fmExpression.exec(content) || ['', ''];

	const frontMatter = extractMeta(metadata);
	const [filename] = pathname.split(/[/\\]/).slice(-1);
	const article = metadata ? content.slice(rawData.length + 1) : content;
	const result = <
		{ date?: { published?: string; updated?: string }; content?: string; read_time?: number }
	>hydrate({ frontMatter, content: article, filename });
	if (!result) return;

	if (result.date && result.date.published && !result.date.updated) {
		result.date.updated = result.date.published;
	}

	result.read_time = countReadTime(article);
	if (result.content) {
		const { content, ...rest } = result;
		result.content = contentParser(rest, content);
		result.content = marker.render(result.content);
	}
	return result as O;
}

export function parseDir<I, O = I>(dirname: string, hydrate: HydrateFn<I, O>): O[];
export function parseDir<I, O = I>(dirname: string, hydrate: HydrateFn<I, O>): (O | undefined)[] {
	return readdirSync(dirname)
		.filter((name) => !name.startsWith('draft.') && name.endsWith('.md'))
		.map((filename) => parseFile(join(dirname, filename), hydrate))
		.sort(sortCompare);
}
