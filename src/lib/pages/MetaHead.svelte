<script>
	export let title;
	export let canonical = '';
	export let description = '';
	export let post = undefined;
	export let social = {};

	const hostTitle = 'DevMauss';
	const hostname = 'mauss.dev';

	import { stores } from '@sapper/app';
	const { page } = stores();
	$: url = $page.host === hostname ? `https://${hostname}/${canonical}` : null;
</script>

<svelte:head>
	{#if url}
		<link rel="canonical" href={url} />
	{/if}

	<title>{title} • {hostTitle}</title>
	<meta name="author" content="Ignatius Bagussuputra" />

	{#if description}
		<meta name="description" content={description} />
	{:else if post}
		<meta name="description" content={post.description} />
	{/if}

	{#if post}
		<meta property="og:title" content={post.title} />
		<meta property="og:type" content="article" />
		{#if url}
			<meta property="og:url" content={url} />
		{/if}
		{#if post.description}
			<meta property="og:description" content={post.description} />
		{/if}

		{#if post.date && post.date.published}
			<meta property="article:published_time" content={post.date.published} />
			<meta property="article:modified_time" content={post.date.updated} />
		{/if}
		<meta property="article:author" content="Ignatius Bagussuputra" />
		<meta property="article:author" content="Ignatius Bagus" />
		{#if post.tags}
			{#each post.tags as tag, i}
				{#if !i}
					<meta property="article:section" content={tag} />
				{/if}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}

		{#if social.twitter}
			<meta name="generator" content="Ignatius on Svelte + Sapper!" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@ignatiusmbs" />
			<meta name="twitter:creator" content="@ignatiusmbs" />
			{#if url}
				<meta name="twitter:url" content={url} />
			{/if}
			<meta name="twitter:title" content={post.title} />
			{#if post.description}
				<meta name="twitter:description" content={post.description} />
			{/if}
		{/if}
	{/if}

	<meta property="og:site_name" content={hostTitle} />
	<meta property="og:locale" content="en_ID" />
	<slot />
</svelte:head>
