import type { by } from './search.svelte';
import { scope } from 'mauss';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();

	return {
		list: items,
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = url.searchParams.get('category') || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			tags: scope(() => {
				const selected = url.searchParams.get('tags')?.split('-') || [];
				return metadata.tags.map((v) => ({ name: v, selected: selected.includes(v) }));
			}),
			sort_by: scope(() => {
				const options = { date: 'Date' } satisfies Record<keyof typeof by, string>;
				const sort = url.searchParams.get('sort_by') || '';
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'posts',
			title: 'Posts',
			description:
				'Essays and thoughts on life, tech, and everything in between — sometimes structured, sometimes spontaneous.',
		},
	};
}
