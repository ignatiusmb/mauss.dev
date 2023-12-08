import { redirect } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export async function load({ params }) {
	try {
		if (params.branch === 'article') throw redirect;

		const map = DATA['curated/'].retrieve(params.slug);
		const article = map[params.branch];
		for (const key in map['article']) {
			// @ts-expect-error - doesn't matter
			article[key] ??= map['article'][key];
		}

		return {
			article,
			meta: {
				canonical: `curated/${article.slug}/${params.branch}`,
				title: article.title,
			},
		};
	} catch {
		throw redirect(307, `/curated/${params.slug}`);
	}
}
