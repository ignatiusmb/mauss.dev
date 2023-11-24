<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Pagination from 'syv/core/Pagination.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import Link from '$lib/components/Link.svelte';

	import { dt } from 'mauss';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { sift, sieve } from '$lib/utils/search';

	export let data;

	const store = writable(data.list);
	let filters = { categories: [], tags: [], sort_by: 'date' };
	let query = '';

	$: filtered = sieve(filters, data.list);
	$: items = sift(query, filtered);
</script>

<LayoutPicker header itemSize="21rem">
	<svelte:fragment slot="header">
		<h1>Alchemauss Posts</h1>
		<SearchBar unique={data.unique} bind:query bind:filters />
		<Pagination {store} {items} bound={6} styles={{ '--text-color': 'var(--fg-surface)' }} />
	</svelte:fragment>

	{#each $store as post (post.slug)}
		<section
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			<Image src={post.thumbnail || ''} alt={post.title} overlay>
				<span>{post.title}</span>
			</Image>

			<div class="content">
				<h3>{post.title}</h3>
				{#if post.description}
					<small>{post.description}</small>
				{/if}
			</div>

			<aside>
				<time datetime={post.date}>{dt.format(post.date)('DD MMMM YYYY')}</time>
				<small>{post.estimate} min read</small>
				<Link href="/posts/{post.slug}/" style="primary">READ</Link>
			</aside>
		</section>
	{:else}
		<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
	{/each}
</LayoutPicker>

<style>
	section {
		display: grid;
		grid-template-rows: auto 1fr 3rem;
		border-radius: var(--b-radius);
		box-shadow:
			0 2px 1px -1px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	section > :global(.syv-core-image) {
		cursor: pointer;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		background-color: rgba(0, 0, 0, 0.15);
	}
	.content {
		display: grid;
		gap: 1rem;
		align-content: flex-start;
		padding: 1rem;
		line-height: 1.5;
	}
	aside {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: auto auto 1fr;
		align-items: center;
		padding: 0.5rem;
		padding-left: 1rem;
		border-radius: var(--b-radius);
	}
	aside time {
		font-size: 0.8rem;
	}
	aside small::before {
		content: '•';
		color: var(--theme-secondary);
		margin-right: 0.5rem;
	}
	aside :global(:last-child) {
		justify-self: end;
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
