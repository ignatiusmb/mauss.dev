import { qsd } from 'mauss/web';
import { by, sift } from './search.svelte';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const {
		q = [''],
		tier = [''],
		category = [''],
		genres = [],
		sort_by = ['date'],
	} = qsd(url.search);

	return {
		index: items,
		query: String(q[0]),
		results: sift(items, {
			search: String(q[0]),
			tier: String(tier[0]),
			category: String(category[0]),
			genres: genres.map(String),
			sort_by: sort_by[0] as keyof typeof by,
		}),
		filters: {
			tier: {
				options: Object.fromEntries(metadata.tier),
				selected: metadata.tier.find(([v]) => v === tier[0]) ? tier[0] : '',
			},
			category: {
				options: Object.fromEntries(metadata.categories.map((v) => [v, v])),
				selected: metadata.categories.includes(String(category[0])) ? category[0] : '',
			},
			genres: metadata.genres.map((v) => ({ name: v, selected: genres.includes(v) })),
			sort_by: {
				required: true,
				options: Object.fromEntries(metadata.sort_by),
				selected: (String(sort_by[0]) in by && sort_by[0]) || 'date',
			},
		},
		meta: {
			canonical: '/reviews',
			title: 'Reviews',
			description:
				'where i express myself most freely. honest takes and detailed reflections for each piece.',
		},
	};
}
