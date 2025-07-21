import { redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const main = items.find((i) => i.slug === params.slug);
	if (!main) redirect(307, '/curated');

	const branch = main.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/curated/${params.slug}`);
	const article = { ...main, ...branch, branches: main.branches.map(({ branch }) => branch) };

	return {
		article,
		source: `curated/${article.slug}/+${params.branch}.md`,
		meta: {
			canonical: `/curated/${article.slug}/${params.branch}`,
			title: article.title,
		},
	};
}
