<script context="module">
	export async function preload() {
		const data = await this.fetch('curated.json').then((r) => r.json());
		const categories = Array.from(new Set(data.map((p) => p.category)));
		return { data, categories };
	}
</script>

<script>
	export let data, categories;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const bound = 8;

	import { SearchBar, Pagination, ButtonLink } from '@ignatiusmb/elements';
	import MetaHead from '../../pages/MetaHead.svelte';
	import GridView from '../../pages/GridView.svelte';

	import { cSlice as store } from '../../stores';
	import { convertCase } from '../../utils/helper';
	import { sieve, filter } from '../../utils/search';

	let query, filtered, sieved;
	let filters = { categories: [], tags: [], sort: 'updated' };

	$: filtered = filter(filters, data);
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
	$: $store = $store * bound > total ? 0 : $store;
</script>

<MetaHead
	canonical="curated"
	title="Curated"
	description="Curated content for all kinds of programming, lifestyle, and many more.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<GridView>
	<header slot="header">
		<h1>Curated by DevMauss</h1>
	</header>

	{#each categories as category (category)}
		<section animate:flip transition:scale|local>
			<small>{convertCase('pascal', category)}</small>
			<ButtonLink href="curated/{category}">view</ButtonLink>
		</section>
	{/each}
</GridView>

<GridView itemSize="18em">
	<header slot="header">
		<SearchBar bind:query />
		<Pagination {store} {total} {bound} />
	</header>

	{#each sieved.slice($store * bound, $store * bound + bound) as { slug, title } (slug)}
		<section animate:flip transition:scale|local>
			<small>{title}</small>
			<ButtonLink href="curated/{slug}">read</ButtonLink>
		</section>
	{/each}
</GridView>

<style>
	header {
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
