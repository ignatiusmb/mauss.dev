import type { Config } from '@sveltejs/adapter-vercel';
import { qsd } from 'mauss/web';
import { EXPIRATION } from '$lib/globals';
import { by, sift } from './search.svelte';

export const config: Config = {
	isr: {
		expiration: EXPIRATION,
		allowQuery: ['q', 'category', 'genres', 'verdict', 'sort_by'],
	},
};

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const {
		q = [''],
		category = [''],
		genres = [],
		verdict = [''],
		sort_by = ['date'],
	} = qsd(url.search);

	return {
		index: items,
		query: String(q[0]),
		results: sift(items, {
			search: String(q[0]),
			category: String(category[0]),
			genres: genres.map(String),
			verdict: String(verdict[0]),
			sort_by: sort_by[0] as keyof typeof by,
		}),
		filters: {
			category: {
				options: Object.fromEntries(metadata.categories.map((v) => [v, v])),
				selected: metadata.categories.includes(String(category[0])) ? category[0] : '',
			},
			genres: metadata.genres.map((v) => ({ name: v, selected: genres.includes(v) })),
			verdict: {
				options: Object.fromEntries(metadata.verdicts),
				selected: metadata.verdicts.find(([v]) => v === verdict[0]) ? verdict[0] : '',
			},
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
