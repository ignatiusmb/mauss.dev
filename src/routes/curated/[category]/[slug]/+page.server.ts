import { error } from '@sveltejs/kit';
import { curated } from '$lib/content';

curated.init();

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = curated.get(params.category, params.slug);
	if (!content) throw error(404, 'Curated post not found');
	return content;
};
