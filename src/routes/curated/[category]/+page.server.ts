import { capitalize } from 'mauss';
import { DATA } from '$lib/content';

export async function load({ params }) {
	const content = DATA['curated/'].all();

	return {
		curated: content.filter((p) => p.category === params.category),
		category: params.category,
		meta: {
			canonical: `curated/${params.category}`,
			title: `Curated ${capitalize(params.category)}`,
			description: `Curated content for ${params.category} stuff.`,
		},
	};
}
