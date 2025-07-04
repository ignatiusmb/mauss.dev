import type { Schema } from '$content/posts.json/+server';

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/posts.json').then((r) => r.json());

	return data;
}
