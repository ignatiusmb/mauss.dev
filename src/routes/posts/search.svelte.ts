import type { Schema } from '$content/posts.json/+server.js';
import { date } from 'mauss/compare';

type Item = Schema['items'][number];
export const by = {
	date: (x, y) => date(x.date, y.date),
} satisfies Record<string, (x: Item, y: Item) => number>;
