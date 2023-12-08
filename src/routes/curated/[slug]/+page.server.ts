import { redirect } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export async function load({ params }) {
	try {
		const article = DATA['curated/'].retrieve(params.slug)['article'];
		return {
			article,
			meta: {
				canonical: `curated/${article.slug}`,
				title: article.title,
			},
		};
	} catch {
		throw redirect(307, '/curated');
	}
}
