import { error } from '@sveltejs/kit';
import { reviews } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = reviews.get(params.category, params.slug);
	if (!content) throw error(404, 'Review not found');

	for (const check of reviews.all()) {
		if (content.slug !== check.slug) continue;
		content.siblings = check.siblings;
		return content;
	}

	throw error(404, 'Review not found');
};
