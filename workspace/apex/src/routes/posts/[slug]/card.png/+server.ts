import type { Schema } from '$content/posts.json/+server';
import Card from '$lib/components/Card.svelte';
import { error } from '@sveltejs/kit';
import { ImageResponse } from '@vercel/og';
import { date } from 'mauss';
import { html as reactify } from 'satori-html';
import { render } from 'svelte/server';
import { read } from '$app/server';

import Newsreader from '$lib/fonts/Newsreader.ttf?url';
import NotoSymbols from '$lib/fonts/NotoSymbols2.ttf?url';
const fonts = [
	{ data: await read(Newsreader).arrayBuffer(), name: 'Newsreader' },
	{ data: await read(NotoSymbols).arrayBuffer(), name: 'NotoSymbols' },
];

export async function GET({ fetch, params }) {
	const { items }: Schema = await fetch('/content/posts.json').then((r) => r.json());
	const post = items.find((item) => item.slug === params.slug);
	if (!post) error(404);

	const formatted = date(post.date).format('DD MMMM YYYY');
	const { head, body } = render(Card, {
		props: {
			title: post.title,
			blurb: post.description || formatted,
			date: post.description && formatted,
		},
	});
	const element = reactify(`<head>${head}</head>${body}`);
	return new ImageResponse(element, {
		fonts,
		width: 1200,
		height: 630,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': [
				'public',
				'no-transform',
				'max-age=0',
				's-maxage=3600',
				'stale-while-revalidate=86400',
			].join(', '),
		},
	});
}
