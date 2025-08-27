import type { Items } from '$content/builder';

export const prerender = true;
export async function load({ fetch }) {
	const curated: Items['/curated'] = await fetch('/content/curated.json').then((r) => r.json());
	const posts: Items['/posts'] = await fetch('/content/posts.json').then((r) => r.json());
	const reviews: Items['/reviews'] = await fetch('/content/reviews.json').then((r) => r.json());

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
