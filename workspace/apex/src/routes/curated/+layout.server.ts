import type { Schema } from '$content/curated.json/+server';

export const prerender = false;

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/curated.json').then((r) => r.json());

	return data;
}
