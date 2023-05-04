import { error } from '@sveltejs/kit';
import { curated } from '$lib/content';

curated.init();

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const article = curated.get(params.category, params.slug);
	if (!article) throw error(404, 'Curated post not found');
	return {
		article,
		meta: {
			canonical: `curated/${article.slug}`,
			title: article.title,
		},
	};
};
