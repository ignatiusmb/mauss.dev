<script>
	import '@fontsource-variable/karla';
	import '@fontsource-variable/fira-code';
	import '@ignatiusmb/styles/core.css';
	import 'aubade/styles/code.css';
	import '../app.css';
	import '$lib/styles/blog.css';

	import MetaHead from 'syv/core/MetaHead.svelte';
	import ScrollTop from 'syv/core/ScrollTop.svelte';
	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	import { dev } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page, updated } from '$app/state';
	import { onMount } from 'svelte';

	const { children } = $props();

	onMount(() => updated.check());
	beforeNavigate(({ willUnload, to }) => {
		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<MetaHead
	domain="https://mauss.dev"
	title="{page.data.meta?.title || page.status}{page.url.pathname === '/' ? '' : ' | Alkamauss'}"
	canonical={page.data.meta?.canonical}
	description={page.data.meta?.description}
	authors={['Ignatius Bagus.']}
	alternate={[
		{
			type: 'application/rss+xml',
			href: '/rss.xml',
			hreflang: 'en',
			title: 'Alkamauss Feed',
		},
		{
			type: 'application/json',
			href: '/content/curated.json',
			hreflang: 'en',
			title: 'Alkamauss Curation',
		},
		{
			type: 'application/json',
			href: '/content/posts.json',
			hreflang: 'en',
			title: 'Alkamauss Posts',
		},
		{
			type: 'application/json',
			href: '/content/reviews.json',
			hreflang: 'en',
			title: 'Alkamauss Reviews',
		},
	]}
	scripts={{
		'/_vercel/speed-insights/script.js': !dev && { 'data-route': page.route.id },
		'https://static.cloudflareinsights.com/beacon.min.js': !dev && {
			'data-cf-beacon': '{"token": "402cd91137d14890a1117569bda0ee41"}',
		},
	}}
/>

<div data-sveltekit-reload={updated.current || 'off'}>
	{#if !page.url.pathname.startsWith('/auth')}
		<Navigation />
	{/if}

	<main>
		{@render children()}
	</main>

	{#if !page.url.pathname.startsWith('/auth')}
		<Footer />
	{/if}

	{#if page.url.pathname !== '/' && !page.url.pathname.startsWith('/auth')}
		<ScrollTop
			styles={{
				'--background': '#0e0e0e',
			}}
		/>
	{/if}
</div>

<style>
	div /* holy grail */ {
		width: 100%;
		position: relative;

		--max-content: 80rem;
		--breakout: calc((calc(var(--max-content) + 12rem) - var(--max-content)) / 2);
		--pad: 2rem;

		display: grid;
		gap: 2rem 0;
		align-content: center;
		grid-template-rows: [top-start] auto [content-start] 1fr [content-end] auto [top-end];
		grid-template-columns:
			[full-bleed-start] var(--pad)
			[full-bleed-padding-start] minmax(0, 1fr)
			[breakout-start] minmax(0, var(--breakout))
			[content-start] min(100% - var(--pad) * 2, var(--max-content))
			[content-end] minmax(0, var(--breakout))
			[breakout-end] minmax(0, 1fr)
			[full-bleed-padding-end] var(--pad)
			[full-bleed-end];

		transition: var(--t-duration);

		> main {
			grid-row: content;
			grid-column: content;
			position: relative;

			display: grid;
			gap: 2rem;
			align-content: start;

			:global(.syv-core-pagination) {
				max-width: 32rem;
			}
			:global(.syv-core-search-bar) {
				border-radius: var(--b-radius);
			}
		}

		:global(i[data-icon]) {
			width: 1.5rem;
			height: 1.5rem;
			display: inline-block;
			background: currentColor;
			mask: no-repeat center / 100%;
			mask-image: var(--svg);

			&[data-icon='article'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="32" y="48" width="192" height="160" rx="8"/><line x1="80" y1="96" x2="176" y2="96"/><line x1="80" y1="128" x2="176" y2="128"/><line x1="80" y1="160" x2="176" y2="160"/></svg>');
			}
			&[data-icon='bookmark'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='books'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="48" y="40" width="64" height="176" rx="8"/><path d="M217.67,205.77l-46.81,10a8,8,0,0,1-9.5-6.21L128.18,51.8a8.07,8.07,0,0,1,6.15-9.57l46.81-10a8,8,0,0,1,9.5,6.21L223.82,196.2A8.07,8.07,0,0,1,217.67,205.77Z"/><line x1="48" y1="72" x2="112" y2="72"/><line x1="48" y1="184" x2="112" y2="184"/><line x1="133.16" y1="75.48" x2="195.61" y2="62.06"/><line x1="139.79" y1="107.04" x2="202.25" y2="93.62"/><line x1="156.39" y1="185.94" x2="218.84" y2="172.52"/></svg>');
			}
			&[data-icon='flask'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
			}
			&[data-icon='id-badge'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="136" r="32"/><path d="M80,192a60,60,0,0,1,96,0"/><rect x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)"/><line x1="96" y1="64" x2="160" y2="64"/></svg>');
			}
			&[data-icon='lifebuoy'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><circle cx="128" cy="128" r="40"/><line x1="99.72" y1="99.72" x2="60.12" y2="60.12"/><line x1="156.28" y1="99.72" x2="195.88" y2="60.12"/><line x1="156.28" y1="156.28" x2="195.88" y2="195.88"/><line x1="99.72" y1="156.28" x2="60.12" y2="195.88"/></svg>');
			}
			&[data-icon='list-star'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="40" y1="64" x2="216" y2="64"/><line x1="40" y1="128" x2="96" y2="128"/><line x1="40" y1="192" x2="112" y2="192"/><polygon points="184 174.54 213.67 192 205.6 159.41 232 137.61 197.35 134.94 184 104 170.65 134.94 136 137.61 162.4 159.41 154.33 192 184 174.54"/></svg>');
			}
			&[data-icon='rss'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M64,40A152,152,0,0,1,216,192"/><path d="M64,112a80,80,0,0,1,80,80"/><circle cx="68" cy="188" r="12"/></svg>');
			}
			&[data-icon='x'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="200" y1="56" x2="56" y2="200"/><line x1="200" y1="200" x2="56" y2="56"/></svg>');
			}
		}
	}
</style>
