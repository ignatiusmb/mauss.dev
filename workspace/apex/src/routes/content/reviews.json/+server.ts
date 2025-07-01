import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/reviews'];
	metadata: {
		categories: string[];
		genres: string[];
		verdicts: [value: string, label: string][];
		sort_by: [value: string, label: string][];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/reviews']();

	return json({
		items,
		metadata: {
			categories: [...new Set(items.map((p) => p.category))].sort(),
			genres: [...new Set(items.flatMap((p) => p.genres))].sort(),
			verdicts: [
				['must-watch', 'Must Watch'],
				['recommended', 'Recommended'],
				['contextual', 'Contextual'],
				['not-recommended', 'Not Recommended'],
				['pending', 'Pending'],
			],
			sort_by: [
				['date', 'date'],
				['premiere', 'premiere'],
				['rating', 'rating'],
				['seen', 'last seen'],
			],
		},
	} satisfies Schema);
}
