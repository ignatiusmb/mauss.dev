import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'marqua';

export const get: RequestHandler = async ({ locals }) => {
	return { body: compile(`${locals.entry}.md`) };
};
