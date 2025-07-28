export const prerender = true;
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
			title: 'Alkamauss — A Digital Atelier',
			description:
				'seeing life through a shifting lens in a quiet corner of the web. where everyday moments, distant journeys, and personal echoes turn into stories worth holding.',
		},
	};
}
