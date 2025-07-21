import { redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const article = items.find((i) => i.slug === params.slug);
	if (!article) redirect(307, '/curated');

	return {
		article: { ...article, branches: article.branches.map(({ branch }) => branch) },
		source: `curated/${article.slug}/+article.md`,
		meta: {
			canonical: `/curated/${article.slug}`,
			title: article.title,
		},
	};
}
