<script>
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/karla';
	import '@ignatiusmb/styles/core.css';
	import 'aubade/styles/code.css';
	import '../app.css';

	import MetaHead from 'syv/core/MetaHead.svelte';
	import ScrollTop from 'syv/core/ScrollTop.svelte';
	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	import { dev } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page, updated } from '$app/state';
	import { onMount } from 'svelte';

	const { children } = $props();
	const noscroll = $derived.by(() => {
		const { pathname } = page.url;
		return (
			page.error ||
			pathname === '/' ||
			pathname === '/uses' ||
			pathname === '/fine-print' ||
			pathname.startsWith('/auth')
		);
	});

	onMount(() => updated.check());
	beforeNavigate(({ willUnload, to }) => {
		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
	afterNavigate(() => {
		// @ts-expect-error - update vercel insights more accurately
		window.va?.('pageview', { route: page.route.id, url: page.url.pathname });
	});
</script>

<MetaHead
	domain="https://mauss.dev"
	title="{page.data.meta?.title || page.status}{page.url.pathname === '/' ? '' : ' • Alkamauss'}"
	canonical={page.data.meta?.canonical || '/'}
	description={page.data.meta?.description}
	authors={['Ignatius Bagus.']}
	og={{
		site_name: 'Alkamauss',
		title: page.data.meta?.title || `${page.status}`,
		description: page.data.meta?.description,
	}}
	alternate={[{ type: 'application/rss+xml', title: 'RSS', href: '/rss.xml' }]}
	scripts={{
		'/_vercel/insights/script.js': !dev && { 'data-disable-auto-track': '1' },
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

	<main class:centered={page.error}>
		{@render children()}
	</main>

	{#if !page.url.pathname.startsWith('/auth')}
		<Footer
			from={2017}
			items={[
				{ href: '/about', label: 'about', icon: 'id-badge' },
				{ href: '/sponsor', label: 'sponsor', icon: 'hand-heart' },
				{ href: '/rss.xml', label: 'rss feed', icon: 'rss' },
			]}
		/>
	{/if}

	{#if !noscroll}
		<ScrollTop
			styles={{
				'--size': '2rem',
				'--background': 'var(--color-base)',
				'--color': 'var(--color-accent-primary)',
				'--transition-duration': 'var(--transition-base)',
			}}
		/>
	{/if}
</div>

<style>
	div /* holy grail */ {
		min-height: 100dvh;
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

		padding-bottom: 2rem;
		transition: var(--transition-base);

		@media (min-width: 549px) {
			padding: 1rem 0 3rem;
		}

		> main {
			grid-row: content;
			grid-column: content;
			position: relative;

			display: grid;
			gap: 2rem;
			align-content: start;

			&.centered {
				align-content: center;
			}

			:global(.syv-core-pagination) {
				max-width: 32rem;
			}
			:global(.syv-core-search-bar) {
				border-radius: var(--rounding-box);
			}
		}

		:global(i[data-icon]) {
			width: 1.5rem;
			height: 1.5rem;
			display: inline-block;
			background: currentColor;
			mask: no-repeat center / 100%;
			mask-image: var(--svg);

			&[data-icon='arrow-circle-left'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><line x1="88" y1="128" x2="168" y2="128"/><polyline points="120 96 88 128 120 160"/></svg>');
			}
			&[data-icon='arrow-circle-right'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><line x1="88" y1="128" x2="168" y2="128"/><polyline points="136 96 168 128 136 160"/></svg>');
			}
			&[data-icon='article'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="32" y="48" width="192" height="160" rx="8"/><line x1="80" y1="96" x2="176" y2="96"/><line x1="80" y1="128" x2="176" y2="128"/><line x1="80" y1="160" x2="176" y2="160"/></svg>');
			}
			&[data-icon='bookmark'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='books'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="48" y="40" width="64" height="176" rx="8"/><path d="M217.67,205.77l-46.81,10a8,8,0,0,1-9.5-6.21L128.18,51.8a8.07,8.07,0,0,1,6.15-9.57l46.81-10a8,8,0,0,1,9.5,6.21L223.82,196.2A8.07,8.07,0,0,1,217.67,205.77Z"/><line x1="48" y1="72" x2="112" y2="72"/><line x1="48" y1="184" x2="112" y2="184"/><line x1="133.16" y1="75.48" x2="195.61" y2="62.06"/><line x1="139.79" y1="107.04" x2="202.25" y2="93.62"/><line x1="156.39" y1="185.94" x2="218.84" y2="172.52"/></svg>');
			}
			&[data-icon='broom'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M112,224a95.2,95.2,0,0,1-29-48"/><path d="M192,152c0,31.67,13.31,59,40,72H61A103.65,103.65,0,0,1,32,152c0-28.21,11.23-50.89,29.47-69.64a8,8,0,0,1,8.67-1.81L95.52,90.83a16,16,0,0,0,20.82-9l21-53.11c4.15-10,15.47-15.32,25.63-11.53a20,20,0,0,1,11.51,26.4L153.13,96.69a16,16,0,0,0,8.93,20.76L187,127.29a8,8,0,0,1,5,7.43Z"/><line x1="43.93" y1="105.57" x2="192.8" y2="165.12"/></svg>');
			}
			&[data-icon='flask'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
			}
			&[data-icon='hand-heart'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32"/></svg>');
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
