<script lang="ts">
	import type { IntersectUnion, Overwrite } from 'mauss/typings';
	import type { Items, SeriesTable } from '$content/builder';
	import { page } from '$app/state';
	type Base = Items['/curated' | '/posts' | '/reviews'][number];
	type Article = Overwrite<IntersectUnion<Base>, { branches?: string[] }>;

	interface Props {
		slug: string;
		series: Article['series'];
		collection: SeriesTable;
	}
	const { slug, series, collection }: Props = $props();

	const root = $derived(page.url.pathname.split('/')[1]);
	const items = $derived(collection[series.title]);
	const index = $derived(items.findIndex((item) => item.slug === slug));
	const window = $derived.by(() => {
		const half = Math.floor(9 / 2); // show at most 9 items
		let start = index - half;
		let end = index + half + 1;

		if (start < 0) {
			end += -start;
			start = 0;
		}

		if (end > items.length) {
			start -= end - items.length;
			end = items.length;
		}

		if (start < 0) start = 0;

		return {
			items: items.slice(start, end),
			head: items.slice(0, start).length,
			tail: items.slice(end).length,
		};
	});
</script>

<section id="series">
	<span>{series.title}</span>
	<div>
		{#if window.head}
			<span>▴ {window.head} more {window.head === 1 ? 'entry' : 'entries'}</span>
		{/if}
		{#each window.items as { slug: link, title, chapter }}
			<a href="/{root}/{link}" class:current={slug === link}>
				{#if chapter}
					<span>{chapter}</span>
					<span style:color="var(--color-accent-secondary)">❃</span>
				{/if}
				<span>{title}</span>
			</a>
		{/each}
		{#if window.tail}
			<span>▾ {window.tail} more {window.tail === 1 ? 'entry' : 'entries'}</span>
		{/if}
	</div>
</section>

<style>
	#series {
		display: grid;
		border: 1px solid var(--color-border);
		border-radius: var(--rounding-box);

		> span {
			padding: 0.6rem 0.8rem;
			border-top-right-radius: inherit;
			border-top-left-radius: inherit;
			border-bottom: 1px solid var(--color-border);
			background: var(--color-surface);
			color: var(--color-text-muted);
			font-size: var(--size-h4);
			font-weight: 500;
		}

		div {
			display: grid;
			border-bottom-right-radius: inherit;
			border-bottom-left-radius: inherit;

			> a,
			> span {
				padding: 0.5rem 1rem;
				text-decoration: none;
				background: var(--color-base);
				color: inherit;
				line-height: 1.4;

				&:last-child {
					border-bottom-right-radius: inherit;
					border-bottom-left-radius: inherit;
				}
			}

			> a {
				&:hover,
				&:focus {
					background: var(--color-overlay);
				}

				&.current {
					pointer-events: none;
					background: var(--color-surface);
				}
			}
		}
	}
</style>
