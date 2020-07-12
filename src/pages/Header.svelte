<script>
	export let path = null;
	export let post;
	import Edit from '../svelte/Edit.svelte';
	import { createPrettyDate } from '../utils/helper';
	$: date = createPrettyDate(post.date_published);
	$: updated = createPrettyDate(post.date_updated);
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
		{#if post.date_updated && post.date_updated !== post.date_published}
			<span>
				<time datetime={post.date_updated}>Updated {updated.complete}</time>
			</span>
		{/if}
		{#if post.date_published}
			<span>
				<time datetime={post.date_published}>
					{#if post.date_published !== post.date_updated}Originally posted on{/if}
					{date.weekday}, {date.complete}
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
	header {
		display: grid;
		gap: 0.5em;
		line-height: 1;
		font-family: var(--aqua-heading);
	}

	h1 {
		margin: 1em 0 0.5em;
		font-size: clamp(2rem, 4vw, 2.5rem);
	}
	small {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: clamp(0.9rem, 2vw, 1.1rem);
	}
	small:first-of-type :not(:last-child)::after {
		content: '~';
		margin: 0 0.5em;
		color: var(--mauss-secondary);
		font-weight: bolder;
	}
	small > :global(span) {
		margin-bottom: 0.25em;
	}
</style>
