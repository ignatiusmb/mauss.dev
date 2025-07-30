<script>
	import '@fontsource-variable/newsreader';
	import '@fontsource-variable/recursive/full';
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
	const hosted = $derived(!dev && page.url.host === 'mauss.dev');
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
	beforeNavigate((nav) => {
		if (!nav.to?.url || !nav.to.route.id) return;
		if (updated.current && !nav.willUnload) {
			location.href = nav.to.url.href;
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
		'/_vercel/insights/script.js': hosted && { 'data-disable-auto-track': '1' },
		'/_vercel/speed-insights/script.js': hosted && { 'data-route': page.route.id },
		'https://static.cloudflareinsights.com/beacon.min.js': hosted && {
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
				{ href: '/about', label: 'about', icon: 'pen-nib' },
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
		--pad: 1rem;

		display: grid;
		gap: var(--pad) 0;
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
			gap: calc(var(--pad) * 2) 0;
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

			:global(.syv-core-search-bar) {
				border-radius: var(--rounding-box);
				font-family: var(--font-sans);
			}
		}

		:global {
			i[data-icon] {
				width: calc(var(--size, 1.875rem) * 0.8);
				height: calc(var(--size, 1.875rem) * 0.8);
				display: inline-block;
				background: currentColor;
				color: oklch(0.9086 0.0055 298);
				mask: no-repeat center / 100%;
				mask-image: var(--svg);

				&[data-icon='arrow-circle-left'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><line x1="88" y1="128" x2="168" y2="128"/><polyline points="120 96 88 128 120 160"/></svg>');
				}
				&[data-icon='arrow-circle-right'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><line x1="88" y1="128" x2="168" y2="128"/><polyline points="136 96 168 128 136 160"/></svg>');
				}
				&[data-icon='bookmarks'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M168,224l-56-40L56,224V72a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z"/><path d="M88,64V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8V192l-32-22.85"/></svg>');
				}
				&[data-icon='feather'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="184" y1="72" x2="32" y2="224"/><path d="M146.34,189.66a8,8,0,0,1-5.65,2.34H64V115.31a8,8,0,0,1,2.34-5.65L136.4,40.4a56,56,0,0,1,79.2,79.2Z"/><line x1="112" y1="64.52" x2="112" y2="144"/><line x1="136" y1="120" x2="215.2" y2="120"/></svg>');
				}
				&[data-icon='flask'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
				}
				&[data-icon='flower-lotus'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M128,200s40-22,40-80.82c0-46-24.55-69.54-35.19-77.56a8,8,0,0,0-9.62,0C112.55,49.64,88,73.14,88,119.18,88,178,128,200,128,200Z"/><path d="M94.6,80.8C81.28,70,68.56,65.79,61,64.18a8.2,8.2,0,0,0-9.52,5.52c-3.88,12-8.78,39.66,11.11,74.27s53.07,53.4,65.37,56"/><path d="M161.4,80.8c13.32-10.82,26-15,33.56-16.62a8.2,8.2,0,0,1,9.52,5.52c3.88,12,8.78,39.66-11.11,74.27S140.3,197.37,128,200"/><path d="M128,200c15.37,0,40.77-.18,70-17.64s38.69-39.34,41.72-50.54a7.94,7.94,0,0,0-5.46-9.78,69.59,69.59,0,0,0-30.82-.64"/><path d="M52.56,121.4a69.59,69.59,0,0,0-30.82.64,7.94,7.94,0,0,0-5.46,9.78c3,11.2,12.49,33.07,41.72,50.54S112.63,200,128,200"/></svg>');
				}
				&[data-icon='hand-heart'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32"/></svg>');
				}
				&[data-icon='lifebuoy'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="128" cy="128" r="96"/><circle cx="128" cy="128" r="40"/><line x1="99.72" y1="99.72" x2="60.12" y2="60.12"/><line x1="156.28" y1="99.72" x2="195.88" y2="60.12"/><line x1="156.28" y1="156.28" x2="195.88" y2="195.88"/><line x1="99.72" y1="156.28" x2="60.12" y2="195.88"/></svg>');
				}
				&[data-icon='pen-nib'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M40,216l139.45-23.24a8,8,0,0,0,6.17-5.08L208,128,128,48,68.32,70.38a8,8,0,0,0-5.08,6.17Z"/><path d="M208,128l29.66-29.66a8,8,0,0,0,0-11.31L169,18.34a8,8,0,0,0-11.31,0L128,48"/><circle cx="124" cy="132" r="20"/><line x1="40.01" y1="216" x2="109.86" y2="146.14"/></svg>');
				}
				&[data-icon='rss'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M64,40A152,152,0,0,1,216,192"/><path d="M64,112a80,80,0,0,1,80,80"/><circle cx="68" cy="188" r="12"/></svg>');
				}
				&[data-icon='suitcase'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="32" y="64" width="192" height="144" rx="8"/><path d="M168,208V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V208"/></svg>');
				}
				&[data-icon='x'] {
					--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="200" y1="56" x2="56" y2="200"/><line x1="200" y1="200" x2="56" y2="56"/></svg>');
				}
			}
		}
	}
</style>
