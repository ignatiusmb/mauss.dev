import { redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const article = items.find((i) => i.slug === params.slug);
	if (!article) redirect(307, '/curated');

	const branch = article.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/curated/${params.slug}`);

	return {
		article: branch,
		source: `curated/${branch.slug}/+${params.branch}.md`,
		meta: {
			canonical: `/curated/${branch.slug}/${params.branch}`,
			title: branch.title,
		},
	};
}
