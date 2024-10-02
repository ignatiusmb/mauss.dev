import type { Schema } from '$content/reviews.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/reviews.json').then((r) => r.json());
	const content = items.find(({ slug }) => slug === `${params.category}/${params.slug}`);
	if (!content) redirect(307, '/reviews');

	return {
		article: content,
		meta: {
			canonical: `reviews/${content.slug}`,
			title: content.title.short || content.title.jp || content.title.en,
		},
	};
}
