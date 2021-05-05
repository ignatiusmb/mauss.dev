import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/utils/types';
import { compile } from 'marqua';

export const get: RequestHandler<Locals> = async ({ locals }) => ({
	body: compile(`${locals.entry}.md`),
});
