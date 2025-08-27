import type { Items } from '$content/builder';

export const prerender = true;
export async function load({ fetch }) {
	const { items: c } = await fetch('/content/curated.json').then((r) => r.json());
	const { items: p } = await fetch('/content/posts.json').then((r) => r.json());
	const { items: r } = await fetch('/content/reviews.json').then((r) => r.json());

	return {
		curated: (c as Items['/curated']).slice(0, 4),
		posts: (p as Items['/posts']).slice(0, 4),
		reviews: (r as Items['/reviews']).slice(0, 4),
		meta: {
			title: 'Alkamauss — A Digital Atelier',
			description:
				'seeing life through a shifting lens in a quiet corner of the web. where everyday moments, distant journeys, and personal echoes turn into stories worth holding.',
		},
	};
}
