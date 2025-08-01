import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/posts'];
	metadata: {
		categories: string[];
		tags: string[];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/posts']();

	return json({
		items,
		metadata: {
			categories: [...new Set(items.flatMap((p) => p.tags[0] || []))].sort(),
			tags: [...new Set(items.flatMap((p) => p.tags))].filter((t) => t).sort(),
		},
	} satisfies Schema);
}
