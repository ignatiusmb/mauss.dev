import type { Config } from '@sveltejs/adapter-vercel';
import type { by } from './search.svelte';
import { scope } from 'mauss';
import { qsd } from 'mauss/web';
import { EXPIRATION } from '$lib/globals';

export const config: Config = {
	isr: {
		expiration: EXPIRATION,
		allowQuery: ['q', 'category', 'genres', 'verdict', 'sort_by'],
	},
};

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const { q = '', category = '', genres = [], sort_by = 'date' } = qsd(url.search);

	return {
		list: items,
		query: typeof q === 'string' ? q : q[0],
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = typeof category === 'string' ? category : category[0];
				return { options, selected: selected in options ? selected : '' };
			}),
			genres: scope(() => {
				const selected = typeof genres === 'string' ? [genres] : genres;
				return metadata.genres.map((v) => ({ name: v, selected: selected.includes(v) }));
			}),
			verdict: scope(() => {
				const options = {
					'must-watch': 'Must Watch',
					recommended: 'Recommended',
					contextual: 'Contextual',
					'not-recommended': 'Not Recommended',
					pending: 'Pending',
				};
				const selected = url.searchParams.get('verdict') || '';
				return { options, selected: selected in options ? selected : '' };
			}),
			sort_by: scope(() => {
				const options = {
					date: 'Date',
					rating: 'Rating',
					seen: 'Last seen',
					premiere: 'Premiered',
				} satisfies Record<keyof typeof by, string>;
				const sort = typeof sort_by === 'string' ? sort_by : sort_by[0];
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'reviews',
			title: 'Reviews',
			description:
				"Honest takes and detailed reflections on things I've watched, read, played, or used — blunt when needed, curious always.",
		},
	};
}
