import type { Schema } from '$content/reviews.json/+server.js';
import { building } from '$app/environment';

export async function load({ fetch, url }) {
	const { items, metadata }: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	const sort_options = {
		date: 'Date',
		rating: 'Rating',
		seen: 'Last seen',
		premiere: 'Premiered',
	};

	return {
		list: items,
		query: (!building && url.searchParams.get('q')) || '',
		unique: {
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
				selected: 'date' as keyof typeof sort_options,
				options: sort_options,
			},
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description: 'Personalized reviews for all kinds of anime, books, movies, shows, etc.',
		},
	};
}
