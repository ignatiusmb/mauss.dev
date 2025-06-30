<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import Link from '$lib/components/Link.svelte';
	import SearchFilter from '$lib/dialog/SearchFilter.svelte';
	import Verdict from './[category]/[slug]/Verdict.svelte';

	import type { Query } from './search.svelte';
	import type { Commands } from './search.worker';
	import { qsd, qse } from 'mauss/web';
	import { spawn } from 'syv/worker';
	import { TIME } from 'syv/options';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import worker from './search.worker?worker&url';

	const { data } = $props();
	const memory = $state({
		params: qsd(page.url.search),
		matches: data.results,
		filters: data.filters,
	});
	const params = $derived.by(() => {
		const { category, genres, verdict, sort_by } = memory.filters;
		return {
			search: String(memory.params.q?.[0] || ''),
			category: String(category.selected),
			genres: genres.flatMap((g) => (g.selected ? [g.name] : [])),
			verdict: String(verdict.selected),
			sort_by: sort_by.selected as Query['sort_by'],
		} satisfies Query;
	});

	let index = $state(data.results);
	const invoke = spawn<Commands>(worker, (invoke) => invoke('init', data.index));
</script>

{#if page.state.dialog}
	<SearchFilter
		matches={memory.matches.length}
		filters={memory.filters}
		onclose={() => {
			// history.back();
			index = memory.matches;
			const { search: q, ...filters } = params;
			const url = qse({ q, ...filters }) || page.url.pathname;
			replaceState(url, { dialog: false });
		}}
		onchange={async (item) => {
			const { key, value, required } = item;
			memory.params[key] = memory.params[key] || [];
			if (required) memory.params[key] = [value];
			else {
				if (!memory.params[key].includes(value)) memory.params[key].push(value);
				else memory.params[key] = memory.params[key].filter((v) => v !== value);
			}
			const { search: q, ...filters } = params;
			const url = qse({ q, ...filters }) || page.url.pathname;
			replaceState(url, { dialog: true });
			memory.matches = await invoke('search', $state.snapshot(params));
		}}
	/>
{/if}

<header>
	<h1>the world through kaleidoscope</h1>
	<!-- prettier-ignore -->
	<small>reflections and critiques of the things i've spent time with. learn more about <a href="/help#reviews-how-i-review">my review style</a></small>
</header>

<SearchBar
	value={data.query.replace(/\+/g, ' ')}
	filter={() => replaceState('', { dialog: true })}
	oninput={async (value) => {
		memory.params.q = [value.trim()];
		const { search: q, ...filters } = params;
		const url = qse({ q, ...filters });
		replaceState(url || page.url.pathname, {});
		const query = { ...params, search: q };
		memory.matches = await invoke('search', query);
		index = memory.matches;
	}}
/>

<div id="layout">
	{#if Object.values(memory.params).some(Boolean)}
		{@const total = memory.matches.length}
		<p class="notice">
			<span>{total} matches </span>
			{#if params.search}
				<span>for "{params.search}"</span>
				{#if params.category || params.genres.length || params.verdict}
					<span>and</span>
				{/if}
			{/if}
			{#if params.category || params.genres.length || params.verdict}
				<span>with some filters</span>
			{/if}
			{#if params.sort_by}
				<span>sorted by {params.sort_by}</span>
			{/if}
		</p>
	{/if}

	{#each index as post (post.slug)}
		{@const disabled = !post.rating || post.verdict === 'pending'}

		<section animate:flip={{ duration: TIME.SLIDE }} in:scale={{ duration: TIME.SLIDE }}>
			<Image src={post.image.en} alt={post.title} ratio={3 / 2} />

			<aside>
				<span>{post.title}</span>
				<Verdict verdict={post.verdict} />
				<small>
					<span>{post.rating || 'TBD'}</span>
					<span>{post.released.split('-')[0]}</span>
					<span>{post.category}</span>
				</small>
				<Link href="/reviews/{post.slug}" style="primary" {disabled}>
					{disabled ? 'Work-in-Progress' : 'READ'}
				</Link>
			</aside>
		</section>
	{/each}
</div>

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

		.notice {
			grid-column: 1 / -1;
			display: flex;
			gap: 0.25rem;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

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
