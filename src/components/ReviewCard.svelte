<script>
	export let post;
	import Verdict from '../svelte/Verdict.svelte';
	import ButtonLink from '../svelte/ButtonLink.svelte';

	import CardOverlay from './CardOverlay.svelte';
	import { capitalize } from '../utils/helper';
	const verdict = parseInt(post.verdict);
	const disabled = !post.rating || !post.verdict;
	let show = false;
</script>

<article on:mouseenter={() => (show = true)} on:mouseleave={() => (show = false)}>
	<img src={post.image.en} alt={post.title.en} />
	<CardOverlay {show}>
		<h3>{post.year}</h3>
		{#if post.title.short}
			<h3>{post.title.short}</h3>
		{:else if post.title.jp}
			<h3>{post.title.jp}</h3>
		{:else}
			<h3>{post.title.en}</h3>
		{/if}
	</CardOverlay>
</article>
<aside>
	<small>
		<span>{capitalize(post.category)}</span>
		<span>⭐ {post.rating ? post.rating : '~'}</span>
	</small>
	<small>
		<Verdict {verdict} />
	</small>
	<ButtonLink href="reviews/{post.slug}" {disabled}>{disabled ? 'Work-in-Progress' : 'read'}</ButtonLink>
</aside>

<style>
	article {
		position: relative;
		display: grid;
		grid-template-rows: 18em;
		cursor: pointer;
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		text-align: center;
	}

	aside {
		display: grid;
		gap: 0.5em;
		padding: 0.5em;
		text-align: center;
	}
	aside small:first-child {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	aside :global(:last-child a) {
		width: 100%;
	}
</style>
