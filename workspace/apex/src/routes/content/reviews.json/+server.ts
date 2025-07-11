import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/reviews'];
	metadata: {
		tier: [value: string, label: string][];
		categories: string[];
		genres: string[];
		sort_by: [value: string, label: string][];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/reviews']();

	return json({
		items,
		metadata: {
			tier: [
				['S', 'S-tier'],
				['A', 'A-tier'],
				['B', 'B-tier'],
				['C', 'C-tier'],
				['D', 'D-tier'],
				['?', 'TBD'],
			],
			categories: [...new Set(items.map((p) => p.category))].sort(),
			genres: [...new Set(items.flatMap((p) => p.genres))].sort(),
			sort_by: [
				['date', 'date'],
				['premiere', 'premiere'],
				['rating', 'rating'],
				['seen', 'last seen'],
			],
		},
	} satisfies Schema);
}
