<script context="module">
	export async function preload() {
		const data = await this.fetch('reviews.json').then((r) => r.json());
		const genres = data.flatMap((p) => p.genres);
		const unique = {
			categories: data.reduce((a, c) => (a.includes(c.category) ? a : [...a, c.category]), []),
			genres: genres.reduce((a, c) => (a.includes(c) ? a : c ? [...a, c] : a), []).sort(),
			verdict: data.reduce((a, c) => (a.includes(c.verdict) ? a : [...a, c.verdict]), []),
		};
		return { data, unique };
	}
</script>

<script>
	export let data, unique;
	import MetaHead from '../../pages/MetaHead.svelte';
	import PageHeader from '../../pages/PageHeader.svelte';
	import Centered from '../../pages/Centered.svelte';
	import Searchbar from '../../svelte/Searchbar.svelte';
	import Pagination from '../../svelte/Pagination.svelte';

	import FilterGrid from '../../components/FilterGrid.svelte';
	import ReviewCard from '../../components/ReviewCard.svelte';

	import { mobile, rSlice } from '../../stores';
	const bound = 12;
	const duration = 100;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { sieve } from '../../utils/search';
	import { compareDate, sortCompare } from '../../utils/helper';
	let query, show, filtered, sieved;
	let filters = { categories: [], genres: [], verdict: [], sort: 'updated' };

	$: {
		filtered = data;
		for (const key in filters) {
			if (!filters[key].length) continue;
			if (key === 'genres') {
				const scan = (g) => filters.genres.includes(g);
				const check = (p) => p.genres.filter(scan).length;
				filtered = filtered.filter(check);
			} else if (key === 'categories') {
				filtered = filtered.filter((p) => filters.categories.includes(p.category));
			} else if (key === 'verdict') {
				filtered = filtered.filter((p) => filters.verdict.includes(p.verdict));
				if (filters.verdict.includes('-2')) {
					filtered = [...filtered, ...data.filter((p) => !p.verdict)];
				}
			} else {
				if (filters[key] === 'updated') {
					filtered = filtered.sort(sortCompare);
				} else if (filters[key] === 'rating') {
					filtered = filtered.sort((x, y) => y.rating - x.rating || sortCompare(x, y));
				} else if (filters[key] === 'published') {
					filtered = filtered.sort((x, y) => {
						return compareDate(x.date_published, y.date_published) || sortCompare(x, y);
					});
				} else if (filters[key] === 'year') {
					filtered = filtered.sort((x, y) => y.year - x.year || sortCompare(x, y));
				}
			}
		}
	}
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
	$: $rSlice = $rSlice * bound > total ? 0 : $rSlice;
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc." />

<PageHeader>
	<h1>Mauss Reviews</h1>
	<Searchbar bind:query filters on:filter={() => (show = !show)} />
	<FilterGrid {show} {unique} bind:filters>
		<section>
			<h3>Verdict</h3>
			{#each unique.verdict as rec}
				<label>
					{#if rec === '2'}
						<input type="checkbox" bind:group={filters.verdict} value="2" />
						<span>Must-watch!</span>
					{:else if rec === '1'}
						<input type="checkbox" bind:group={filters.verdict} value="1" />
						<span>Recommended</span>
					{:else if rec === '0'}
						<input type="checkbox" bind:group={filters.verdict} value="0" />
						<span>Contextual</span>
					{:else if rec === '-1'}
						<input type="checkbox" bind:group={filters.verdict} value="-1" />
						<span>Not recommended</span>
					{:else}
						<input type="checkbox" bind:group={filters.verdict} value="-2" />
						<span>Pending</span>
					{/if}
				</label>
			{/each}
		</section>

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
			<label>
				<input type="radio" bind:group={filters.sort} value="year" />
				<span>Year released</span>
			</label>
			<label>
				<input type="radio" bind:group={filters.sort} value="rating" />
				<span>Rating</span>
			</label>
		</section>
	</FilterGrid>
	<Pagination store={rSlice} {total} {bound} />
</PageHeader>

<main>
	{#each sieved.slice($rSlice * bound, $rSlice * bound + bound) as post (post.slug)}
		<section animate:flip={{ duration }} transition:scale|local={{ duration }}>
			<ReviewCard {post} />
		</section>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
</main>

{#if $mobile}
	<Centered>
		<Pagination store={rSlice} {total} {bound} />
	</Centered>
{/if}

<style>
	main {
		width: 100%;
		max-width: 79em;
		position: relative;
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, 12em);
		justify-content: center;
		padding: 0 1em;
		margin: 0 auto;
	}
	main section {
		display: grid;
		grid-template-rows: 1fr auto;
		width: 100%;
		border-radius: 0.25em;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-color-secondary);
	}
	main h2 {
		position: absolute;
		width: 100%;
		text-align: center;
		word-break: break-word;
	}
	main :global(img:not([src])) {
		display: none;
	}
</style>
