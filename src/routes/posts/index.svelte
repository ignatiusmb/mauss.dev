<script context="module">
	export async function preload() {
		const data = await this.fetch('posts.json').then((r) => r.json());
		const tags = data.flatMap((p) => p.tags);
		const unique = {
			categories: data.reduce((a, c) => (a.includes(c.tags[0]) ? a : [...a, c.tags[0]]), []).sort(),
			tags: tags.reduce((a, c) => (a.includes(c) ? a : c ? [...a, c] : a), []).sort(),
		};
		return { data, unique };
	}
</script>

<script>
	export let data, unique;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const bound = 6;
	const duration = 100;

	import SearchBar from '@ignatiusmb/elements/svelte/SearchBar.svelte';
	import Pagination from '@ignatiusmb/elements/svelte/Pagination.svelte';
	import MetaHead from '../../pages/MetaHead.svelte';
	import PageHeader from '../../pages/PageHeader.svelte';
	import Centered from '../../pages/Centered.svelte';
	import PostCard from '../../components/PostCard.svelte';

	import { mobile, pSlice as store } from '../../stores';
	import { sieve, filter } from '../../utils/search';
	let query, filtered, sieved;
	let filters = { categories: [], tags: [], sort: 'published' };

	$: filtered = filter(filters, data);
	$: sieved = query ? sieve(query, filtered) : filtered;
	$: total = sieved.length;
	$: $store = $store * bound > total ? 0 : $store;
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here." />

<PageHeader>
	<h1>Posts by Mauss</h1>

	<SearchBar bind:query bind:filters {unique}>
		<section>
			<h3>Sort by</h3>
			<label>
				<input type="radio" bind:group={filters.sort} value="published" />
				<span>Date published</span>
			</label>
			<label>
				<input type="radio" bind:group={filters.sort} value="updated" />
				<span>Last updated</span>
			</label>
		</section>
	</SearchBar>

	<Pagination {store} {total} {bound} />
</PageHeader>

<main>
	{#each sieved.slice($store * bound, $store * bound + bound) as post (post.slug)}
		<section animate:flip={{ duration }} transition:scale|local={{ duration }}>
			<PostCard {post}>
				<div>
					<h3>{post.title}</h3>
					{#if post.description}
						<small>{post.description}</small>
					{/if}
				</div>
			</PostCard>
		</section>
	{/each}
</main>

{#if $mobile}
	<Centered>
		<Pagination {store} {total} {bound} />
	</Centered>
{/if}

<style>
	main {
		width: 100%;
		max-width: 82em;
		padding: 0 1em;
	}
	main section {
		display: grid;
		grid-template-rows: 1fr 3em;
		width: 100%;
		border-radius: 0.25em;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-color-secondary);
	}

	main {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, minmax(auto, 26em));
		justify-content: center;
		margin: 0 auto;
	}
	main :global(img:not([src])) {
		display: none;
	}
	main div {
		padding: 1em;
	}
	main h3 {
		margin-bottom: 1em;
	}
</style>
