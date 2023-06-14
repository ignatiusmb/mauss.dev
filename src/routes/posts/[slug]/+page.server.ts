import { error } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = DATA['posts/'].get(params.slug);
	if (!content) throw error(404, 'Post not found');

	for (const { slug, flank } of DATA['posts/'].all()) {
		if (content.slug !== slug) continue;
		return {
			article: { ...content, flank },
			meta: {
				canonical: `posts/${content.slug}`,
				title: content.title,
				description: content.description || '',
			},
		};
	}

	throw error(404, 'Post not found');
};
