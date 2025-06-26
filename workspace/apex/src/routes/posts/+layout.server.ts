import type { Schema } from '$content/posts.json/+server';

export const prerender = false;
export async function load({ fetch }) {
	const data: Schema = await fetch('/content/posts.json').then((r) => r.json());

	return data;
}
