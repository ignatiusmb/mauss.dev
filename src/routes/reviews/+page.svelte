<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import Link from '$lib/components/Link.svelte';
	import Verdict from './Verdict.svelte';

	import { capitalize } from 'mauss';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { building } from '$app/environment';
	import { page } from '$app/stores';
	import { sift, sieve } from '$lib/utils/search';

	export let data;

	const store = writable(data.list);
	let search = (!building && $page.url.searchParams.get('q')) || '';
	let query = (search && search.replace(/\+/g, ' ')) || '';
	let filters = { categories: [], genres: [], verdict: [], sort_by: 'updated' };

	$: filtered = sieve(filters, data.list);
	$: items = sift(query, filtered);
	// $: shareable = qpm({ q: query }).replace(/(%20)+/g, '+');
</script>

<LayoutPicker header>
	<svelte:fragment slot="header">
		<h1>Alchemauss Reviews</h1>
		<SearchBar unique={data.unique} bind:query bind:filters />
		<Pagination
			{store}
			{items}
			bound={12}
			increment={12}
			styles={{ '--text-color': 'var(--fg-surface)' }}
		/>
	</svelte:fragment>

	{#each $store as post (post.slug)}
		{@const disabled = !post.rating || post.verdict === 'pending'}

		<section
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			<Image src={post.image.en} alt={post.title.en} lazy overlay ratio={3 / 2}>
				<h3>{post.released.split('-')[0]}</h3>
				{#if post.title.short}
					<h3>{post.title.short}</h3>
				{:else if post.title.jp}
					<h3>{post.title.jp}</h3>
				{:else}
					<h3>{post.title.en}</h3>
				{/if}
			</Image>

			<aside>
				<small>
					<span>{capitalize(post.category)}</span>
					<span>⭐ {post.rating || '~'}</span>
				</small>
				<Verdict verdict={post.verdict} />
				<Link href="/reviews/{post.slug}/" style="primary" {disabled}>
					{disabled ? 'Work-in-Progress' : 'READ'}
				</Link>
			</aside>
		</section>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
</LayoutPicker>

<style>
	section {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		border-top-left-radius: var(--b-radius);
		border-top-right-radius: var(--b-radius);
		background: var(--bg-overlay);
	}
	section > :global(.syv-core-image) {
		cursor: pointer;
	}
	aside {
		display: grid;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: var(--b-radius);
		text-align: center;
	}
	aside small:first-child {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
