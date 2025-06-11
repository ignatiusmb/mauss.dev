<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';
	import Verdict from './[category]/[slug]/Verdict.svelte';

	import { dialog } from 'syv';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { by } from './search.svelte';

	const { data } = $props();

	// https://github.com/sveltejs/svelte/issues/12435
	const filters = $state(data.filters);
	const { category, genres, verdict, sort_by } = filters;
</script>

<header>
	<h1>the world through kaleidoscope</h1>
	<!-- prettier-ignore -->
	<small>reflections and critiques of the things i've spent time with. learn more about <a href="/help#reviews-how-i-review">my review style</a></small>
</header>

<SearchBar
	value={data.query.replace(/\+/g, ' ')}
	items={data.list}
	sieve={({ query, normalize, item: { slug, title, released } }) => {
		const value = normalize(query);
		return (
			slug.includes(value) ||
			released.includes(value) ||
			normalize(title.en).includes(value) ||
			(title.jp && normalize(title.jp).includes(value))
		);
	}}
	filter={() => {
		dialog.load(import('$lib/components/Dialog$SearchFilter.svelte'), {
			filters: filters,
		});
	}}
>
	{#snippet autocomplete({ index, update })}
		{#each index as { title, slug } (slug)}
			<button onpointerdown={() => update(slug)}>
				{title.en}
			</button>
		{/each}
	{/snippet}

	{#snippet children({ query, index })}
		{@const filtered = index.filter((item) => {
			const grouped = genres.filter((g) => g.selected).map((g) => g.name);
			const heuristics = [
				category.selected && item.category !== category.selected,
				grouped.length && !grouped.every((g) => item.genres.includes(g)),
				verdict.selected && item.verdict !== verdict.selected,
			];
			return heuristics.every((h) => !h);
		})}

		<div id="layout">
			{#each filtered.sort(by[sort_by.selected]) as post (post.slug)}
				{@const disabled = !post.rating || post.verdict === 'pending'}

				<section animate:flip={{ duration: TIME.SLIDE }} in:scale={{ duration: TIME.SLIDE }}>
					<Image src={post.image.en} alt={post.title.en} ratio={3 / 2} />

					<aside>
						<span>{post.title.short || post.title.jp || post.title.en}</span>
						<Verdict verdict={post.verdict} />
						<small>
							<span>⭐ {post.rating || '~'}</span>
							<span>{post.released.split('-')[0]}</span>
							<span>{post.category}</span>
						</small>
						<Link href="/reviews/{post.slug}/" style="primary" {disabled}>
							{disabled ? 'Work-in-Progress' : 'READ'}
						</Link>
					</aside>
				</section>
			{:else}
				<p style:grid-column="1 / -1" style:text-align="center">
					There are no matching {query ? 'titles' : 'filters'}
				</p>
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
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		transition: var(--transition-base);

		section {
			position: relative;
			display: grid;
			grid-template-rows: auto 1fr;
			border-radius: var(--rounding-box);
			background: var(--color-overlay);
			transition: var(--transition-base);

			&:hover {
				transform: translateY(-0.15rem);
			}

			aside {
				display: grid;
				gap: 0.5rem;
				padding: 0.5rem;
				border-radius: inherit;
				text-align: center;

				& > span:first-child {
					overflow: hidden;
					padding: 0.25rem 0.5rem;
					border-radius: var(--rounding-base);
					background: var(--color-base);
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				small {
					display: grid;
					gap: 0.25rem;
					grid-template-columns: repeat(3, 1fr);
					border-radius: var(--rounding-base);

					span {
						padding: 0.25rem;
						border-radius: var(--rounding-base);
						background: var(--color-base);
						text-transform: capitalize;
					}
				}
			}
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}
</style>
