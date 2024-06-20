import { json } from '@sveltejs/kit';
import { DATA } from '$lib/content';

export const prerender = true;

export interface Schema {
	items: (typeof DATA)['curated/'];
	metadata: {};
}

export async function GET() {
	const items = DATA['curated/'];

	return json({ items, metadata: {} } satisfies Schema);
}
