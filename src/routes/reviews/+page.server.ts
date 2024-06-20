import type { Schema } from '$content/reviews.json/+server.js';
import type { by } from './search.svelte.js';
import { building } from '$app/environment';

export async function load({ fetch, url }) {
	const { items, metadata }: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return {
		list: items,
		query: (!building && url.searchParams.get('q')) || '',
		filters: {
			category: {
				selected: '',
				options: metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {}),
			},
			genres: metadata.genres.map((v) => ({ name: v, selected: false })),
			verdict: {
				selected: '',
				options: {
					'must-watch': 'Must Watch',
					recommended: 'Recommended',
					contextual: 'Contextual',
					'not-recommended': 'Not Recommended',
					pending: 'Pending',
				},
			},
			sort_by: {
				required: true,
				selected: 'date' as keyof typeof by,
				options: {
					date: 'Date',
					rating: 'Rating',
					seen: 'Last seen',
					premiere: 'Premiered',
				} satisfies Record<keyof typeof by, string>,
			},
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description: 'Personalized reviews for all kinds of anime, books, movies, shows, etc.',
		},
	};
}
