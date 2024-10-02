import { channel } from './rss.xml/builder';

export async function load({ fetch }) {
	const [{ items: curated }, { items: posts }, { items: reviews }]: [
		import('$content/curated.json/+server.js').Schema,
		import('$content/posts.json/+server.js').Schema,
		import('$content/reviews.json/+server.js').Schema,
	] = await Promise.all([
		fetch('/content/curated.json').then((r) => r.json()),
		fetch('/content/posts.json').then((r) => r.json()),
		fetch('/content/reviews.json').then((r) => r.json()),
	]);

	return {
		curated: curated.slice(0, 4),
		posts: posts.slice(0, 4),
		reviews: reviews.filter((x) => x.rating && x.verdict !== 'pending').slice(0, 4),
		meta: {
			title: 'Ignatius Bagussuputra',
			description: channel.description,
		},
	};
}
