<script context="module">
	export async function preload() {
		const data = await this.fetch('posts.json').then((r) => r.json());
		const tags = [...new Set(data.flatMap((p) => p.tags))].sort();
		const categories = [...new Set(data.map((p) => p.tags[0]))].sort();
		const sort_by = { updated: 'Last Updated', published: 'Last Published' };
		return { data, unique: { categories, tags, sort_by } };
	}
</script>

<script>
	export let data, unique;

	import { SearchBar, Pagination } from 'svelement';
	import MetaHead from '../../pages/MetaHead.svelte';
	import LayoutPicker from '../../pages/LayoutPicker.svelte';
	import AnimatedKey from '../../components/AnimatedKey.svelte';
	import PostCard from '../../components/PostCard.svelte';

	import { sift, sieve } from '../../utils/search';
	import { pSlice as store } from '../../utils/stores';
	let filters = { categories: [], tags: [], sort_by: 'updated' },
		query;

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header view="grid" itemSize="21em">
	<header slot="header">
		<h1>Posts by DevMauss</h1>
		<SearchBar bind:query bind:filters {unique} />
		<Pagination {store} {items} bound={6} />
	</header>

	<AnimatedKey items={$store} component={PostCard} />
</LayoutPicker>
