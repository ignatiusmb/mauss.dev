import { redirect } from '@sveltejs/kit';
import { entitle } from '$lib/prose';

export async function load({ parent, params }) {
	const { items, series } = await parent();
	const article = items.find((i) => i.slug === params.slug);
	if (!article) redirect(307, '/curated');

	return {
		source: `curated/${article.slug}/+article.md`,
		article: { ...article, branches: article.branches.map(({ branch }) => branch) },
		collection: series,
		meta: {
			canonical: `/curated/${article.slug}`,
			title: entitle(article),
			description: article.description || '',
			image: `https://mauss.dev/curated/${article.slug}/card.png`,
		},
	};
}
