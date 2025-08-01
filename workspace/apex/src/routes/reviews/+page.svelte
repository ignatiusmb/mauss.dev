<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import SearchBar from 'syv/core/SearchBar.svelte';
	import SearchFilter from '$lib/dialog/SearchFilter.svelte';

	import type { Query } from './search.svelte';
	import type { Commands } from './search.worker';
	import { date } from 'mauss';
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
		const { tier, category, genres, sort_by } = memory.filters;
		return {
			search: String(memory.params.q?.[0] || ''),
			tier: String(tier.selected),
			category: String(category.selected),
			genres: genres.flatMap((g) => (g.selected ? [g.name] : [])),
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
	<h1>kaleidoscope eyes</h1>
	<!-- prettier-ignore -->
	<small>glimpse through the shifting lens — here's <a href="/help#reviews-how-i-review">how i review</a>.</small>
</header>

<SearchBar
	styles={{ '--background-color': 'var(--color-surface)' }}
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
				{#if params.tier || params.category || params.genres.length}
					<span>and</span>
				{/if}
			{/if}
			{#if params.tier || params.category || params.genres.length}
				<span>with some filters</span>
			{/if}
			{#if params.sort_by}
				<span>sorted by {params.sort_by}</span>
			{/if}
		</p>
	{/if}

	{#each index as post (post.slug)}
		{@const tmdb = post.poster.source === 'tmdb' && 'https://image.tmdb.org/t/p/w300/'}

		<a
			href="/reviews/{post.slug}"
			data-tier={post.tier}
			aria-label={post.title}
			aria-disabled={post.draft ? 'true' : null}
			animate:flip={{ duration: TIME.SLIDE }}
			in:scale={{ duration: TIME.SLIDE }}
		>
			<header>
				<span>{post.category}</span>
			</header>
			<Image
				src="{tmdb || ''}{post.poster.path}"
				alt={post.title}
				ratio={3 / 2}
				styles={{ '--border-radius': 0 }}
			>
				<div class="canvas">
					{#if post.category === 'anime'}
						{@const [year, month] = post.released.split('-').map(Number)}
						{@const season = ['winter', 'spring', 'summer', 'fall'][Math.floor((month - 1) / 3)]}
						<span>{season} {year}</span>
					{:else}
						<span>{date(post.released).format('MMMM YYYY')}</span>
					{/if}
				</div>
			</Image>

			<footer>
				<span>{post.rating || 'TBD'}</span>
			</footer>
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
		grid-template-columns: 1fr 1fr;
		transition: var(--transition-base);
		font-family: var(--font-sans);

		@media (min-width: 549px) {
			grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		}

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

		a {
			position: relative;
			display: grid;
			grid-template-rows: auto 1fr;
			border-radius: var(--rounding-box);
			background: var(--color-overlay);
			transition: var(--transition-base);
			text-decoration: none;
			text-align: center;
			font-size: var(--size-small);

			&:focus,
			&:hover {
				transform: translateY(-0.15rem);
			}

			header {
				display: grid;
				align-items: center;
				padding: 0.1rem 0;
				border-top-right-radius: inherit;
				border-top-left-radius: inherit;
				text-transform: capitalize;
			}

			.canvas {
				position: absolute;
				top: -1px;
				width: 100%;
				height: calc(100% + 2px);
				padding: 0.25rem;

				background: linear-gradient(to bottom, var(--color-base), transparent 20%);

				text-shadow:
					-1px -1px 0 var(--color-base),
					1px -1px 0 var(--color-base),
					-1px 1px 0 var(--color-base),
					1px 1px 0 var(--color-base),
					0 0 2px var(--color-base);

				text-transform: capitalize;
				text-wrap: balance;
				text-align: center;
			}

			footer {
				display: grid;
				gap: 0.3rem;
				align-items: center;
				justify-content: center;
				grid-template-columns: 6ch;
				padding: 0.2rem;
				border-bottom-right-radius: inherit;
				border-bottom-left-radius: inherit;
				text-transform: capitalize;

				> span {
					padding: 0.3rem;
					border-radius: var(--rounding-base);
				}
			}
		}

		& :global(img[src='']),
		& :global(img:not([src])) {
			display: none;
		}
	}

	a[data-tier] {
		position: relative;
		border: 0.15rem solid transparent;

		&[data-tier='S'] {
			overflow: hidden;
			border-color: oklch(85% 0.3 80);
			box-shadow:
				inset 0 1px 1px oklch(1 0 0 / 0.6),
				inset 0 -1px 1px oklch(0 0 0 / 0.2),
				0 0 4px oklch(85% 0.3 80 / 0.8),
				0 0 8px oklch(85% 0.3 80 / 0.6),
				0 0 16px oklch(85% 0.3 80 / 0.4),
				0 0 24px oklch(85% 0.3 80 / 0.3);

			animation: pulse 4s infinite ease-in-out;

			&::after {
				content: '';
				pointer-events: none;
				position: absolute;
				top: 0;
				left: -50%;
				width: 200%;
				height: 100%;
				background: linear-gradient(
					120deg,
					transparent 0%,
					oklch(1 0 0 / 40%) 35%,
					oklch(1 0 0 / 50%) 50%,
					oklch(1 0 0 / 40%) 65%,
					transparent 100%
				);
				opacity: 0.8;
				filter: blur(1.2px);
				mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 20%,
					black 80%,
					transparent 100%
				);

				transform: translateX(-100%);
				animation: shimmer 4s infinite linear;
				animation-delay: 300ms;
			}
		}

		&[data-tier='A'] {
			border-color: oklch(70% 0.23 340);
			box-shadow:
				0 0 6px oklch(72% 0.2 340 / 0.7),
				0 0 14px oklch(72% 0.2 340 / 0.5);
		}

		&[data-tier='B'] {
			border-color: oklch(66% 0.17 255);
			box-shadow:
				0 0 4px oklch(66% 0.17 255 / 0.3),
				0 0 8px oklch(66% 0.17 255 / 0.2);
		}

		&[data-tier='C'] {
			border-color: oklch(67% 0.16 58);
			box-shadow:
				0 0 4px oklch(67% 0.16 58 / 0.3),
				0 0 8px oklch(67% 0.16 58 / 0.15);
		}

		&[data-tier='D'] {
			border-color: oklch(56% 0.06 90);
			box-shadow:
				0 0 2px oklch(56% 0.06 90 / 0.1),
				0 0 3px oklch(56% 0.06 90 / 0.05);
		}

		&[data-tier='?'] {
			border-color: var(--color-base);
		}

		&:focus-visible {
			outline: 2px solid whitesmoke;
		}

		&[aria-disabled] {
			pointer-events: none;
			opacity: 0.84;
			animation: none;
			&::after {
				animation: none;
			}
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) skewX(30deg);
		}
		70%,
		100% {
			transform: translateX(200%) skewX(30deg);
		}
	}
	@keyframes pulse {
		0%,
		70%,
		100% {
			box-shadow:
				inset 0 1px 1px oklch(1 0 0 / 0.6),
				inset 0 -1px 1px oklch(0 0 0 / 0.2),
				0 0 4px oklch(85% 0.3 80 / 0.8),
				0 0 8px oklch(85% 0.3 80 / 0.6),
				0 0 16px oklch(85% 0.3 80 / 0.4),
				0 0 24px oklch(85% 0.3 80 / 0.3);
		}
		35% {
			box-shadow:
				inset 0 1px 1px oklch(1 0 0 / 0.6),
				inset 0 -1px 1px oklch(0 0 0 / 0.2),
				0 0 6px oklch(85% 0.3 80 / 1),
				0 0 12px oklch(85% 0.3 80 / 0.8),
				0 0 20px oklch(85% 0.3 80 / 0.6),
				0 0 30px oklch(85% 0.3 80 / 0.4);
		}
	}
</style>
