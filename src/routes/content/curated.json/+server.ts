import { json } from '@sveltejs/kit';
import { compare } from 'mauss';
import { DATA } from '$lib/content';

export const prerender = true;

export interface Schema {
	items: (typeof DATA)['curated/'];
	metadata: {};
}

export async function GET() {
	const items = DATA['curated/'];

	return json({
		items: items.sort(compare.key('date', compare.date)).reverse(),
		metadata: {},
	} satisfies Schema);
}
