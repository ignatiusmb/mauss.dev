<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let data;
</script>

<header>
	<h1>Curated by Alchemauss</h1>
</header>

<main>
	{#each data.curated as { slug, title } (slug)}
		<section animate:flip transition:scale|local>
			<small>{title}</small>
			<Link href="/curated/{slug}/" style="primary">READ</Link>
		</section>
	{/each}
</main>

<style>
	header,
	main {
		width: 100%;
		max-width: 48em;
		display: grid;
		gap: 1em;
		padding: 0 1em;
		margin: 0 auto;
	}
	h1 {
		width: 100%;
		margin: 1.5em 0 1em;
		text-align: center;
	}
	section {
		width: 100%;
		min-height: 3em;
		display: grid;
		gap: 0.5em;
		align-items: center;
		grid-template-columns: 1fr auto;
		padding: 0.5em;
		border-radius: var(--b-radius);
		box-shadow:
			0 2px 1px -1px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	small {
		padding-left: 0.5em;
	}
</style>
