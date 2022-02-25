<script context="module" lang="ts">
	export const load: import('@sveltejs/kit').Load = async ({ fetch }) => {
		const data: any[] = await fetch('/posts.json').then((r) => r.json());
		const tags = [...new Set(data.flatMap((p) => p.tags))].sort();
		const categories = [...new Set(data.map((p) => p.tags[0]))].sort();
		const sort_by = { updated: 'Last Updated', published: 'Last Published' };
		return { props: { data, unique: { categories, tags, sort_by } } };
	};
</script>

<script lang="ts">
	export let data: any, unique: typeof filters;
	import { sift, sieve } from '$lib/utils/search';
	import { pSlice as store } from '$lib/utils/stores';

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	let filters = { categories: [], tags: [], sort_by: 'updated' },
		query: string;

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here.">
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header itemSize="21em">
	<svelte:fragment slot="header">
		<h1>Posts by Alchemauss</h1>
		<SearchBar bind:query bind:filters {unique} />
		<Pagination {store} {items} bound={6} />
	</svelte:fragment>

	<AnimatedKey items={$store} component={PostCard}>
		<h2 slot="empty">There are no matching {query ? 'titles' : 'filters'}</h2>
	</AnimatedKey>
</LayoutPicker>
