import type { Schema } from '$content/curated.json/+server';
import { error } from '@sveltejs/kit';
import { date } from 'mauss';
import { CardImage } from '$lib/server/og';

export async function GET({ fetch, params }) {
	const { items }: Schema = await fetch('/content/curated.json').then((r) => r.json());
	const post = items.find((item) => item.slug === params.slug);
	if (!post) error(404);

	const formatted = date(post.date).format('DD MMMM YYYY');
	return CardImage({
		title: post.title,
		blurb: post.description || formatted,
		date: post.description && formatted,
		series: post.series,
	});
}
