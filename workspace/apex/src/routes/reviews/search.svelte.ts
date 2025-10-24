import type { Schema } from '$content/reviews.json/+server';
import { arrange, compare, date, inspect } from 'mauss';

export interface Query {
	search: string;
	tier: string;
	category: string;
	genres: string[];
	sort_by: keyof typeof by;
}

export interface Item extends Omit<Schema['items'][number], 'branches' | 'content'> {}

export function sift(items: Item[], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const filters = [
			payload.tier && payload.tier.toLowerCase() !== item.tier.toLowerCase(),
			payload.category && payload.category.toLowerCase() !== item.category,
			payload.genres.length && !payload.genres.every((g) => item.genres.includes(g.toLowerCase())),
		];
		const flags = [
			item.slug.includes(value),
			item.released.includes(value),
			normalize(item.title).includes(value),
			item.alias.some((a) => normalize(a).includes(value)),
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
		if (x.date === y.date) return fallback(x, y);
		return date.sort.newest(x.date, y.date);
	},
	premiere(x, y) {
		if (x.released === y.released) return fallback(x, y);
		return date.sort.newest(x.released, y.released);
	},
	rating(x, y) {
		if (x.rating == null) return 1;
		if (y.rating == null) return -1;
		if (x.rating === y.rating && x.tier !== y.tier) return by.tier(x, y);
		return arrange(['peak', 'solid', 'mid', 'weak', 'trash'])(x.rating, y.rating);
	},
	seen(x, y) {
		const xd = [x.seen.last, x.seen.first].filter((d) => d != null);
		const yd = [y.seen.last, y.seen.first].filter((d) => d != null);
		return (
			compare.number(
				Math.max(...xd.map((d) => +new Date(d))),
				Math.max(...yd.map((d) => +new Date(d))),
			) || fallback(x, y)
		);
	},
	tier(x, y) {
		if (x.tier === y.tier) return by.rating(x, y);
		return arrange(['S', 'A', 'B', 'C', 'D', '?'])(x.tier, y.tier);
	},
};
function fallback(x: Item, y: Item): number {
	if (x.date && y.date && x.date !== y.date) {
		return date.sort.newest(x.date, y.date);
	}
	if (x.released && y.released && x.released !== y.released) {
		return date.sort.newest(x.released, y.released);
	}
	return inspect(x, y);
}
