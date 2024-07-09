import type { Schema } from '$content/reviews.json/+server.js';
import * as compare from 'mauss/compare';

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
		const xd = [x.completed, x.seen.last, x.seen.first].filter((d) => d != null);
		const yd = [y.completed, y.seen.last, y.seen.first].filter((d) => d != null);
		return (
			compare.number(
				Math.max(...xd.map((d) => +new Date(d))),
				Math.max(...yd.map((d) => +new Date(d))),
			) || fallback(x, y)
		);
	},
} satisfies Record<string, (x: Item, y: Item) => number>;
