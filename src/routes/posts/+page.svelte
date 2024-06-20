<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';

	import { dt } from 'mauss';
	import { syv } from 'syv';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { by } from './search.svelte.js';

	const { data } = $props();

	const { category, tags, sort_by } = data.filters;
</script>

<header>
	<h1>Alchemauss Posts</h1>
</header>

<SearchBar
	value=""
	items={data.list}
	sieve={({ query, normalize, item: { slug, title, description } }) => {
		const value = normalize(query);
		if (slug.includes(value)) return true;
		if (normalize(title).includes(value)) return true;
		if (description && normalize(description).includes(value)) return true;
		return false;
	}}
	filter={() => {
		syv.load(import('$lib/components/Dialog$SearchFilter.svelte'), {
			filters: data.filters,
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
						<time datetime={post.date}>{dt.format(post.date)('DD MMMM YYYY')}</time>
						<small>{post.estimate} min read</small>
						<Link href="/posts/{post.slug}/" style="primary">READ</Link>
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
		grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
		transition: var(--t-duration);

		section {
			display: grid;
			grid-template-rows: auto 1fr 3rem;
			border-radius: var(--b-radius);
			box-shadow:
				0 2px 1px -1px rgba(0, 0, 0, 0.2),
				0 1px 1px 0 rgba(0, 0, 0, 0.14),
				0 1px 3px 0 rgba(0, 0, 0, 0.12);
			background-color: var(--bg-overlay);
			transition: var(--t-duration);

			&:hover {
				transform: translateY(-0.15rem);
			}

			& > :global(.syv-core-image) {
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
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}

	section {
		display: grid;
		grid-template-rows: auto 1fr 3rem;
		border-radius: var(--b-radius);
		box-shadow:
			0 2px 1px -1px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
		transition: var(--t-duration);

		&:hover {
			transform: translateY(-0.15rem);
		}

		& > :global(.syv-core-image) {
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
	}

	aside {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: auto auto 1fr;
		align-items: center;
		padding: 0.5rem;
		padding-left: 1rem;
		border-radius: var(--b-radius);

		time {
			font-size: 0.8rem;
		}

		small::before {
			content: '•';
			color: var(--theme-secondary);
			margin-right: 0.5rem;
		}

		& :global(:last-child) {
			justify-self: end;
		}
	}

	h2 {
		grid-column: 1 / -1;
		text-align: center;
	}
</style>
