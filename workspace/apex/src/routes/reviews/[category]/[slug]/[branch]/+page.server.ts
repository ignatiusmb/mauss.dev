import { error, redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const slug = `${params.category}/${params.slug}`;
	const main = items.find((i) => i.slug === slug);
	if (!main) error(404, 'Review not found');
	if (main.draft) error(404, 'Not yet reviewed');

	const branch = main.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/reviews/${slug}`);
	const article = { ...main, ...branch, branches: main.branches.map(({ branch }) => branch) };

	return {
		article,
		source: `reviews/${article.slug}/+${params.branch}.md`,
		meta: {
			canonical: `/reviews/${article.slug}/${params.branch}`,
			title: article.title,
		},
	};
}
