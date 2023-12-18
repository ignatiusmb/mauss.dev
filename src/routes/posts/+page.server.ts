import type { Schema } from '$content/posts.json/+server.js';

export async function load({ fetch }) {
	const { items, metadata }: Schema = await fetch('/content/posts.json').then((r) => r.json());

	return {
		list: items,
		unique: {
			categories: metadata.categories,
			tags: metadata.tags,
			sort_by: { date: 'Date' },
		},
		meta: {
			canonical: 'posts',
			title: 'Posts',
			description: 'Get the latest most recent posts here.',
		},
	};
}
