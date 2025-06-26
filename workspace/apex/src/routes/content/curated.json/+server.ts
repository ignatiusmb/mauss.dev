import { json } from '@sveltejs/kit';
import { DATA, type Items } from '$lib/content';

export interface Schema {
	items: Items['curated/'];
	metadata: {};
}

export const prerender = true;
export async function GET() {
	const items = await DATA['curated/']();

	return json({ items, metadata: {} } satisfies Schema);
}
