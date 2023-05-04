import { error } from '@sveltejs/kit';
import { reviews } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = reviews.get(params.category, params.slug);
	if (!content) throw error(404, 'Review not found');

	for (const { slug, flank } of reviews.all()) {
		if (content.slug !== slug) continue;
		const { title } = content;
		return {
			article: { ...content, flank },
			meta: {
				canonical: `reviews/${content.slug}`,
				title: title.short || title.jp || title.en,
			},
		};
	}

	throw error(404, 'Review not found');
};
