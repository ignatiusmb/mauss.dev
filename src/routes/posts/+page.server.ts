import type { Schema } from '$content/posts.json/+server.js';
import type { by } from './search.svelte';

export async function load({ fetch }) {
	const { items, metadata }: Schema = await fetch('/content/posts.json').then((r) => r.json());

	return {
		list: items,
		filters: {
			category: {
				selected: '',
				options: metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {}),
			},
			tags: metadata.tags.map((v) => ({ name: v, selected: false })),
			sort_by: {
				required: true,
				selected: 'date' as keyof typeof by,
				options: {
					date: 'Date',
				} satisfies Record<keyof typeof by, string>,
			},
		},
		meta: {
			canonical: 'posts',
			title: 'Posts',
			description: 'Get the latest most recent posts here.',
		},
	};
}
