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
	import { page, updated } from '$app/stores';
	import { onMount } from 'svelte';

	const { children } = $props();

	onMount(() => updated.check());
	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<MetaHead
	domain="https://mauss.dev"
	title="{$page.data.meta?.title || $page.status} | Alchemauss"
	canonical={$page.data.meta?.canonical}
	description={$page.data.meta?.description}
	authors={['Ignatius Bagussuputra']}
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
	scripts={[!dev && '/_vercel/insights/script.js']}
/>

<Navigation />

<main data-sveltekit-reload={$updated || 'off'}>
	{@render children()}
</main>

<Footer />

<ScrollTop
	styles={{
		'--background': '#0e0e0e',
	}}
/>

<style>
	main {
		position: relative;
		width: 100%;
		display: grid;
		gap: 2rem;
		grid-template-columns: minmax(0, 1fr);
		padding: 0 1rem;
		margin-top: 2rem;
		transition: var(--t-duration);

		& > :global(:not(article)) {
			max-width: 86rem;
			width: 100%;
			position: relative;
			margin: 0 auto;
		}

		& :global(.syv-core-pagination) {
			max-width: 32rem;
		}
		& :global(.syv-core-search-bar) {
			border-radius: var(--b-radius);
		}
	}
</style>
