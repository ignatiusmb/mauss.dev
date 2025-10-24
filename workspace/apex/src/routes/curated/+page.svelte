<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';
	import SearchFilter from '$lib/dialog/SearchFilter.svelte';

	import type { Query } from './search.svelte';
	import type { Commands } from './search.agent';
	import { qsd, qse } from 'mauss/web';
	import { TIME } from 'syv/options';
	import { spawn } from 'syv/worker';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { entitle } from '$lib/prose';
	import worker from './search.agent?worker&url';

	const { data } = $props();
	const memory = $state({
		params: qsd(page.url.search),
		matches: data.results,
		filters: data.filters,
	});
	const params = $derived.by(() => {
		const { series } = memory.filters;
		return {
			search: String(memory.params.q?.[0] || ''),
			series: String(series.selected),
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
			index = memory.matches;
			const { search: q, ...filters } = params;
			const url = qse({ q, ...filters }) || page.url.pathname;
			replaceState(url, { dialog: false });
		}}
		onchange={async (item) => {
			const { key, value, required } = item;
			if (!memory.params[key]) memory.params[key] = [];
			if (required) memory.params[key] = [value];
			else {
				if (!memory.params[key].includes(value)) memory.params[key].push(value);
				else memory.params[key] = memory.params[key].filter((v) => v !== value);
			}
			const { search: q, ...filters } = params;
			replaceState(qse({ q, ...filters }) || page.url.pathname, { dialog: true });
			memory.matches = await invoke('search', { ...params, search: q });
		}}
	/>
{/if}

<header>
	<h1>timeless pieces</h1>
	<small>impermanence made permanent.</small>
</header>

<SearchBar
	styles={{ '--background-color': 'var(--color-surface)' }}
	value={data.query.replace(/\+/g, ' ')}
	filter={() => pushState('', { dialog: true })}
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
	{#if params.search || params.series.length}
		{@const total = memory.matches.length}
		<p class="notice">
			<span>{total} matches for</span>
			{#if params.search}<span>"{params.search}"</span>{/if}
			{#if params.search && params.series}<span>and</span>{/if}
			<a href="?series={params.series}">{params.series}</a>
		</p>
	{/if}

	{#each index as { series, title, slug } (slug)}
		<a
			href="/curated/{slug}"
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			{entitle({ series, title })}
		</a>
	{/each}
</div>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	#layout {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		transition: var(--transition-base);

		.notice {
			grid-column: 1 / -1;
			display: flex;
			gap: 0.25rem;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-family: var(--font-sans);
		}

		> a {
			min-height: 3rem;
			width: 100%;
			display: grid;
			gap: 0.5rem;
			align-items: center;
			padding: 0.5rem 1rem;
			border-radius: var(--rounding-box);
			box-shadow:
				0 2px 1px -1px oklch(0 0 0 / 20%),
				0 1px 1px 0 oklch(0 0 0 / 14%),
				0 1px 3px 0 oklch(0 0 0 / 12%);
			background-color: var(--color-surface);
			transition: var(--transition-base);
			text-decoration: none;

			&:focus,
			&:hover {
				background-color: var(--color-overlay);
				transform: translateY(-0.15rem);
			}
		}
	}
</style>
