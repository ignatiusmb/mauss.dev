<script>
	import '@fontsource-variable/karla';
	import '@fontsource-variable/fira-code';
	import '@ignatiusmb/styles/core.css';
	import 'marqua/styles/code.css';
	import '../app.css';
	import '$lib/styles/blog.css';

	import ScrollTop from 'syv/core/ScrollTop.svelte';
	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	const feeds = [
		{ href: '/content/curated.json', title: 'Alchemauss Curation' },
		{ href: '/content/posts.json', title: 'Alchemauss Posts' },
		{ href: '/content/reviews.json', title: 'Alchemauss Reviews' },
	];
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

	{#if $page.data.meta.og}
		{@const { title, url, description } = $page.data.meta.og}
		<meta property="og:title" content={title} />
		<meta property="og:type" content="article" />
		{#if url}
			<meta property="og:url" content={url} />
		{/if}
		{#if description}
			<meta property="og:description" content={description} />
		{/if}

		<!-- 
		{#if post.date && post.date.published}
			<meta property="article:published_time" content={post.date.published} />
			<meta property="article:modified_time" content={post.date.updated} />
		{/if} 
		-->
		<meta property="article:author" content="Ignatius Bagussuputra" />
		<meta property="article:author" content="Ignatius Bagus" />
		<!--
		{#if post.tags}
			{#each post.tags as tag, i}
				{#if !i}
					<meta property="article:section" content={tag} />
				{/if}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
		-->

		<!-- 
		{#if social.twitter}
			<meta name="generator" content="Ignatius on SvelteKit!" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@alchemauss" />
			<meta name="twitter:creator" content="@alchemauss" />
			{#if url}
				<meta name="twitter:url" content={url} />
			{/if}
			<meta name="twitter:title" content={post.title} />
			{#if post.description}
				<meta name="twitter:description" content={post.description} />
			{/if}
		{/if}
 		-->
	{/if}
</svelte:head>

<Navigation />

<slot />

<Footer />

<ScrollTop
	styles={{
		'--background': 'transparent',
	}}
/>
