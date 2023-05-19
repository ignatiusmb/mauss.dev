<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import ReviewCard from './ReviewCard.svelte';

	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { building } from '$app/environment';
	import { page } from '$app/stores';
	import { sift, sieve } from '$lib/utils/search';

	export let data: import('./$types').PageData;

	const store = writable(data.reviews);
	let search = (!building && $page.url.searchParams.get('q')) || '';
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data.reviews);
	$: items = sift(query, filtered);
	// $: shareable = qpm({ q: query }).replace(/(%20)+/g, '+');
</script>

<LayoutPicker header>
	<svelte:fragment slot="header">
		<h1>Alchemauss Reviews</h1>
		<SearchBar unique={data.unique} bind:query bind:filters />
		<Pagination
			{store}
			{items}
			bound={12}
			increment={12}
			styles={{ '--text-color': 'var(--fg-surface)' }}
		/>
	</svelte:fragment>

	{#each $store as post (post.slug)}
		<div animate:flip={{ duration: TIME.SLIDE }} transition:scale|local={{ duration: TIME.SLIDE }}>
			<ReviewCard {post} />
		</div>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
</LayoutPicker>

<style>
	div {
		display: grid;
	}
	div:not(.empty) {
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
