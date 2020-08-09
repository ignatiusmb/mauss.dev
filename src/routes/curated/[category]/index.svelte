<script context="module">
	export async function preload({ params }) {
		const { category } = params;
		const list = await this.fetch('curated.json').then((r) => r.json());
		return { category, data: list.filter((p) => p.category === category) };
	}
</script>

<script>
	export let category, data;
	import { ButtonLink } from '@ignatiusmb/elements/styled';
	import MetaHead from '../../../pages/MetaHead.svelte';

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

<MetaHead canonical="curated" title="Curated" description="Curated content for {category} stuff.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<header>
	<h1>Curated by Mauss</h1>
</header>

<main>
	{#each data as { slug, title } (slug)}
		<section animate:flip transition:scale|local>
			<small>{title}</small>
			<ButtonLink href="curated/{slug}">read</ButtonLink>
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
		border-radius: 0.25em;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: rgba(var(--bg-color-secondary, 1));
	}
	small {
		padding-left: 0.5em;
	}
</style>
