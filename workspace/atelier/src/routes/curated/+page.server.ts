import type { Schema } from '$content/curated.json/+server.js';

export async function load({ fetch }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());

	return {
		list: items,
		meta: {
			canonical: 'curated',
			title: 'Curated',
			description:
				'Handpicked recommendations, lists, and timeless finds — compiled with care and meant to be explored at your own pace.',
		},
	};
}
