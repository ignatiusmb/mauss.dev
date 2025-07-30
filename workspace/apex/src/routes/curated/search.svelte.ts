import type { Items } from '$content/builder';

export type Query = {
	search: string;
	series: string;
};

export type Item = Omit<Items['/curated'][number], 'branches' | 'content'>;

export function sift(items: Item[], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const filters = [
			payload.series && payload.series.toLowerCase() !== item.series?.title,
			//
		];
		const flags = [
			item.date.includes(value),
			item.slug.includes(value),
			normalize(item.title).includes(value),
		];
		return filters.every((h) => !h) && flags.some((f) => f);
	});
	return results;
}

function normalize(str: string): string {
	return str.replace(/[(){}[\]<>"']/g, '').toLowerCase();
}
