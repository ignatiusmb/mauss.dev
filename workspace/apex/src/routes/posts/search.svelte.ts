import type { Schema } from '$content/posts.json/+server';
import { date } from 'mauss';

export interface Query {
	search: string;
	series: string;
	theme: string;
	tags: string[];
	sort_by: keyof typeof by;
}

export interface Item extends Omit<Schema['items'][number], 'content'> {}

export function sift(items: Item[], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const series = item.series?.title.toLowerCase().replace(/ /g, '-');
		const filters = [
			payload.series && (!item.series || payload.series !== series),
			payload.theme && payload.theme !== item.theme,
			payload.tags.length && !payload.tags.every((g) => item.tags.includes(g)),
		];
		const flags = [
			item.slug.includes(value),
			normalize(item.title).includes(value),
			item.description && normalize(item.description).includes(value),
		];
		return filters.every((h) => !h) && flags.some((f) => f);
	});
	return results.sort(by[payload.sort_by]);
}

function normalize(str: string): string {
	return str.replace(/[(){}[\]<>"']/g, '').toLowerCase();
}

type By<T extends string> = { [K in T]: (x: Item, y: Item) => number };
export const by: By<Schema['metadata']['sort_by'][number][0]> = {
	date(x, y) {
		return date.sort.newest(x.date, y.date);
	},
	updated(x, y) {
		return date.sort.newest(x.updated || x.date, y.updated || y.date);
	},
};
