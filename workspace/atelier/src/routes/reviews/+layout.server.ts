import type { Schema } from '$content/reviews.json/+server.js';
import type { Config } from '@sveltejs/adapter-vercel';

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return data;
}

export const prerender = false;
export const config: Config = {
	isr: {
		expiration: 60 * 60,
		allowQuery: ['q'],
	},
};
