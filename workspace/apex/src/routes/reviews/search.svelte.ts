import type { Schema } from '$content/reviews.json/+server';
import { arrange, compare, date, inspect } from 'mauss';

export type Query = {
	search: string;
	tier: string;
	category: string;
	genres: string[];
	sort_by: keyof typeof by;
};

export type Item = Omit<Schema['items'][number], 'branches' | 'content'>;

export function sift(items: Item[], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const filters = [
			payload.tier && payload.tier !== item.tier,
			payload.category && payload.category !== item.category,
			payload.genres.length && !payload.genres.every((g) => item.genres.includes(g)),
		];
		const flags = [
			item.slug.includes(value),
			item.released.includes(value),
			normalize(item.title).includes(value),
			item.alias && item.alias.some((a) => normalize(a).includes(value)),
			item.romaji && normalize(item.romaji).includes(value),
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
		const xr = Number.isNaN(Number(x.rating)) ? +!!x.rating : Number(x.rating);
		const yr = Number.isNaN(Number(y.rating)) ? +!!y.rating : Number(y.rating);
		return xr === yr ? fallback(x, y) : yr - xr;
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
