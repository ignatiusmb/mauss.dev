import { compare } from 'mauss';
import { DATA } from '$lib/content';

export const load: import('./$types').PageServerLoad = async () => {
	const [quotes, curated, posts, reviews] = [
		DATA['quotes/'].all(),
		DATA['curated/'].all(),
		DATA['posts/'].all(),
		DATA['reviews/'].all(),
	];

	return {
		quotes: quotes.slice(0, quotes.length / 2),
		curated: curated.sort(compare.key('date', compare.date)).slice(0, 4),
		posts: posts.slice(0, 4),
		reviews: reviews.filter((x) => x.rating && x.verdict !== 'pending').slice(0, 4),
		meta: {
			title: 'Ignatius Bagussuputra',
			description: 'A simple blog about my life and my thoughts.',
		},
	};
};
