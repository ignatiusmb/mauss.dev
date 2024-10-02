import type { Schema } from '$content/reviews.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/reviews.json').then((r) => r.json());
	const slug = `${params.category}/${params.slug}`;
	const article = items.find((i) => i.slug === slug);
	if (!article) redirect(307, '/reviews');

	const branch = article.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/reviews/${slug}`);

	return {
		article: branch,
		meta: {
			canonical: `reviews/${branch.slug}/${params.branch}`,
			title: branch.title,
		},
	};
}
