import { channel } from './rss.xml/builder';

export async function load({ fetch }) {
	const [{ items: curated }, { items: posts }, { items: reviews }]: [
		import('$content/curated.json/+server').Schema,
		import('$content/posts.json/+server').Schema,
		import('$content/reviews.json/+server').Schema,
	] = await Promise.all([
		fetch('/content/curated.json').then((r) => r.json()),
		fetch('/content/posts.json').then((r) => r.json()),
		fetch('/content/reviews.json').then((r) => r.json()),
	]);

	return {
		curated: curated.slice(0, 4),
		posts: posts.slice(0, 4),
		reviews: reviews.slice(0, 4),
		meta: {
			title: channel.title,
			description: channel.description,
		},
	};
}
