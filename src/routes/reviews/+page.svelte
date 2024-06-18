<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';
	import Verdict from './Verdict.svelte';

	import { syv } from 'syv';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { by } from './search.svelte';

	const { data } = $props();

	const { category, genres, verdict, sort_by } = data.filters;
</script>

<header>
	<h1>Alchemauss Reviews</h1>
</header>

<SearchBar
	value={data.query.replace(/\+/g, ' ')}
	items={data.list}
	sieve={({ query, normalize, item: { slug, title, released } }) => {
		const value = normalize(query);
		if (slug.includes(value)) return true;
		if (released.includes(value)) return true;
		if (normalize(title.en).includes(value)) return true;
		if (title.jp && normalize(title.jp).includes(value)) return true;
		return false;
	}}
	filter={() => {
		syv.load(import('$lib/components/Dialog$SearchFilter.svelte'), {
			filters: data.filters,
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
				<h2>There are no matching {query ? 'titles' : 'filters'}</h2>
			{/each}
		</div>
	{/snippet}
</SearchBar>

<style>
	header {
		h1 {
			text-align: center;
		}
	}

	#layout {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		transition: var(--t-duration);

		section {
			position: relative;
			display: grid;
			grid-template-rows: auto 1fr;
			border-top-left-radius: var(--b-radius);
			border-top-right-radius: var(--b-radius);
			background: var(--bg-overlay);
			transition: var(--t-duration);

			&:hover {
				transform: translateY(-0.15rem);
			}

			aside {
				display: grid;
				gap: 0.5rem;
				padding: 0.5rem;
				border-radius: var(--b-radius);
				text-align: center;

				& > span:first-child {
					overflow: hidden;
					padding: 0.25rem 0.5rem;
					border-radius: inherit;
					background: var(--bg-base);
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				small {
					display: grid;
					gap: 0.25rem;
					grid-template-columns: repeat(3, 1fr);
					border-radius: inherit;

					span {
						padding: 0.25rem;
						border-radius: inherit;
						background: var(--bg-base);
						text-transform: capitalize;
					}
				}
			}
		}

		h2 {
			grid-column: 1 / -1;
			text-align: center;
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}

	section {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		border-top-left-radius: var(--b-radius);
		border-top-right-radius: var(--b-radius);
		background: var(--bg-overlay);
	}

	aside {
		display: grid;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: var(--b-radius);
		text-align: center;

		small:first-child {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
