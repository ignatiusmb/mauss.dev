import { error } from '@sveltejs/kit';
import { posts } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = posts.get(params.slug);
	if (!content) throw error(404, 'Post not found');

	for (const check of posts.all()) {
		if (content.slug !== check.slug) continue;
		content.siblings = check.siblings;
		return content;
	}

	throw error(404, 'Post not found');
};
