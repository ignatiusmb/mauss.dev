import type { Schema } from '$content/reviews.json/+server.js';
import type { by } from './search.svelte.js';
import { building } from '$app/environment';
import { scope } from 'mauss';

export async function load({ fetch, url }) {
	const { items, metadata }: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return {
		list: items,
		query: (!building && url.searchParams.get('q')) || '',
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = (!building && url.searchParams.get('category')) || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			genres: scope(() => {
				const selected = (!building && url.searchParams.get('genres')?.split(',')) || [];
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
				const selected = (!building && url.searchParams.get('verdict')) || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			sort_by: scope(() => {
				const options = {
					date: 'Date',
					rating: 'Rating',
					seen: 'Last seen',
					premiere: 'Premiered',
				} satisfies Record<keyof typeof by, string>;
				const sort = (!building && url.searchParams.get('sort_by')) || '';
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description: 'Personalized reviews for all kinds of anime, books, movies, shows, etc.',
		},
	};
}
