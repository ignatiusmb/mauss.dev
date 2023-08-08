import { redirect } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export async function load({ params }) {
	const content = DATA['posts/'].get(params.slug);
	if (!content) throw redirect(307, '/posts');

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

	throw redirect(307, '/posts');
}
