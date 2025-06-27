import type { Items } from '$content/builder';
import { date, drill } from 'mauss';

export type Query = {
	search: string;
	tags: string[];
	sort_by: keyof typeof by;
};

export function sift(items: Items['posts/'], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const filters: any[] = [
			// payload.category && payload.category !== item.category,
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

type Schema = Items['posts/'][number];
export const by = {
	date: drill('date', date.sort.newest),
} satisfies Record<string, (x: Schema, y: Schema) => number>;
