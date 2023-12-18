import type { Schema } from '$content/curated.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());
	const article = items.find((i) => i.slug === params.slug && i.branch === 'article');
	if (!article) throw redirect(307, '/curated');

	return {
		article,
		meta: {
			canonical: `curated/${article.slug}`,
			title: article.title,
		},
	};
}
