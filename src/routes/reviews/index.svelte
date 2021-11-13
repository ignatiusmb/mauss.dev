<script context="module">
	import { rSlice as store } from '$lib/utils/stores';
	export async function load({ fetch }) {
		const data = await fetch('/reviews.json').then((r) => r.json());
		const categories = [...new Set(data.map((p) => p.category))];
		const genres = [...new Set(data.flatMap((p) => p.genres))].sort();
		return {
			props: {
				data,
				unique: {
					categories,
					genres,
					verdict: {
						'2': 'Must-watch!',
						'1': 'Recommended',
						'0': 'Contextual',
						'-1': 'Not recommended',
						'-2': 'Pending',
					},
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
	}
</script>

<script>
	export let data, unique;

	import { debounce } from 'mauss';
	import { qpm } from '$lib/mauss';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { sift, sieve } from '$lib/utils/search';

	import { SearchBar, Pagination } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import AnimatedKey from '$lib/components/AnimatedKey.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';

	const share = debounce((url) => goto(url, { replaceState: true, keepfocus: true }), 500);
	const params = browser ? new URLSearchParams(location.search) : '';

	let search = params ? params.get('q') : '';
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data);
	$: items = query ? sift(query, filtered) : filtered;

	$: shareable = qpm({ q: query }).replace(/(%20)+/g, '+');
	$: shareable && share(shareable);
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
