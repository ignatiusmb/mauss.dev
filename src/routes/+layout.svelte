<script>
	import '@fontsource-variable/karla';
	import '@fontsource-variable/fira-code';
	import '@ignatiusmb/styles/core.css';
	import 'aubade/styles/code.css';
	import '../app.css';
	import '$lib/styles/blog.css';

	import ScrollTop from 'syv/core/ScrollTop.svelte';
	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	import { dev } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page, updated } from '$app/stores';
	import { onMount } from 'svelte';

	const { children } = $props();

	const feeds = [
		{ href: '/content/curated.json', title: 'Alchemauss Curation' },
		{ href: '/content/posts.json', title: 'Alchemauss Posts' },
		{ href: '/content/reviews.json', title: 'Alchemauss Reviews' },
	];

	onMount(() => updated.check());
	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<svelte:head>
	{#if !dev}<script defer src="/_vercel/insights/script.js"></script>{/if}
	{#if $page.data.meta?.canonical}
		<link rel="canonical" href="https://mauss.dev/{$page.data.meta.canonical}" />
	{/if}

	<title>{$page.data.meta?.title || $page.status} | Alchemauss</title>
	<meta name="author" content="Ignatius Bagussuputra" />

	{#if $page.data.meta?.description}
		<meta name="description" content={$page.data.meta.description} />
	{/if}

	<link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Alchemauss Feed" />
	{#each feeds as { href, title }}
		<link rel="alternate" type="application/json" {href} {title} />
	{/each}

	<meta property="og:site_name" content="Alchemauss" />
	<meta property="og:locale" content="en_ID" />

	{#if $page.data.meta?.og}
		{@const { title, url, description } = $page.data.meta.og}
		<meta property="og:title" content={title} />
		<meta property="og:type" content="article" />
		{#if url}
			<meta property="og:url" content={url} />
		{/if}
		{#if description}
			<meta property="og:description" content={description} />
		{/if}

		<meta property="article:author" content="Ignatius Bagussuputra" />
		<meta property="article:author" content="Ignatius Bagus" />
	{/if}
</svelte:head>

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
