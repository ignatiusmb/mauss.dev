<script context="module">
	import { rSlice as store } from '$lib/utils/stores';
	export async function load({ fetch }) {
		const data = await fetch('/reviews.json').then((r) => r.json());
		const categories = [...new Set(data.map((p) => p.category))];
		const genres = [...new Set(data.flatMap((p) => p.genres))].sort();
		return {
			props: {
				data,
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
	export let data, unique;

	import { debounce } from 'mauss';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { duration } from 'syv/options';
	import { qpm } from '$lib/mauss';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { sift, sieve } from '$lib/utils/search';

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';

	let search = $page.query.get('q');
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	const share = debounce((url) => goto(url, { replaceState: true, keepfocus: true }), 500);

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;

	$: shareable = qpm({ q: query }).replace(/(%20)+/g, '+');
	$: shareable && share(shareable);
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc."
>
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header>
	<svelte:fragment slot="header">
		<h1>Alchemauss Reviews</h1>
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
