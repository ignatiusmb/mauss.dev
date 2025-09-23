import type { Items } from '$content/builder';
import { channel } from './rss.xml/builder';

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
			title: channel.title,
			description: channel.description,
		},
	};
}
