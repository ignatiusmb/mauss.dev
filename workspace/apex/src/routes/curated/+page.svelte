<script lang="ts">
	import SearchBar from 'syv/core/SearchBar.svelte';

	import type { Commands } from './search.worker';
	import { qse } from 'mauss/web';
	import { TIME } from 'syv/options';
	import { spawn } from 'syv/worker';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import worker from './search.worker?worker&url';

	const { data } = $props();

	let index = $state(data.list);
	const invoke = spawn<Commands>(worker, (invoke) => invoke('init', data.list));
</script>

<header>
	<h1>timeless pieces</h1>
	<small>things that can stand the test of time.</small>
</header>

<SearchBar
	styles={{ '--background-color': 'var(--color-surface)' }}
	value={data.query.replace(/\+/g, ' ')}
	oninput={async (value) => {
		const q = value.trim();
		replaceState(qse({ q }) || page.url.pathname, {});
		index = await invoke('search', { search: q });
	}}
/>

<div id="layout">
	{#each index as { title, slug } (slug)}
		<a
			href="/curated/{slug}"
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			{title}
		</a>
	{:else}
		<p style:grid-column="1 / -1" style:text-align="center">There are no matching titles</p>
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
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		transition: var(--transition-base);

		a {
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
			font-size: 0.95rem;

			&:focus,
			&:hover {
				background-color: var(--color-overlay);
				transform: translateY(-0.15rem);
			}
		}
	}
</style>
