<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Afterword from './bits/Afterword.svelte';
	import SeriesList from './bits/SeriesList.svelte';

	import type { PartialOmit } from 'mauss/typings';
	import type { Items, SeriesTable } from '$content/builder';
	import type { Article } from '$lib/prose';
	import { hydrate } from 'aubade/browser';
	import { date } from 'mauss';
	import { navigating } from '$app/state';
	import { phrase } from '$lib/prose';

	type Base = Items['/curated' | '/posts' | '/reviews'][number];
	interface Props {
		source?: string;
		post?: PartialOmit<Article, keyof Omit<Article, keyof Base>>;
		collection?: SeriesTable;

		header?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
	const { source = '', post, collection, header, children }: Props = $props();
</script>

<article {@attach hydrate(navigating.from)}>
	{#if post}
		<header>
			<aside>
				{#if post.theme}
					<span>{phrase(post.theme)}</span>
					{#if !post.series && post.theme !== 'essay' && post.theme !== 'reflection'}
						<time datetime={post.date}>{date(post.date).format('DD MMMM YYYY')}</time>
					{/if}
				{:else if post.series?.title === 'Harvest'}
					<time datetime={post.date}>{date(post.date).format('DD MMMM YYYY')}</time>
				{/if}

				{#if post.series}<span>{post.series.title}</span>{/if}
			</aside>

			<h1>{post.title}</h1>
			{#if post.description}
				<p style:margin="0" style:line-height="1.5">{post.description}</p>
			{/if}

			{@render header?.()}
		</header>

		{#if post.table.length}
			<Index items={post.table} open={post.meta?.index} />
		{/if}
	{/if}

	{@render children()}

	{#if collection && post?.series && collection[post.series.title].length > 1}
		<SeriesList slug={post.slug} series={post.series} {collection} />
	{/if}

	{#if post?.branches?.length || post?.flank}
		<Afterword slug={post.slug} branches={post.branches} flank={post.flank} />
	{/if}

	{#if source}
		<section
			data-info
			style:text-align="center"
			style:border-right="var(--rounding-base) solid var(--color-accent-primary)"
		>
			<!-- prettier-ignore -->
			<p><a href="/help#feedback">feedback</a> &middot; <a href="/about#elsewhere">email</a> &middot; <a href="https://github.com/ignatiusmb/mauss.dev/issues">issues</a> &middot; <a href="https://github.com/ignatiusmb/mauss.dev/blob/master/workspace/content/routes/{source}">edits</a></p>
		</section>
	{/if}
</article>

<style>
	article {
		min-width: 0;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr min(80ch, 100%) 1fr;
		word-wrap: break-word;
	}

	header {
		z-index: 0;
		position: relative;
		display: grid;
		gap: 0.8rem;
		justify-items: center;
		padding: 0 0.5rem;
		margin: 2rem 0;
		text-align: center;
		text-wrap: balance;
		font-size: var(--size-base);

		aside {
			display: grid;
			gap: 0.5rem;
			grid-auto-flow: column;
			align-items: center;

			:not(:first-child)::before {
				content: '❃';
				margin-right: 0.5rem;
				color: var(--color-accent-secondary);
			}
		}
	}

	/* ---- {@html} ---- */

	article :global {
		> * {
			grid-column: 2;
		}
		> p:empty {
			margin: 0;
		}
		> .half-bleed,
		> .breakout {
			width: 100%;
			max-width: 72rem;
			grid-column: 1 / -1;
			margin: 1rem auto;
		}
		> .full-bleed {
			width: calc(100% + var(--pad) * 2);
			max-width: 120rem;
			grid-column: 1 / -1;
			margin: 1rem auto;
			transform: translateX(calc(-1 * var(--pad)));
		}
		> .half-bleed img,
		> .full-bleed img,
		> .breakout img {
			object-fit: cover;
			width: 100%;
			max-height: 60vh;
		}

		section {
			margin-top: 2rem;

			> :first-child {
				margin: 0;
			}
		}
		p,
		li {
			font-size: var(--size-base);
			line-height: 1.8;
		}
		p {
			margin-top: 0.75rem;

			&:last-of-type + ul > li:only-child {
				margin-top: 0;
			}

			+ ul,
			+ ol {
				> li:only-child {
					margin-top: 1rem;
				}
			}
		}
		blockquote {
			padding: 0 calc(var(--size-base) * 0.7);
			margin: calc(var(--size-base) * 0.64) 0;
			border-left: var(--rounding-base) solid var(--color-border);
			font-size: var(--size-base);
			color: var(--color-text-muted);

			> :first-child {
				margin: 0;
			}
			+ p {
				margin-top: 0;
			}
		}
		img,
		video {
			max-height: 42rem;
			margin: auto;
			border-radius: var(--rounding-box);
			text-align: center;

			&[src*="://"]
			{
				border: none;
				border-radius: var(--rounding-box);
				text-align: center;
			}
		}
		h1 {
			text-align: center;
			text-wrap: balance;
			color: oklch(1 0 0 / 90%);
		}
		h2,
		h3 {
			scroll-margin-top: 4.8rem;

			@media (min-width: 549px) {
				scroll-margin-top: 1.3rem;
			}
		}
		h2 {
			margin-top: 1.5rem;
			color: oklch(1 0 0 / 85%);

			+ h3 {
				margin-top: 0.5rem;
			}
		}
		h3 {
			margin: 1.5rem 0 -0.25rem;
			color: oklch(1 0 0 / 80%);
		}
		ol,
		ul {
			padding: 0;
			margin: 0;
			margin-top: 0.5rem;

			&:not(:last-child) {
				margin-bottom: -0.5rem;
			}

			+ h3 {
				margin-top: 1.25rem;
			}
		}
		li {
			margin-left: 1.25rem;

			> ol,
			> ul {
				margin: 0;
			}
		}
		hr {
			width: 100%;
			height: 0.1rem;
			position: relative;
			margin: 2rem 0;
			border: 0;
			background: radial-gradient(circle, var(--color-text), transparent);

			&::after {
				content: '';
				width: var(--size-small);
				height: var(--size-small);
				position: absolute;
				top: 0.05rem; /* half of hr height */
				left: 50%;
				border: 0.125rem solid var(--color-text);
				border-radius: calc(var(--rounding-base) / 3);
				background: var(--color-base);
				transform: translate(-50%, -50%) rotate(45deg);
			}

			+ * {
				margin-top: 0;
			}
		}
		figure {
			border-radius: var(--rounding-box);
			margin: 1rem 0;

			figcaption {
				padding: 0.5rem 0.25rem 0;
				text-align: center;
				font-family: var(--font-sans);
				font-size: var(--size-small);
			}
		}
		details:not(#index) {
			margin: 1rem 0 0;
			border-radius: var(--rounding-base);
			background: var(--color-surface);

			summary {
				user-select: none;
				padding: 0.4rem 0.8rem;
				border-radius: var(--rounding-base);
				font-family: var(--font-sans);

				&:hover,
				&:focus-visible {
					background: var(--color-overlay);
				}
			}

			&[open] > summary {
				margin-bottom: 0.1rem;
			}

			> :not(summary):not([data-aubade='youtube']) {
				padding: 0.5rem 0.5rem 0.2rem;
			}
		}
		table {
			width: 100%;
			margin-top: 1rem;
			border-collapse: collapse;
			line-height: 1.3;
			font-size: calc(var(--size-base) * 0.89);

			thead {
				background: var(--color-surface);
				color: var(--color-text-muted);
				font-weight: 500;
			}

			td,
			th {
				padding: 0.5rem;
				border-bottom: 1px solid var(--color-border);
				vertical-align: top;
				text-align: left;
			}
		}
		:not(pre) > code {
			white-space: normal;
		}

		[data-aubade='disclosure'],
		[data-aubade='image'],
		[data-aubade='youtube'],
		[data-aubade='video'] {
			border-radius: inherit;

			&[data-aubade='youtube'] {
				position: relative;
				padding-top: 56.25%;

				iframe {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					border-radius: inherit;
				}
			}
			img,
			video {
				width: 100%;
				object-fit: contain;
			}
		}

		[data-info] {
			padding: min(2%, 0.8rem) min(4%, 1.2rem);
			border-radius: var(--rounding-base);
			border-left: var(--rounding-base) solid var(--color-accent-primary);
			margin: 0;
			margin-top: 1rem;
			background: var(--color-surface);

			&[data-info='warning'] {
				border-left-color: oklch(0.64 0.18 24 / 60%);
				background: oklch(0.26 0.1 28 / 15%);
				color: oklch(0.64 0.18 24);

				code {
					color: oklch(0.72 0.18 24);
				}
			}

			&[data-info='tip'] {
				border-left-color: oklch(0.77 0.17 128 / 60%);
				background: oklch(0.77 0.17 128 / 10%);
				color: oklch(0.77 0.17 128);

				code {
					color: oklch(0.85 0.17 128);
				}
			}

			&[data-info='important'] {
				border-left-color: oklch(0.78 0.16 88);
				background: oklch(0.69 0.1 96 / 15%);
				color: oklch(0.78 0.16 88);

				code {
					color: oklch(0.85 0.16 88);
				}
			}

			&[data-info='note'] {
				border-left-color: oklch(0.69 0.14 234 / 60%);
				background: oklch(0.69 0.14 234 / 15%);
				color: oklch(0.69 0.14 234);

				code {
					color: oklch(0.69 0.14 234);
				}
			}
		}

		[data-aubade='block'] {
			--aubade-rounding: var(--rounding-base);
			font-weight: 350;

			[data-aubade='header'] {
				background: var(--color-border);
				font-family: var(--font-sans);
				font-variation-settings: var(--font-sans-variation);
			}
			[data-aubade='pre'] {
				background: var(--color-code-block);
				font-family: var(--font-mono);
				font-variation-settings: var(--font-mono-variation);
			}
			[data-aubade='tooltip'] {
				border-radius: var(--rounding-base);
				background: oklch(0.4 0.0084 286);
			}
			[data-aubade='tooltip']::after {
				border-color: oklch(0.4 0.0084 286) transparent transparent transparent;
			}
		}
	}
</style>
