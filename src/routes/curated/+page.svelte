<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import CuratedPost from './CuratedPost.svelte';

	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { sift, sieve } from '$lib/utils/search';

	export let data;

	const store = writable(data.list);
	let filters = { categories: [], tags: [], sort_by: 'updated' };
	let query = '';

	$: filtered = sieve(filters, data.list);
	$: items = sift(query, filtered);
</script>

<LayoutPicker header itemSize="18em">
	<svelte:fragment slot="header">
		<h1>Curated by Alchemauss</h1>
		<SearchBar bind:query />
		<Pagination {store} {items} bound={8} styles={{ '--text-color': 'var(--fg-surface)' }} />
	</svelte:fragment>

	{#each $store as post (post.slug)}
		<div animate:flip={{ duration: TIME.SLIDE }} transition:scale|local={{ duration: TIME.SLIDE }}>
			<CuratedPost {post} />
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
		box-shadow:
			0 2px 1px -1px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
</style>
