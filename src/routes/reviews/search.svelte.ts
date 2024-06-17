import type { Schema } from '$content/reviews.json/+server.js';
import { compare } from 'mauss';

type Item = Schema['items'][number];

function fallback(x: Item, y: Item): number {
	if (x.date && y.date && x.date !== y.date) return compare.date(x.date, y.date);
	if (x.released && y.released && x.released !== y.released)
		return compare.date(x.released, y.released);
	return compare.inspect(x, y);
}

export const by = {
	date(x, y) {
		return compare.date(x.date, y.date) || fallback(x, y);
	},
	premiere(x, y) {
		return compare.date(x.released, y.released) || fallback(x, y);
	},
	rating(x, y) {
		const xr = Number.isNaN(Number(x.rating)) ? +!!x.rating : Number(x.rating);
		const yr = Number.isNaN(Number(y.rating)) ? +!!y.rating : Number(y.rating);
		return xr === yr ? fallback(x, y) : yr - xr;
	},
	seen(x, y) {
		// @ts-expect-error - type predicate not inferred
		const xd = [x.completed, x.seen.last, x.seen.first].filter((d) => d).map((d) => +new Date(d));
		// @ts-expect-error - type predicate not inferred
		const yd = [y.completed, y.seen.last, y.seen.first].filter((d) => d).map((d) => +new Date(d));
		return compare.date(new Date(Math.max(...xd)), new Date(Math.max(...yd))) || fallback(x, y);
	},
} satisfies Record<string, (x: Item, y: Item) => number>;
