import { capitalize } from 'mauss';
import { reviews } from '$lib/content';

export const load: import('./$types').PageServerLoad = async () => {
	const content = reviews.all();
	const categories = [...new Set(content.map((p) => p.category))];
	const genres = [...new Set(content.flatMap((p) => p.genres))].sort();
	return {
		reviews: content,
		unique: {
			categories,
			genres,
			verdict: reviews.VERDICTS.reduce(
				(a, c) => ({ ...a, [c]: capitalize(c.replace('-', ' ')) }),
				{} as { [k in (typeof reviews.VERDICTS)[number]]: string }
			),
			sort_by: {
				updated: 'Last updated',
				published: 'Date published',
				released: 'Year released',
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
};
