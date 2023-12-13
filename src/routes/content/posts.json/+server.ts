import { json } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export const prerender = true;

export interface Schema {
	items: (typeof DATA)['posts/'];
	metadata: {
		categories: string[];
		tags: string[];
	};
}

export async function GET() {
	const items = DATA['posts/'];

	return json({
		items,
		metadata: {
			categories: [...new Set(items.map((p) => p.tags[0]))].sort(),
			tags: [...new Set(items.flatMap((p) => p.tags))].sort(),
		},
	} satisfies Schema);
}
