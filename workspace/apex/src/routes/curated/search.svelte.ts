import type { Items } from '$lib/content';

export type Query = {
	search: string;
};

export function sift(items: Items['curated/'], payload: Query) {
	const value = normalize(payload.search);
	const results = items.filter((item) => {
		const flags = [item.slug.includes(value), normalize(item.title).includes(value)];
		return flags.some((f) => f);
	});
	return results;
}

function normalize(str: string): string {
	return str.replace(/[(){}[\]<>"']/g, '').toLowerCase();
}
