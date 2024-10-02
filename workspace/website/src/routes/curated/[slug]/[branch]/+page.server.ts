import type { Schema } from '$content/curated.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());
	const article = items.find((i) => i.slug === params.slug);
	if (!article) redirect(307, '/curated');

	const branch = article.branches.find((i) => i.branch === params.branch);
	if (!branch) redirect(307, `/curated/${params.slug}`);

	return {
		article: branch,
		meta: {
			canonical: `curated/${branch.slug}/${params.branch}`,
			title: branch.title,
		},
	};
}
