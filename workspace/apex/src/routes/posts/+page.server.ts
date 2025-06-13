import type { Config } from '@sveltejs/adapter-vercel';
import type { by } from './search.svelte';
import { scope } from 'mauss';
import { qsd } from 'mauss/web';

const allowed = ['q', 'tags', 'sort_by'];

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const { q = '', category = '', tag = [], sort_by = 'date' } = qsd(url.search);

	return {
		list: items,
		query: typeof q === 'string' ? q : q[0],
		filters: {
			category: scope(() => {
				const options = metadata.categories.reduce((a, v) => ({ ...a, [v]: v }), {});
				const selected = typeof category === 'string' ? category : category[0];
				return { options, selected: selected in options ? selected : '' };
			}),
			tags: scope(() => {
				const selected = typeof tag === 'string' ? [tag] : tag;
				return metadata.tags.map((v) => ({ name: v, selected: selected.includes(v) }));
			}),
			sort_by: scope(() => {
				const options = { date: 'Date' } satisfies Record<keyof typeof by, string>;
				const sort = typeof sort_by === 'string' ? sort_by : sort_by[0];
				const selected = (sort in options && sort) || 'date';
				return { required: true, options, selected: selected as keyof typeof by };
			}),
		},
		meta: {
			canonical: 'posts',
			title: 'Posts',
			description:
				'Essays and thoughts on life, tech, and everything in between — sometimes structured, sometimes spontaneous.',
		},
	};
}

export const config: Config = {
	isr: {
		expiration: 60 * 15,
		allowQuery: allowed,
	},
};
