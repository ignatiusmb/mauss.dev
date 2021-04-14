import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'marqua';

export const get: RequestHandler = async ({ context }) => ({
	body: compile(`${context.entry}.md`),
});
