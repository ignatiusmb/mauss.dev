import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'marqua';

export const GET: RequestHandler = async () => ({
	body: { post: compile('content/src/uses.md') },
});
