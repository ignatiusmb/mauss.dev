import { error, redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const slug = `${params.category}/${params.slug}`;
	const article = items.find((i) => i.slug === slug);
	if (!article) error(404, 'Review not found');
	if (!article.rating || article.verdict === 'pending') {
		error(404, 'Not yet reviewed');
	}
	const branch = article.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/reviews/${slug}`);

	return {
		article: branch,
		source: `reviews/${branch.slug}/+${params.branch}.md`,
		meta: {
			canonical: `/reviews/${branch.slug}/${params.branch}`,
			title: branch.title,
		},
	};
}
