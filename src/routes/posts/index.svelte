<script context="module">
	export async function preload() {
		const data = await this.fetch('posts.json').then((r) => r.json());
		const tags = Array.from(new Set(data.flatMap((p) => p.tags))).sort();
		const categories = Array.from(new Set(data.map((p) => p.tags[0]))).sort();
		return { data, unique: { categories, tags } };
	}
</script>

<script>
	export let data, unique;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const bound = 6;
	const duration = 100;

	import { SearchBar, Pagination } from '@ignatiusmb/elements';
	import MetaHead from '../../pages/MetaHead.svelte';
	import LayoutPicker from '../../pages/LayoutPicker.svelte';
	import PostCard from '../../components/PostCard.svelte';

	import { pSlice as store } from '../../stores';
	import { sieve, filter } from '../../utils/search';
	let query, filtered, sieved;
	let filters = { categories: [], tags: [], sort: 'updated' };

	$: filtered = filter(filters, data);
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header view="grid" itemSize="21em">
	<header slot="header">
		<h1>Posts by DevMauss</h1>

		<SearchBar bind:query bind:filters {unique}>
			<section>
				<h3>Sort by</h3>
				<label>
					<input type="radio" bind:group={filters.sort} value="updated" />
					<span>Last updated</span>
				</label>
				<label>
					<input type="radio" bind:group={filters.sort} value="published" />
					<span>Date published</span>
				</label>
			</section>
		</SearchBar>

		<Pagination {store} {total} {bound} />
	</header>

	{#each sieved.slice($store * bound, $store * bound + bound) as post (post.slug)}
		<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
			<PostCard {post} />
		</div>
	{/each}
</LayoutPicker>

<style>
	h1 {
		text-align: center;
	}
	div {
		display: grid;
	}
</style>
