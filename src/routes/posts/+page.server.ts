import type { Schema } from '$content/posts.json/+server.js';
import type { by } from './search.svelte';
import { building } from '$app/environment';
import { scope } from 'mauss';

export async function load({ fetch, url }) {
	const { items, metadata }: Schema = await fetch('/content/posts.json').then((r) => r.json());

	return {
		list: items,
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = (!building && url.searchParams.get('category')) || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			tags: scope(() => {
				const selected = (!building && url.searchParams.get('tags')?.split(',')) || [];
				return metadata.tags.map((v) => ({ name: v, selected: selected.includes(v) }));
			}),
			sort_by: scope(() => {
				const options = { date: 'Date' } satisfies Record<keyof typeof by, string>;
				const sort = (!building && url.searchParams.get('sort_by')) || '';
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'posts',
			title: 'Posts',
			description: 'Get the latest most recent posts here.',
		},
	};
}
