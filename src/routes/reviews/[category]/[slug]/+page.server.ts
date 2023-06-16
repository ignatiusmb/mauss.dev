import { redirect } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = DATA['reviews/'].get(params.category, params.slug);
	if (!content) throw redirect(307, '/reviews');

	for (const { slug, flank } of DATA['reviews/'].all()) {
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

	throw redirect(307, '/reviews');
};
