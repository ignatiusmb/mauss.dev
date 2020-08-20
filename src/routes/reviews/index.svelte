<script context="module">
	export async function preload({ query }) {
		const data = await this.fetch('reviews.json').then((r) => r.json());
		const genres = data.flatMap((p) => p.genres);
		return {
			data,
			unique: {
				categories: data.reduce((a, c) => (a.includes(c.category) ? a : [...a, c.category]), []),
				genres: genres.reduce((a, c) => (a.includes(c) ? a : c ? [...a, c] : a), []).sort(),
			},
			verdict: data.reduce((a, c) => (a.includes(c.verdict) ? a : [...a, c.verdict]), []),
			query: query.query,
		};
	}
</script>

<script>
	export let data, unique, verdict, query;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const bound = 12;
	const duration = 100;

	import { SearchBar, Pagination } from '@ignatiusmb/elements';
	import MetaHead from '../../pages/MetaHead.svelte';
	import GridView from '../../pages/GridView.svelte';
	import Centered from '../../pages/Centered.svelte';
	import ReviewCard from '../../components/ReviewCard.svelte';

	import { sieve, filter } from '../../utils/search';
	import { mobile, rSlice as store } from '../../stores';
	let sieved;
	let filters = { categories: [], genres: [], verdict: [], sort: 'updated' };

	$: filtered = filter(filters, data);
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
	$: $store = $store * bound > total ? 0 : $store;
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<GridView>
	<header slot="header">
		<h1>DevMauss Reviews</h1>

		<SearchBar bind:query bind:filters {unique}>
			<section>
				<h3>Verdict</h3>
				{#each verdict as rec}
					<label>
						<input type="checkbox" bind:group={filters.verdict} value={rec ? rec : '-2'} />
						{#if rec === '2'}
							<span>Must-watch!</span>
						{:else if rec === '1'}
							<span>Recommended</span>
						{:else if rec === '0'}
							<span>Contextual</span>
						{:else if rec === '-1'}
							<span>Not recommended</span>
						{:else}
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
					<input type="radio" bind:group={filters.sort} value="seen" />
					<span>Last seen</span>
				</label>
				<label>
					<input type="radio" bind:group={filters.sort} value="rating" />
					<span>Rating</span>
				</label>
			</section>
		</SearchBar>

		<Pagination {store} {total} {bound} />
	</header>

	{#each sieved.slice($store * bound, $store * bound + bound) as post (post.slug)}
		<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
			<ReviewCard {post} />
		</div>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
</GridView>
{#if $mobile}
	<Centered>
		<Pagination {store} {total} {bound} />
	</Centered>
{/if}

<style>
	h1 {
		text-align: center;
	}
	div {
		border-radius: 0.25em;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: rgba(var(--bg-color-secondary, 1));
	}
	h2 {
		position: absolute;
		width: 100%;
		text-align: center;
		word-break: break-word;
	}
</style>
