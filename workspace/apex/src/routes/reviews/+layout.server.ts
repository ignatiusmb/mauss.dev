import type { Schema } from '$content/reviews.json/+server';
import type { Config } from '@sveltejs/adapter-vercel';
import { EXPIRATION } from '$lib/globals';

export const prerender = false;
export const config: Config = {
	isr: { expiration: EXPIRATION },
};

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return data;
}
