<script context="module">
	import { sift, sieve } from '$utils/search';
	import { rSlice as store } from '$utils/stores';
	export async function preload({ query }) {
		const data = await this.fetch('reviews.json').then((r) => r.json());
		const categories = [...new Set(data.map((p) => p.category))];
		const genres = [...new Set(data.flatMap((p) => p.genres))].sort();
		store.set(query.q ? sift(query, data) : data);
		return {
			data,
			search: query,
			unique: {
				categories,
				genres,
				verdict: {
					'2': 'Must-watch!',
					'1': 'Recommended',
					'0': 'Contextual',
					'-1': 'Not recommended',
					'-2': 'Pending',
				},
				sort_by: {
					updated: 'Last updated',
					published: 'Date published',
					released: 'Year released',
					seen: 'Last seen',
					rating: 'Rating',
				},
			},
		};
	}
</script>

<script>
	export let data, search, unique;
	let { q: query } = search;
	if (query) query = query.replace(/\+/g, ' ');

	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const duration = 100;

	import { Feather } from 'svelement/icons';
	import { SearchBar, Pagination } from 'svelement';
	import MetaHead from '$pages/MetaHead.svelte';
	import LayoutPicker from '$pages/LayoutPicker.svelte';
	import ReviewCard from '$components/ReviewCard.svelte';
	import PerspectiveCarousel from '$components/PerspectiveCarousel.svelte';

	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' },
		view = 'grid';
	$: bound = view === 'grid' ? 12 : 3;
	$: increment = view === 'carousel' ? 1 : bound;
	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header {view}>
	<header slot="header">
		<h1>DevMauss Reviews</h1>

		<SearchBar bind:query bind:filters {unique} />

		{#if view !== 'scrollsnap'}
			<Pagination {store} {items} {bound} {increment} />
		{/if}
	</header>

	<aside slot="picker">
		<button class:active={view === 'grid'} on:click={() => (view = 'grid')}>
			<Feather.Grid />
		</button>
		<button class:active={view === 'carousel'} on:click={() => (view = 'carousel')}>
			<Feather.Layers />
		</button>
		<button class:active={view === 'scrollsnap'} on:click={() => (view = 'scrollsnap')}>
			<Feather.Columns />
		</button>
	</aside>

	{#if view === 'grid'}
		{#each $store as post (post.slug)}
			<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
				<ReviewCard {post} />
			</div>
		{:else}
			<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
		{/each}
	{:else if view === 'carousel'}
		<PerspectiveCarousel>
			{#each $store as post, idx (post.slug)}
				<div class:translate-left={idx === 0} class:translate-right={idx === 2}>
					<ReviewCard {post} />
				</div>
			{/each}
		</PerspectiveCarousel>
	{:else if view === 'scrollsnap'}
		<div class="empty" />
		{#each items as post (post.slug)}
			<div animate:flip={{ duration }}>
				<ReviewCard {post} />
			</div>
		{/each}
		<div class="empty" />
	{/if}
</LayoutPicker>

<style>
	div:not(.empty) {
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	h2 {
		position: absolute;
		width: 100%;
		text-align: center;
		word-break: break-word;
	}
</style>
