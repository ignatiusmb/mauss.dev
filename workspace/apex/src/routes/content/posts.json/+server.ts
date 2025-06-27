import { json } from '@sveltejs/kit';
import { DATA, type Items } from '$lib/content';

export interface Schema {
	items: Items['posts/'];
	metadata: {
		categories: string[];
		tags: string[];
	};
}

export const prerender = true;
export async function GET() {
	const items = await DATA['posts/']();

	return json({
		items,
		metadata: {
			categories: [...new Set(items.flatMap((p) => p.tags[0] || []))].sort(),
			tags: [...new Set(items.flatMap((p) => p.tags))].filter((t) => t).sort(),
		},
	} satisfies Schema);
}
