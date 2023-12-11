import type { Schema } from '$content/reviews.json/+server.js';

export async function load({ fetch }) {
	const { items, metadata }: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return {
		list: items,
		unique: {
			categories: metadata.categories,
			genres: metadata.genres,
			verdict: {
				pending: 'Pending',
				'not-recommended': 'Not Recommended',
				contextual: 'Contextual',
				recommended: 'Recommended',
				'must-watch': 'Must Watch',
			},
			sort_by: {
				date: 'Date',
				premiere: 'Premiered',
				seen: 'Last seen',
				rating: 'Rating',
			},
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description: 'Personalized reviews for all kinds of anime, books, movies, shows, etc.',
		},
	};
}
