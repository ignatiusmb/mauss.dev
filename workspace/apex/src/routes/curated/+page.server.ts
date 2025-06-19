import type { Config } from '@sveltejs/adapter-vercel';
import { qsd } from 'mauss/web';
import { EXPIRATION } from '$lib/globals';

export const config: Config = {
	isr: {
		expiration: EXPIRATION,
		allowQuery: ['q'],
	},
};

export async function load({ parent, url }) {
	const { items } = await parent();
	const { q = '' } = qsd(url.search);

	return {
		list: items,
		query: typeof q === 'string' ? q : q[0],
		meta: {
			canonical: '/curated',
			title: 'Curated',
			description: 'handcrafted curation, meant to be explored at your own pace.',
		},
	};
}
