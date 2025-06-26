import { qsd } from 'mauss/web';

export async function load({ parent, url }) {
	const { items } = await parent();
	const { q = [''] } = qsd(url.search);

	return {
		list: items,
		query: String(q[0]),
		meta: {
			canonical: '/curated',
			title: 'Curated',
			description: 'handcrafted curation, meant to be explored at your own pace.',
		},
	};
}
