import { qsd } from 'mauss/web';
import { sift } from './search.svelte';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const { q = [''], series = [''] } = qsd(url.search);

	const index = items.map(({ branches, content, ...item }) => item);

	return {
		index,
		query: String(q[0]),
		results: sift(index, {
			search: String(q[0]),
			series: String(series[0]),
		}),
		filters: {
			series: {
				options: Object.fromEntries(metadata.series),
				selected: metadata.series.find(([v]) => v === series[0]) ? series[0] : '',
			},
		},
		meta: {
			canonical: '/curated',
			title: 'Curated',
			description: 'handcrafted curation, meant to be explored at your own pace.',
		},
	};
}
