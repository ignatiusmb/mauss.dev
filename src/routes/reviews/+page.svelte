<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';
	import Verdict from './Verdict.svelte';

	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	const { data } = $props();
</script>

<header>
	<h1>Alchemauss Reviews</h1>
</header>

<SearchBar
	value={data.query.replace(/\+/g, ' ')}
	items={data.list}
	transformer={(i) => ({
		slug: i.slug,
		title: `${i.title.en} ${i.title.jp ? '(' + i.title.jp + ')' : ''}`,
		released: i.released,
	})}
>
	{#snippet children({ query, index })}
		<div id="layout">
			{#each index as post (post.slug)}
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
							<span>{post.category}</span>
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

			& > :global(.syv-core-image) {
				cursor: pointer;
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

					span:first-child {
						text-transform: capitalize;
					}
				}

				& > :global(a) {
					text-decoration: none;
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

		& > :global(.syv-core-image) {
			cursor: pointer;
		}
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
