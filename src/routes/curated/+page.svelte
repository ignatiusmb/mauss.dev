<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import LayoutPicker from '$lib/pages/LayoutPicker.svelte';
	import Link from '$lib/components/Link.svelte';

	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { sift } from '$lib/utils/search';

	export let data;

	let query = '';
</script>

<LayoutPicker header itemSize="18rem">
	<svelte:fragment slot="header">
		<h1>Alchemauss Curation</h1>
		<SearchBar bind:query />
	</svelte:fragment>

	{#each sift(query, data.list) as { title, slug } (slug)}
		<section
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			<small>{title}</small>
			<Link href="/curated/{slug}/" style="primary">READ</Link>
		</section>
	{:else}
		<h2>There are no matching titles</h2>
	{/each}
</LayoutPicker>

<style>
	section {
		width: 100%;
		display: grid;
		gap: 0.5rem;
		align-items: center;
		grid-template-columns: 1fr auto;
		padding: 0.5rem;
		border-radius: var(--b-radius);
		box-shadow:
			0 2px 1px -1px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	small {
		padding-left: 0.375rem;
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
