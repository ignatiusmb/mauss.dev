<script>
	export let path = null;
	export let post;
	const link = 'https://github.com/ignatiusmb/mauss/commits/master';
	import { Link } from '@ignatiusmb/elements';
	import Edit from '../svelte/Edit.svelte';
	import { createPrettyDate } from '../utils/helper';
	$: ({ published, updated } = post.date || {});
	$: pretty = {
		published: createPrettyDate(published),
		updated: createPrettyDate(updated),
	};
</script>

<header>
	{#if typeof post.title === 'string'}
		<h1>{post.title}</h1>
	{:else if post.title.jp}
		<h1>{post.title.jp}</h1>
	{:else}
		<h1>{post.title.en}</h1>
	{/if}

	<small>
		{#if updated && updated !== published}
			<span>
				{#if path}
					<time datetime={updated}>Updated {pretty.updated.complete}</time>
					<Link href="{link}/{path}" newTab>[revision history]</Link>
				{:else}
					<time datetime={updated}>Updated {pretty.updated.complete}</time>
				{/if}
			</span>
		{/if}
		{#if published}
			<span>
				<time datetime={published}>
					{#if published !== updated}Published on{/if}
					{pretty.published.weekday}, {pretty.published.complete}
				</time>
			</span>
		{/if}

		<span>{post.read_time} min read</span>
		{#if path}
			<Edit {path} />
		{/if}
	</small>

	<slot />
</header>

<style>
	header,
	header > :global(div) {
		display: grid;
		gap: 0.5em;
		line-height: 1;
		font-family: var(--aqua-heading);
	}

	h1 {
		margin: 1em 0 0.5em;
		font-size: clamp(2rem, 4vw, 2.5rem);
	}
	small,
	header > :global(div > small) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: clamp(0.9rem, 2vw, 1.1rem);
	}
	small:first-of-type > :not(:last-child)::after,
	header > :global(div > small:first-of-type > :not(:last-child)::after) {
		content: '~';
		margin: 0 0.5em;
		color: rgba(var(--theme-secondary), 1);
		font-weight: bolder;
	}
	small > :global(span),
	header > :global(div > small > span) {
		margin-bottom: 0.25em;
	}
	small time + :global(.lmns-link) {
		font: 90% var(--aqua-monospace);
	}
</style>
