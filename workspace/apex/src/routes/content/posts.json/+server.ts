import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/posts'];
	metadata: {
		theme: [value: Items['/posts'][number]['theme'], label: string][];
		tags: string[];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/posts']();

	return json({
		items,
		metadata: {
			theme: [
				['reflection', 'Reflection'],
				['essay', 'Essay'],
				['guide', 'Guide'],
				['moment', 'Moment'],
				['archive', 'Archive'],
				['pending', 'Pending'],
			],
			tags: [...new Set(items.flatMap((p) => p.tags))].filter((t) => t).sort(),
		},
	} satisfies Schema);
}
