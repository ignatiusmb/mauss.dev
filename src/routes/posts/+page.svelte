<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import PostCard from './PostCard.svelte';

	import { writable } from 'svelte/store';
	import { sift, sieve } from '$lib/utils/search';

	export let data: import('./$types').PageData;

	const store = writable(data.posts);
	let filters = { categories: [], tags: [], sort_by: 'updated' };
	let query = '';

	$: filtered = sieve(filters, data.posts);
	$: items = sift(query, filtered);
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here.">
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header itemSize="21em">
	<svelte:fragment slot="header">
		<h1>Posts by Alchemauss</h1>
		<SearchBar unique={data.unique} bind:query bind:filters />
		<Pagination {store} {items} bound={6} />
	</svelte:fragment>

	<AnimatedKey items={$store} component={PostCard}>
		<h2 slot="empty">There are no matching {query ? 'titles' : 'filters'}</h2>
	</AnimatedKey>
</LayoutPicker>
