import type { Schema } from '$content/posts.json/+server.js';
import * as compare from 'mauss/compare';

type Item = Schema['items'][number];
export const by = {
	date: (x, y) => compare.date(x.date, y.date),
} satisfies Record<string, (x: Item, y: Item) => number>;
