<script context="module" lang="ts">
	import { capitalize } from 'mauss/utils';
	import { VERDICTS } from '$lib/constants';
	export const load: import('@sveltejs/kit').Load = async ({ fetch }) => {
		const data: any[] = await fetch('/reviews.json').then((r) => r.json());
		const categories = [...new Set(data.map((p) => p.category))];
		const genres = [...new Set(data.flatMap((p) => p.genres))].sort();
		return {
			props: {
				data,
				unique: {
					categories,
					genres,
					verdict: VERDICTS.reduce((a, c) => ({ ...a, [c]: capitalize(c.replace('-', ' ')) }), {}),
					sort_by: {
						updated: 'Last updated',
						published: 'Date published',
						released: 'Year released',
						seen: 'Last seen',
						rating: 'Rating',
					},
				},
			},
		};
	};
</script>

<script lang="ts">
	export let data: any, unique: any;

	// import { debounce } from 'mauss';
	// import { qpm } from 'mauss/web';
	import { prerendering } from '$app/env';
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { sift, sieve } from '$lib/utils/search';
	import { rSlice as store } from '$lib/utils/stores';

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';

	// const share = debounce((url: string) => {
	// 	goto(url, { replaceState: true, keepfocus: true });
	// }, 500);

	let search = (!prerendering && $page.url.searchParams.get('q')) || '';
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;

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
		<SearchBar bind:query bind:filters {unique} />
		<Pagination {store} {items} bound={12} increment={12} />
	</svelte:fragment>

	<AnimatedKey items={$store} component={ReviewCard}>
		<h2 slot="empty">There are no matching {query ? 'titles' : 'filters'}</h2>
	</AnimatedKey>
</LayoutPicker>
