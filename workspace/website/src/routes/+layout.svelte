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
	title="{page.data.meta?.title || page.status}{page.url.pathname === '/' ? '' : ' | Alchemauss'}"
	canonical={page.data.meta?.canonical}
	description={page.data.meta?.description}
	authors={['Ignatius Bagus.']}
	alternate={[
		{
			type: 'application/rss+xml',
			href: '/rss.xml',
			hreflang: 'en',
			title: 'Alchemauss Feed',
		},
		{
			type: 'application/json',
			href: '/content/curated.json',
			hreflang: 'en',
			title: 'Alchemauss Curation',
		},
		{
			type: 'application/json',
			href: '/content/posts.json',
			hreflang: 'en',
			title: 'Alchemauss Posts',
		},
		{
			type: 'application/json',
			href: '/content/reviews.json',
			hreflang: 'en',
			title: 'Alchemauss Reviews',
		},
	]}
	scripts={{
		'/_vercel/speed-insights/script.js': !dev && { 'data-route': page.route.id },
	}}
/>

<div data-sveltekit-reload={updated.current || 'off'}>
	<Navigation />

	<main>
		{@render children()}
	</main>

	<Footer />

	<ScrollTop
		styles={{
			'--background': '#0e0e0e',
		}}
	/>
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

		@media screen and (min-width: 549px) {
			padding: 1rem 0;
		}

		> main {
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

			&[data-icon='arrow-circle-right'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><line x1="88" y1="128" x2="168" y2="128"/><polyline points="136 96 168 128 136 160"/></svg>');
			}
			&[data-icon='arrow-right'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="40" y1="128" x2="216" y2="128"/><polyline points="144 56 216 128 144 200"/></svg>');
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
			&[data-icon='calendar-dots'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="40" y="40" width="176" height="176" rx="8"/><line x1="176" y1="24" x2="176" y2="56"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="40" y1="88" x2="216" y2="88"/><circle cx="128" cy="132" r="12"/><circle cx="172" cy="132" r="12"/><circle cx="84" cy="172" r="12"/><circle cx="128" cy="172" r="12"/><circle cx="172" cy="172" r="12"/></svg>');
			}
			&[data-icon='chats'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M71.58,144,32,176V48a8,8,0,0,1,8-8H168a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z"/><path d="M80,144v40a8,8,0,0,0,8,8h96.42L224,224V96a8,8,0,0,0-8-8H176"/></svg>');
			}
			&[data-icon='devices'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="136" y="104" width="128" height="80" rx="16" transform="translate(344 -56) rotate(90)"/><line x1="128" y1="208" x2="88" y2="208"/><path d="M160,176H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H184a16,16,0,0,1,16,16V80"/><line x1="192" y1="112" x2="208" y2="112"/></svg>');
			}
			&[data-icon='drop-half'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z"/><line x1="128" y1="224" x2="128" y2="16"/><line x1="128" y1="128" x2="206.7" y2="128"/><line x1="128" y1="96" x2="196.63" y2="96"/><line x1="128" y1="160" x2="206.4" y2="160"/><line x1="128" y1="192" x2="192" y2="192"/><line x1="128" y1="64" x2="176.98" y2="64"/></svg>');
			}
			&[data-icon='feather'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="184" y1="72" x2="32" y2="224"/><path d="M146.34,189.66a8,8,0,0,1-5.65,2.34H64V115.31a8,8,0,0,1,2.34-5.65L136.4,40.4a56,56,0,0,1,79.2,79.2Z"/><line x1="112" y1="64.52" x2="112" y2="144"/><line x1="136" y1="120" x2="215.2" y2="120"/></svg>');
			}
			&[data-icon='flask'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
			}
			&[data-icon='hand-heart'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32"/></svg>');
			}
			&[data-icon='hand-waving'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M96.65,62a20,20,0,0,1,34.64-20l30,52"/><path d="M69.32,94.67,55.08,70A20,20,0,0,1,89.73,50l31.17,54"/><path d="M158.87,160A40,40,0,0,1,168,105.58L161.32,94A20,20,0,0,1,196,74l17.31,30A80,80,0,0,1,74.7,184l-40-69.32a20,20,0,0,1,34.64-20L88.57,128"/><path d="M192,33.78A51.84,51.84,0,0,1,223.67,58l.33.57"/><path d="M74.62,232A111.88,111.88,0,0,1,47,200"/></svg>');
			}
			&[data-icon='handshake'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="200 152 160 192 96 176 40 136"/><polyline points="72.68 70.63 128 56 183.32 70.63"/><path d="M34.37,60.42,8.85,111.48a8,8,0,0,0,3.57,10.73L40,136,72.68,70.63,45.11,56.85A8,8,0,0,0,34.37,60.42Z"/><path d="M216,136l27.58-13.79a8,8,0,0,0,3.57-10.73L221.63,60.42a8,8,0,0,0-10.74-3.57L183.32,70.63Z"/><path d="M184,72H144L98.34,116.29a8,8,0,0,0,1.38,12.42C117.23,139.9,141,139.13,160,120l40,32,16-16"/><polyline points="124.06 216 82.34 205.57 56 186.75"/></svg>');
			}
			&[data-icon='heartbeat'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="32 136 72 136 88 112 120 160 136 136 160 136"/><path d="M24,104c0-.67,0-1.33,0-2A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54c0,66-104,122-104,122s-42-22.6-72.58-56"/></svg>');
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
			&[data-icon='menu'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="40" y1="128" x2="216" y2="128"/><line x1="40" y1="64" x2="216" y2="64"/><line x1="40" y1="192" x2="216" y2="192"/></svg>');
			}
			&[data-icon='notepad'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="96" y1="128" x2="160" y2="128"/><line x1="96" y1="160" x2="160" y2="160"/><path d="M48,40H208a0,0,0,0,1,0,0V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24V40A0,0,0,0,1,48,40Z"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="128" y1="24" x2="128" y2="56"/><line x1="176" y1="24" x2="176" y2="56"/></svg>');
			}
			&[data-icon='pulse'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><polyline points="24 128 56 128 96 40 160 208 200 128 232 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
			}
			&[data-icon='rss'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M64,40A152,152,0,0,1,216,192"/><path d="M64,112a80,80,0,0,1,80,80"/><circle cx="68" cy="188" r="12"/></svg>');
			}
			&[data-icon='share-network'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="64" cy="128" r="32"/><circle cx="176" cy="200" r="32"/><circle cx="176" cy="56" r="32"/><line x1="149.09" y1="73.3" x2="90.91" y2="110.7"/><line x1="90.91" y1="145.3" x2="149.09" y2="182.7"/></svg>');
			}
			&[data-icon='sparkle'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M84.27,171.73l-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3a7.92,7.92,0,0,1,0,14.86l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0Z"/><line x1="176" y1="16" x2="176" y2="64"/><line x1="224" y1="72" x2="224" y2="104"/><line x1="152" y1="40" x2="200" y2="40"/><line x1="208" y1="88" x2="240" y2="88"/></svg>');
			}
			&[data-icon='stack'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="32 176 128 232 224 176"/><polyline points="32 128 128 184 224 128"/><polygon points="32 80 128 136 224 80 128 24 32 80"/></svg>');
			}
			&[data-icon='terminal-window'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="80 96 120 128 80 160"/><line x1="136" y1="160" x2="176" y2="160"/><rect x="32" y="48" width="192" height="160" rx="8"/></svg>');
			}
			&[data-icon='user-focus'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="180 40 216 40 216 76"/><polyline points="180 216 216 216 216 180"/><polyline points="76 216 40 216 40 180"/><polyline points="76 40 40 40 40 76"/><circle cx="128" cy="112" r="32"/><path d="M80,168a60,60,0,0,1,96,0"/></svg>');
			}
			&[data-icon='x'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="200" y1="56" x2="56" y2="200"/><line x1="200" y1="200" x2="56" y2="56"/></svg>');
			}
		}
	}
</style>
