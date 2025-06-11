export async function load({ parent }) {
	const { items } = await parent();

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
