import type { by } from './search.svelte.js';
import { scope } from 'mauss';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();

	return {
		list: items,
		query: url.searchParams.get('q') || '',
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = url.searchParams.get('category') || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			genres: scope(() => {
				const selected = url.searchParams.get('genres')?.split('-') || [];
				return metadata.genres.map((v) => ({ name: v, selected: selected.includes(v) }));
			}),
			verdict: scope(() => {
				const options = {
					'must-watch': 'Must Watch',
					recommended: 'Recommended',
					contextual: 'Contextual',
					'not-recommended': 'Not Recommended',
					pending: 'Pending',
				};
				const selected = url.searchParams.get('verdict') || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			sort_by: scope(() => {
				const options = {
					date: 'Date',
					rating: 'Rating',
					seen: 'Last seen',
					premiere: 'Premiered',
				} satisfies Record<keyof typeof by, string>;
				const sort = url.searchParams.get('sort_by') || '';
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description:
				"Honest takes and detailed reflections on things I've watched, read, played, or used — blunt when needed, curious always.",
		},
	};
}
