<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';

	import { format } from 'mauss/date';
	import { dialog } from 'syv';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { by } from './search.svelte.js';

	const { data } = $props();

	// https://github.com/sveltejs/svelte/issues/12435
	const filters = $state(data.filters);
	const { category, tags, sort_by } = filters;
</script>

<header>
	<h1>ongoing thoughts and documentation</h1>
	<small>entries written as i go — part journal, part technical, fully honest.</small>
</header>

<SearchBar
	value=""
	items={data.list}
	sieve={({ query, normalize, item: { slug, title, description } }) => {
		const value = normalize(query);
		return (
			slug.includes(value) ||
			normalize(title).includes(value) ||
			(description && normalize(description).includes(value))
		);
	}}
	filter={() => {
		dialog.load(import('$lib/components/Dialog$SearchFilter.svelte'), {
			filters: filters,
		});
	}}
>
	{#snippet children({ query, index })}
		{@const filtered = index.filter((item) => {
			const grouped = tags.filter((g) => g.selected).map((g) => g.name);
			const heuristics = [
				category.selected && item.category !== category.selected,
				grouped.length && !grouped.every((g) => item.tags.includes(g)),
			];
			return heuristics.every((h) => !h);
		})}

		<div id="layout">
			{#each filtered.sort(by[sort_by.selected]) as post (post.slug)}
				<section
					animate:flip={{ duration: TIME.SLIDE }}
					transition:scale|local={{ duration: TIME.SLIDE }}
				>
					<Image src={post.thumbnail || ''} alt={post.title}>
						<span>{post.title}</span>
					</Image>

					<div class="content">
						<h3>{post.title}</h3>
						{#if post.description}
							<small>{post.description}</small>
						{/if}
					</div>

					<aside>
						<time datetime={post.date}>{format(post.date)('DD MMMM YYYY')}</time>
						<small>{post.estimate} min read</small>
						<Link href="/posts/{post.slug}/" style="primary">READ</Link>
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
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		transition: var(--transition-base);

		section {
			display: grid;
			grid-template-rows: auto 1fr 3rem;
			border-radius: var(--rounding-box);
			box-shadow:
				0 2px 1px -1px oklch(0 0 0 / 20%),
				0 1px 1px 0 oklch(0 0 0 / 14%),
				0 1px 3px 0 oklch(0 0 0 / 12%);
			background-color: var(--color-overlay);
			transition: var(--transition-base);

			&:hover {
				transform: translateY(-0.15rem);
			}

			& > :global(.syv-core-image) {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
				background-color: oklch(0 0 0 / 15%);
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
				border-radius: var(--rounding-box);

				time {
					font-size: 0.8rem;
				}

				small::before {
					content: '•';
					color: var(--color-accent-primary);
					margin-right: 0.5rem;
				}

				& :global(:last-child) {
					justify-self: end;
				}
			}
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}
</style>
