<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import SearchFilter from '$lib/dialog/SearchFilter.svelte';

	import type { Query } from './search.svelte';
	import type { Commands } from './search.worker';
	import { date } from 'mauss';
	import { qsd, qse } from 'mauss/web';
	import { TIME } from 'syv/options';
	import { spawn } from 'syv/worker';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import worker from './search.worker?worker&url';

	const { data } = $props();
	const memory = $state({
		params: qsd(page.url.search),
		matches: data.results,
		filters: data.metadata,
	});
	const params = $derived.by(() => {
		const { tags, sort_by } = memory.filters;
		return {
			search: String(memory.params.q?.[0] || ''),
			tags: tags.flatMap((g) => (g.selected ? [g.name] : [])),
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
	<h1>ongoing thoughts and experiences</h1>
	<small>entries written as i go — mostly journal, sometimes technical.</small>
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
	{#if params.search || params.tags.length}
		{@const total = memory.matches.length}
		<p class="notice">
			<span>{total} matches for</span>
			{#if params.search}<span>"{params.search}"</span>{/if}
			{#if params.search && params.tags.length}<span>and</span>{/if}
			{#each params.tags as tag, idx}
				{#if idx > 0}<span>+</span>{/if}
				<a href="?tags={tag}">#{tag}</a>
			{/each}
		</p>
	{/if}

	{#each index as post (post.slug)}
		<a
			href="/posts/{post.slug}"
			animate:flip={{ duration: TIME.SLIDE }}
			transition:scale|local={{ duration: TIME.SLIDE }}
		>
			<Image ratio={9 / 16} src={post.thumbnail || ''} alt={post.title}>
				<div class="canvas" class:overlay={post.thumbnail}>
					<header>{post.title}</header>
					<small style:line-height="1.5">{post.description || ''}</small>

					<footer>
						<time datetime={post.date}>{date(post.date).format('DD MMMM YYYY')}</time>
						<span>{post.estimate} min read</span>
					</footer>
				</div>
			</Image>
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
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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

		> a {
			border-radius: var(--rounding-box);
			box-shadow:
				0 2px 1px -1px oklch(0 0 0 / 20%),
				0 1px 1px 0 oklch(0 0 0 / 14%),
				0 1px 3px 0 oklch(0 0 0 / 12%);
			background: var(--color-surface);
			transition: var(--transition-base);
			text-decoration: none;

			&:focus,
			&:hover {
				background: var(--color-overlay);
				transform: translateY(-0.15rem);
			}

			.canvas {
				overflow: hidden;
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;

				display: grid;
				gap: 2%;
				grid-template-rows: auto 1fr auto;

				padding: 3% 4%;
				border-radius: inherit;

				text-wrap: balance;
				text-align: center;

				&.overlay {
					background: oklch(0 0 0 / 80%);
				}

				header {
					font-size: var(--size-h4);
					font-weight: 500;
				}
			}

			footer {
				display: grid;
				gap: 0.5rem;
				grid-template-columns: auto auto;
				justify-content: center;
				align-items: center;
				border-radius: var(--rounding-box);
				font-size: var(--size-small);

				span::before {
					content: '•';
					color: var(--color-accent-primary);
					margin-right: 0.5rem;
				}
			}
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}
</style>
