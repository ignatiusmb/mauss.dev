import { capitalize } from 'mauss';
import { DATA } from '$lib/content';

const verdict = DATA['reviews/'].VERDICTS.reduce(
	(a, c) => ({ ...a, [c]: capitalize(c.replace('-', ' ')) }),
	{} as { [k in (typeof DATA)['reviews/']['VERDICTS'][number]]: string }
);

export const load: import('./$types').PageServerLoad = async () => {
	const content = DATA['reviews/'].all();
	const categories = [...new Set(content.map((p) => p.category))];
	const genres = [...new Set(content.flatMap((p) => p.genres))].sort();
	return {
		list: content,
		unique: {
			categories,
			genres,
			verdict,
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
