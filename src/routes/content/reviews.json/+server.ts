import { json } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export const prerender = true;

export interface Schema {
	items: (typeof DATA)['reviews/'];
	metadata: {
		categories: string[];
		genres: string[];
	};
}

export async function GET() {
	const items = DATA['reviews/'];

	return json({
		items,
		metadata: {
			categories: [...new Set(items.map((p) => p.category))].sort(),
			genres: [...new Set(items.flatMap((p) => p.genres))].sort(),
		},
	} satisfies Schema);
}
