<script>
	import '@fontsource-variable/crimson-pro';
	import '@ignatiusmb/styles/core.css';
	import '$apex/app.css';
	import favicon from './favicon.png';

	import MetaHead from 'syv/core/MetaHead.svelte';
	import Footer from '$apex/routes/Footer.svelte';
	import { page } from '$app/state';

	const { children } = $props();
	const hosted = $derived(page.url.hostname === 'favicon.mauss.dev');
</script>

<MetaHead
	domain="https://favicon.mauss.dev"
	title="SVG to Favicon • Alkamauss"
	canonical="/"
	description="A minimal SVG to favicon generator. Open-source, locally processed, and portable."
	authors={['Ignatius Bagus.']}
	scripts={{
		'/_vercel/insights/script.js': hosted && { 'data-disable-auto-track': '1' },
	}}
>
	<link rel="icon" href={favicon} />
</MetaHead>

<div>
	<header>
		<h1>a minimal SVG to favicon generator</h1>
		<p>
			<a href="https://github.com/ignatiusmb/mauss.dev/tree/master/workspace/favicon">
				open-source,
			</a>
			<span>locally processed, and portable</span>
			{#if page.url.protocol !== 'file:'}
				(<a href="/" download="favicon.html">download this app</a>)
			{/if}
		</p>
	</header>

	<main>
		{@render children()}
	</main>

	<Footer
		from={2025}
		items={[
			{ href: 'https://mauss.dev/atelier#svg-to-favicon', label: 'Alkamauss', icon: 'flask' },
			{ href: 'https://mauss.dev/sponsor', label: 'sponsor', icon: 'hand-heart' },
			{ href: 'https://mauss.dev/posts/svg-to-favicon', label: 'devlog', icon: 'book-open' },
		]}
	/>
</div>

<style>
	div /* holy grail */ {
		min-height: 100dvh;
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

		font-family: 'Crimson Pro Variable', serif;
		transition: var(--transition-base);

		@media screen and (min-width: 549px) {
			padding: 1rem 0;
		}

		header {
			grid-column: content;
			display: grid;
			gap: 1rem;
			margin-top: 1rem;
			text-align: center;
		}

		> main {
			grid-column: content;
			position: relative;

			display: grid;
			gap: 2rem;
			align-content: start;
			justify-content: center;
			grid-template-columns: min(60ch, 100%);

			:global(.syv-core-pagination) {
				max-width: 32rem;
			}
			:global(.syv-core-search-bar) {
				border-radius: var(--rounding-base);
			}
		}

		:global(i[data-icon]) {
			width: 1.5rem;
			height: 1.5rem;
			display: inline-block;
			background: currentColor;
			color: oklch(0.9086 0.0055 298);
			mask: no-repeat center / 100%;
			mask-image: var(--svg);

			&[data-icon='book-open'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M128,88a32,32,0,0,1,32-32h72V200H160a32,32,0,0,0-32,32"/><path d="M24,200H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H24Z"/></svg>');
			}
			&[data-icon='flask'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="88" y1="32" x2="168" y2="32"/><path d="M152,32V99.14l62.85,104.74A8,8,0,0,1,208,216H48a8,8,0,0,1-6.86-12.12L104,99.14V32"/><path d="M71.63,153.08c13.23-2.48,32-1.41,56.37,10.92,32.25,16.33,54.75,12.91,67.5,7.65"/></svg>');
			}
			&[data-icon='hand-heart'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32"/></svg>');
			}
		}
	}
</style>
