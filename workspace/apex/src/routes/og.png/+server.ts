import Card from '$lib/components/Card.svelte';
import { ImageResponse } from '@vercel/og';
import { html as reactify } from 'satori-html';
import { render } from 'svelte/server';
import { read } from '$app/server';

import Newsreader from '$lib/fonts/Newsreader.ttf?url';
import NotoSymbols from '$lib/fonts/NotoSymbols2.ttf?url';
const fonts = [
	{ data: await read(Newsreader).arrayBuffer(), name: 'Newsreader' },
	{ data: await read(NotoSymbols).arrayBuffer(), name: 'NotoSymbols' },
];

export async function GET() {
	const { head, body } = render(Card, {
		props: { title: 'Alkamauss', blurb: 'A Digital Atelier', footer: '« mauss.dev »' },
	});
	const element = reactify(`<head>${head}</head>${body}`);
	return new ImageResponse(element, {
		fonts,
		width: 1200,
		height: 630,
		headers: {
			'Content-Type': 'image/png',
			// 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	});
}
