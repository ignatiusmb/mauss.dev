import { redirect } from '@sveltejs/kit';

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
			title: article.title,
		},
	};
}
