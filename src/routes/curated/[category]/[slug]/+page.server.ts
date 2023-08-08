import { redirect } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export async function load({ params }) {
	const article = DATA['curated/'].get(params.category, params.slug);
	if (!article) throw redirect(307, '/curated');
	return {
		article,
		meta: {
			canonical: `curated/${article.slug}`,
			title: article.title,
		},
	};
}
