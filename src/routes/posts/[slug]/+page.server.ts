import type { Schema } from '$content/posts.json/+server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { items }: Schema = await fetch('/content/posts.json').then((r) => r.json());
	const content = items.find(({ slug }) => slug === params.slug);
	if (!content) redirect(307, '/posts');

	return {
		article: content,
		meta: {
			canonical: `posts/${content.slug}`,
			title: content.title,
			description: content.description || '',
		},
	};
}
