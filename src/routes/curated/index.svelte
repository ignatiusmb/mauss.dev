<script context="module">
	import type { Preload } from '@sapper/common';
	import type { Curated } from '$utils/types';
	export const preload: Preload = async function (this) {
		const data: Curated[] = await this.fetch('curated.json').then((r) => r.json());
		return { data };
	};
</script>

<script>
	export let data: Curated[];

	import { SearchBar, Pagination } from 'svelement';
	import MetaHead from '$pages/MetaHead.svelte';
	import LayoutPicker from '$pages/LayoutPicker.svelte';

	import { sift, sieve } from '$utils/search';
	import { cSlice as store } from '$utils/stores';
	import AnimatedKey from '$components/AnimatedKey.svelte';
	import CuratedPost from '$components/CuratedPost.svelte';

	let query: string;
	let filters = { categories: [], tags: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;
</script>

<MetaHead
	canonical="curated"
	title="Curated"
	description="Curated content for all kinds of programming, lifestyle, and many more.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header view="grid" itemSize="18em">
	<header slot="header">
		<h1>Curated by DevMauss</h1>
		<SearchBar bind:query />
		<Pagination {store} {items} bound={8} />
	</header>

	<AnimatedKey items={$store} component={CuratedPost} />
</LayoutPicker>
