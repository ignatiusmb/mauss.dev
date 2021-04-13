import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'marqua';

export const get: RequestHandler = async () => {
	return { body: compile('content/src/uses.md') };
};
