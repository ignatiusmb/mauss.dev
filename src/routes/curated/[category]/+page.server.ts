import { capitalize, compare } from 'mauss';
import { curated } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = curated
		.all()
		.filter((p) => p.category === params.category)
		.sort(compare.key('date', compare.date));
	return {
		curated: content,
		category: params.category,
		meta: {
			canonical: `curated/${params.category}`,
			title: `Curated ${capitalize(params.category)}`,
			description: `Curated content for ${params.category} stuff.`,
		},
	};
};
