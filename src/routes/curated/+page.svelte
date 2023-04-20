<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import CuratedPost from './CuratedPost.svelte';

	import { writable } from 'svelte/store';
	import { sift, sieve } from '$lib/utils/search';

	export let data: import('./$types').PageData;

	const store = writable(data.list);
	let filters = { categories: [], tags: [], sort_by: 'updated' };
	let query = '';

	$: filtered = sieve(filters, data.list);
	$: items = sift(query, filtered);
</script>

<MetaHead
	canonical="curated"
	title="Curated"
	description="Curated content for all kinds of programming, lifestyle, and many more."
>
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header itemSize="18em">
	<svelte:fragment slot="header">
		<h1>Curated by Alchemauss</h1>
		<SearchBar bind:query />
		<Pagination {store} {items} bound={8} />
	</svelte:fragment>

	<AnimatedKey items={$store} component={CuratedPost}>
		<h2 slot="empty">There are no matching {query ? 'titles' : 'filters'}</h2>
	</AnimatedKey>
</LayoutPicker>
