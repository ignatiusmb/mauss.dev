import type { Config } from '@sveltejs/adapter-vercel';
import { EXPIRATION } from '$lib/globals';

export const config: Config = {
	isr: { expiration: EXPIRATION },
};
