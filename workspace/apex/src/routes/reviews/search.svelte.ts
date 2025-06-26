import type { Items } from '$lib/content';
import { compare, date, inspect } from 'mauss';

export type Query = {
	search: string;
	category: string;
	genres: string[];
	verdict: string;
	sort_by: keyof typeof by;
};

export function sift(items: Items['reviews/'], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const filters = [
			payload.category && payload.category !== item.category,
			payload.verdict && payload.verdict !== item.verdict,
			payload.genres.length && !payload.genres.every((g) => item.genres.includes(g)),
		];
		const flags = [
			item.slug.includes(value),
			item.released.includes(value),
			normalize(item.title.en).includes(value),
			item.title.jp && normalize(item.title.jp).includes(value),
		];
		return filters.every((h) => !h) && flags.some((f) => f);
	});
	return results.sort(by[payload.sort_by]);
}

function normalize(str: string): string {
	return str.replace(/[(){}[\]<>"']/g, '').toLowerCase();
}

export const by = {
	date(x, y) {
		if (x.date !== y.date) return fallback(x, y);
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
} satisfies Record<string, (x: Schema, y: Schema) => number>;
type Schema = Items['reviews/'][number];
function fallback(x: Schema, y: Schema): number {
	if (x.date && y.date && x.date !== y.date) {
		return date.sort.newest(x.date, y.date);
	}
	if (x.released && y.released && x.released !== y.released) {
		return -date(x.released).delta(y.released);
	}
	return inspect(x, y);
}
