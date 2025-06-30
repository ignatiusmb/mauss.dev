import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/curated'];
	metadata: {};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/curated']();

	return json({ items, metadata: {} } satisfies Schema);
}
