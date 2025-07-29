import type { Items } from '$content/builder';

export type Query = {
	search: string;
	series: string;
};

export type Schema = Omit<Items['/curated'][number], 'branches' | 'content'>;

export function sift(items: Schema[], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const flags = [
			item.slug.includes(value),
			normalize(item.title).includes(value),
			payload.series && payload.series === item.series?.title,
		];
		return flags.some((f) => f);
	});
	return results;
}

function normalize(str: string): string {
	return str.replace(/[(){}[\]<>"']/g, '').toLowerCase();
}
