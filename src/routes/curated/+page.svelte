<script lang="ts">
	export let data: import('$lib/types').Curated[];
	import { sift, sieve } from '$lib/utils/search';
	import { cSlice as store } from '$lib/utils/stores';

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import CuratedPost from '$lib/components/CuratedPost.svelte';

	let query: string;
	let filters = { categories: [], tags: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data);
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
