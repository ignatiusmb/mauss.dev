<script lang="ts">
	export let data: import('./$types').PageData;

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { ButtonLink } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
</script>

<MetaHead
	canonical="curated"
	title="Curated"
	description="Curated content for {data.category} stuff."
>
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<header>
	<h1>Curated by Alchemauss</h1>
</header>

<main>
	{#each data.curated as { slug, title } (slug)}
		<section animate:flip transition:scale|local>
			<small>{title}</small>
			<ButtonLink href="/curated/{slug}/">read</ButtonLink>
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
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	small {
		padding-left: 0.5em;
	}
</style>
