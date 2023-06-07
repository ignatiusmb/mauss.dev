<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import Link from '$lib/components/Link.svelte';

	import { dt } from 'mauss';

	export let post: import('$lib/content/posts').Post;
</script>

<section>
	<Image src={post.thumbnail || ''} alt={post.title} overlay>
		<span>{post.title}</span>
	</Image>

	<div class="content">
		<h3>{post.title}</h3>
		{#if post.description}
			<small>{post.description}</small>
		{/if}
	</div>

	<aside>
		<time datetime={post.date}>{dt.format(post.date)('DD MMMM YYYY')}</time>
		<small>{post.estimate} min read</small>
		<Link href="/posts/{post.slug}/" style="primary">READ</Link>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: auto 1fr 3em;
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
		transform: translate(0%);
	}
	section > :global(.syv-core-image) {
		cursor: pointer;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		background-color: rgba(0, 0, 0, 0.15);
	}
	.content {
		display: grid;
		gap: 1em;
		align-content: flex-start;
		padding: 1em;
		line-height: 1.5;
	}
	aside {
		display: grid;
		gap: 0.5em;
		grid-template-columns: auto auto 1fr;
		align-items: center;
		padding: 0.5em;
		padding-left: 1em;
		border-radius: var(--b-radius);
	}
	aside time {
		font-size: 0.8rem;
	}
	aside small::before {
		content: '•';
		color: var(--theme-secondary);
		margin-right: 0.5rem;
	}
	aside :global(:last-child) {
		justify-self: end;
	}
</style>
