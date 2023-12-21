import type { Schema } from '$content/curated.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());
	const branch = items.find((i) => i.slug === params.slug && i.branch === params.branch);
	if (!branch || params.branch === 'article') redirect(307, `/curated/${params.slug}`);

	const article = items.find((i) => i.slug === params.slug && i.branch === 'article')!;
	for (const key in article) {
		// @ts-expect-error - doesn't matter
		branch[key] ??= article[key];
	}

	return {
		article: branch,
		meta: {
			canonical: `curated/${article.slug}/${params.branch}`,
			title: article.title,
		},
	};
}
