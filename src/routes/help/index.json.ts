import type { RequestHandler } from '@sveltejs/kit';
import type { Context } from '$lib/utils/types';
import { compile } from 'marqua';

export const get: RequestHandler<Context> = async ({ context }) => {
	return { body: compile(`${context.entry}.md`) };
};
