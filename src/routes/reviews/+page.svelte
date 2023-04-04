<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';

	// import { debounce } from 'mauss';
	// import { qpm } from 'mauss/web';
	import { writable } from 'svelte/store';
	import { building } from '$app/environment';
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { sift, sieve } from '$lib/utils/search';

	export let data: import('./$types').PageData;

	const store = writable([]);
	// const share = debounce((url: string) => {
	// 	goto(url, { replaceState: true, keepfocus: true });
	// }, 500);

	let search = (!building && $page.url.searchParams.get('q')) || '';
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data.reviews);
	$: items = sift(query, filtered);

	// $: shareable = qpm({ q: query }).replace(/(%20)+/g, '+');
	// $: shareable && share(shareable);
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
		<SearchBar unique={data.unique} bind:query bind:filters />
		<Pagination {store} {items} bound={12} increment={12} />
	</svelte:fragment>

	<AnimatedKey items={$store} component={ReviewCard}>
		<h2 slot="empty">There are no matching {query ? 'titles' : 'filters'}</h2>
	</AnimatedKey>
</LayoutPicker>
