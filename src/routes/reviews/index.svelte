<script context="module">
	import { rSlice as store } from '$lib/utils/stores';
	export async function load({ fetch, page: { query } }) {
		const data = await fetch('/reviews.json').then((r) => r.json());
		const categories = [...new Set(data.map((p) => p.category))];
		const genres = [...new Set(data.flatMap((p) => p.genres))].sort();
		store.set(query.has('q') ? sift(query.get('q'), data) : data);
		return {
			props: {
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
			},
		};
	}
</script>

<script>
	export let data, search, unique;
	let query = (search.has('q') && search.get('q').replace(/\+/g, ' ')) || '';

	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { sift, sieve } from '$lib/utils/search';
	const duration = 100;

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import PerspectiveCarousel from '$lib/components/PerspectiveCarousel.svelte';

	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };
	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc.">
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header>
	<svelte:fragment slot="header">
		<h1>DevMauss Reviews</h1>
		<SearchBar bind:query bind:filters {unique} />
		<Pagination {store} {items} bound={12} increment={12} />
	</svelte:fragment>

	{#each $store as post (post.slug)}
		<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
			<ReviewCard {post} />
		</div>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
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
