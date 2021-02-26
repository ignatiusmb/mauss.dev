import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { isExists } from 'mauss/guards';
import { contentParser } from './article';
import { sortCompare } from './helper';
import marker from './marker';

const clean = (arr: string[]) => arr.filter(isExists);

const countReadTime = (content: string) => {
	const paragraphs = content.split('\n').filter((p) => {
		return !!p && !/^[!*]/.test(p); // remove empty and not sentences
	});
	const words = paragraphs.reduce((acc, cur) => {
		if (/^[\t\s]*<.+>/.test(cur.trim())) return acc + 1;
		return acc + clean(cur.trim().split(' ')).length;
	}, 0);
	const images = content.match(/!\[.+\]\(.+\)/g);
	const total = words + (images || []).length * 12;
	return Math.round(total / 240) || 1;
};

const extractMeta = (metadata = '') => {
	const lines = clean(metadata.split(/\r?\n/));
	if (!lines.length) return {};
	const ignored = ['description'];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const traverse = (curr: any, keys: string[], val: string | string[]): any => {
		if (!keys.length) return val instanceof Array ? clean(val) : val;
		return { ...curr, [keys[0]]: traverse(curr[keys[0]] || {}, keys.slice(1), val) };
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return lines.reduce((acc: Record<string, any>, cur) => {
		const [, key = '', data = ''] = cur.trim().match(/([:\w]+): (.+)/) || [];
		if (ignored.includes(key)) return (acc[key] = data.trim()), acc;
		const val = /,/.test(data) ? data.split(',').map((v) => v.trim()) : data.trim();
		if (/:/.test(key)) {
			const [attr, ...keys] = clean(key.split(':'));
			acc[attr] = traverse(acc[attr] || {}, keys, val);
		} else if (key && val) acc[key] = val instanceof Array ? clean(val) : val;
		return acc;
	}, {});
};

interface HydrateFn<I, O = I> {
	(data: { frontMatter: I; content: string; filename: string }): O | undefined;
}

export function parseFile<I, O = I>(pathname: string, hydrate: HydrateFn<I, O>): O;
export function parseFile<I, O = I>(pathname: string, hydrate: HydrateFn<I, O>): O | undefined {
	const content = readFileSync(pathname, 'utf-8');
	const fmExpression = /---\r?\n([\s\S]+?)\r?\n---/;
	const [rawData, metadata] = fmExpression.exec(content) || ['', ''];

	const extracted = extractMeta(metadata);
	const [filename] = pathname.split(/[/\\]/).slice(-1);
	const article = metadata ? content.slice(rawData.length + 1) : content;
	const result = <typeof extracted>(
		hydrate({ frontMatter: <I>extracted, content: article, filename })
	);
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
