import type { Schema } from '$content/reviews.json/+server';

export async function load({ fetch }) {
	const data: Schema = await fetch('/content/reviews.json').then((r) => r.json());

	return data;
}
