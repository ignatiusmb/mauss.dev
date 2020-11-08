<script context="module">
	export async function preload({ query }) {
		const data = await this.fetch('reviews.json').then((r) => r.json());
		const genres = Array.from(new Set(data.flatMap((p) => p.genres))).sort();
		const categories = Array.from(new Set(data.map((p) => p.category)));
		const verdict = Array.from(new Set(data.map((d) => d.verdict)));
		return {
			data,
			unique: { categories, genres },
			verdict: verdict.sort((x, y) => x - y).reverse(),
			query: query.query,
		};
	}
</script>

<script>
	export let data, unique, verdict, query;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const duration = 100;

	import { Feather, SearchBar, Pagination } from '@ignatiusmb/elements';
	import MetaHead from '../../pages/MetaHead.svelte';
	import LayoutPicker from '../../pages/LayoutPicker.svelte';
	import ReviewCard from '../../components/ReviewCard.svelte';
	import PerspectiveCarousel from '../../components/PerspectiveCarousel.svelte';

	import { sieve, filter } from '../../utils/search';
	import { rSlice as store } from '../../stores';
	let filters = { categories: [], genres: [], verdict: [], sort: 'updated' },
		sieved,
		view = 'grid';
	$: bound = view === 'grid' ? 12 : 3;
	$: increment = view === 'carousel' ? 1 : bound;

	$: count = $store * increment;
	$: filtered = filter(filters, data);
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
</script>

<MetaHead
	canonical="reviews"
	title="Reviews"
	description="Personalized reviews for all kinds of anime, books, movies, shows, etc.">
	<link rel="alternate" href="rss.xml" type="application/rss+xml" />
</MetaHead>

<LayoutPicker header {view}>
	<header slot="header">
		<h1>DevMauss Reviews</h1>

		<SearchBar bind:query bind:filters {unique}>
			<section>
				<h3>Verdict</h3>
				{#each verdict as rec}
					<label>
						<input type="checkbox" bind:group={filters.verdict} value={rec} />
						{#if rec === 2}
							<span>Must-watch!</span>
						{:else if rec === 1}
							<span>Recommended</span>
						{:else if rec === 0}
							<span>Contextual</span>
						{:else if rec === -1}
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

		{#if view !== 'scrollsnap'}
			<Pagination {store} {total} {bound} {increment} />
		{/if}
	</header>

	<aside slot="picker">
		<button class:active={view === 'grid'} on:click={() => (view = 'grid')}>
			<Feather.Grid />
		</button>
		<button class:active={view === 'carousel'} on:click={() => (view = 'carousel')}>
			<Feather.Layers />
		</button>
		<button class:active={view === 'scrollsnap'} on:click={() => (view = 'scrollsnap')}>
			<Feather.Columns />
		</button>
	</aside>

	{#if view === 'grid'}
		{#each sieved.slice(count, count + bound) as post (post.slug)}
			<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
				<ReviewCard {post} />
			</div>
		{:else}
			<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
		{/each}
	{:else if view === 'carousel'}
		<PerspectiveCarousel>
			{#each sieved.slice(count, count + bound) as post, idx (post.slug)}
				<div class:translate-left={idx === 0} class:translate-right={idx === 2}>
					<ReviewCard {post} />
				</div>
			{/each}
		</PerspectiveCarousel>
	{:else if view === 'scrollsnap'}
		<div class="empty" />
		{#each sieved as post (post.slug)}
			<div animate:flip={{ duration }}>
				<ReviewCard {post} />
			</div>
		{/each}
		<div class="empty" />
	{/if}
</LayoutPicker>

<style>
	h1 {
		text-align: center;
	}
	div:not(.empty) {
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	h2 {
		position: absolute;
		width: 100%;
		text-align: center;
		word-break: break-word;
	}
</style>
