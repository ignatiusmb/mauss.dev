import type { Schema } from '$content/reviews.json/+server.js';

export const prerender = false;

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return data;
}
