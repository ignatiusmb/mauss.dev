<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';

	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	const { data } = $props();
</script>

<header>
	<h1>things worth keeping</h1>
	<small>selected pieces of the internet — timeless, meaningful, and worth revisiting.</small>
</header>

<SearchBar
	value=""
	items={data.list}
	sieve={({ query, normalize, item }) => {
		const value = normalize(query);
		if (item.slug.includes(value)) return true;
		if (normalize(item.title).includes(value)) return true;
		return false;
	}}
>
	{#snippet children({ index })}
		<div id="layout">
			{#each index as { title, slug } (slug)}
				<section
					animate:flip={{ duration: TIME.SLIDE }}
					transition:scale|local={{ duration: TIME.SLIDE }}
				>
					<small>{title}</small>
					<Link href="/curated/{slug}/" style="primary">READ</Link>
				</section>
			{:else}
				<p style:grid-column="1 / -1" style:text-align="center">There are no matching titles</p>
			{/each}
		</div>
	{/snippet}
</SearchBar>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
	}

	#layout {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		transition: var(--t-duration);

		section {
			width: 100%;
			display: grid;
			gap: 0.5rem;
			align-items: center;
			grid-template-columns: 1fr auto;
			padding: 0.5rem;
			border-radius: var(--rounding-box);
			box-shadow:
				0 2px 1px -1px rgba(0, 0, 0, 0.2),
				0 1px 1px 0 rgba(0, 0, 0, 0.14),
				0 1px 3px 0 rgba(0, 0, 0, 0.12);
			background-color: var(--bg-overlay);
			transition: var(--t-duration);

			&:hover {
				transform: translateY(-0.15rem);
			}

			small {
				padding-left: 0.375rem;
			}

			& > :global(a) {
				text-decoration: none;
			}
		}
	}
</style>
