import { compare } from 'mauss';
import { DATA } from '$lib/content';
import { channel } from './rss.xml/builder';

export async function load() {
	const [curated, posts, reviews] = [
		DATA['curated/'].all(),
		DATA['posts/'].all(),
		DATA['reviews/'].all(),
	];

	return {
		curated: curated.sort(compare.key('date', compare.date)).slice(0, 4),
		posts: posts.slice(0, 4),
		reviews: reviews.filter((x) => x.rating && x.verdict !== 'pending').slice(0, 4),
		meta: {
			title: 'Ignatius Bagussuputra',
			description: channel.description,
		},
	};
}
