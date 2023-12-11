import type { Schema } from '$content/curated.json/+server.js';

export async function load({ fetch }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());

	return {
		list: items.filter(({ branch }) => branch === 'article'),
		meta: {
			canonical: 'curated',
			title: 'Curated',
			description: 'Curated content for all kinds of programming, lifestyle, and many more.',
		},
	};
}
