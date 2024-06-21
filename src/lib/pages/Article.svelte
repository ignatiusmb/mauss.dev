<script lang="ts">
	import Index from '$lib/components/Index.svelte';

	import type { ComponentProps } from 'svelte';
	import { hydrate } from 'aubade/browser';
	import { dt } from 'mauss';
	import { navigating, page } from '$app/stores';

	type Flank = null | { slug: string; title: string | Record<string, any> };
	interface Props {
		path?: string;
		post?: null | {
			date: string;
			title: string | { en?: string; jp?: string };
			table: ComponentProps<Index>['items'];

			slug?: string;
			author?: { name?: string; link?: string; img?: string };
			description?: string;
			estimate?: number;
			branches?: Array<{
				branch: string;
			}>;
		};
		flank?: null | Partial<Record<'back' | 'next', Flank>>;

		header?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
	const { path = '', post = null, flank = null, header, children }: Props = $props();
</script>

<article use:hydrate={$navigating}>
	{#if header && post}
		<header>
			<aside>
				<time datetime={post.date}>{dt.format(post.date)('DD MMMM YYYY')}</time>
				{#if post.estimate}
					<span class="dash">&mdash;</span>
					<span>{post.estimate} min read</span>
				{/if}
			</aside>

			{#if typeof post.title === 'string'}
				<h1>{post.title}</h1>
			{:else if post.title.jp}
				<h1>{post.title.jp}</h1>
			{:else}
				<h1>{post.title.en}</h1>
			{/if}

			<a href={post.author?.link || '/about/'}>
				{post.author?.name || 'Ignatius Bagussuputra'}
			</a>

			{#if $page.params.branch || post.branches?.length}
				<div style:display="flex" style:gap="0.25rem" style:text-transform="capitalize">
					<span>[</span>
					{#each post.branches || [] as { branch }, idx}
						{@const root = $page.url.pathname.split('/')[1]}
						{#if idx !== 0}<span class="dash">&mdash;</span>{/if}
						<a href="/{root}/{post.slug}/{branch}">{branch}</a>
					{:else}
						{@const idx = $page.url.pathname.lastIndexOf('/')}
						<a href={$page.url.pathname.slice(0, idx)}>Back to Article</a>
					{/each}
					<span>]</span>
				</div>
			{/if}

			{@render header()}

			{#if post.description}
				<p style:text-align="center">{post.description}</p>
			{/if}
		</header>

		{#if post.table.length}
			<Index items={post.table} />
		{/if}
	{/if}

	{@render children()}

	{#if path}
		<section id="end-card">
			<!-- prettier-ignore -->
			<p>See something to improve or fix? In the spirit of open-source, you can create a new <a href="https://github.com/alchemauss/content/issues">issue</a> or contribute directly to this article by <a href="https://github.com/alchemauss/content/blob/master/{path}">sending a Pull Request on GitHub</a>!</p>
		</section>
	{/if}

	{#if flank}
		<footer>
			{#if flank.back}
				{@const { slug, title } = flank.back}
				{@const text = typeof title === 'string' ? title : title.jp || title.en}

				<a href="/{slug}/" style:text-align="left">
					<strong>&larr; Prev</strong>
					<span class="underlined">{text}</span>
				</a>
			{/if}
			{#if flank.next}
				{@const { slug, title } = flank.next}
				{@const text = typeof title === 'string' ? title : title.jp || title.en}

				<a href="/{slug}/" style:text-align="right">
					<strong>Next &rarr;</strong>
					<span class="underlined">{text}</span>
				</a>
			{/if}
		</footer>
	{/if}
</article>

<style>
	article {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr min(80ch, 100%) 1fr;
		padding: 0 1rem;
		margin: 0 auto;
		word-wrap: break-word;
		line-height: 1.5;
	}

	header {
		z-index: 0;
		position: relative;
		display: grid;
		gap: 0.8rem;
		justify-items: center;
		margin-top: 3rem;

		line-height: 1;
		font-family: var(--mrq-heading);

		& > a {
			margin: 0.5rem 0;
			font-size: 1rem;
		}

		& :global(.dash) {
			color: var(--theme-secondary);
			font-weight: 600;
		}
	}

	aside {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		align-items: center;
		font-size: 0.875rem;
	}

	header > h1,
	article > :global(h1) {
		font-size: clamp(2.5rem, 4vw, 3rem);
		text-align: center;
		text-wrap: balance;
	}

	article {
		section#end-card {
			padding: 0.4rem 0.8rem;
			border-left: 2px solid var(--theme-secondary);
			background-color: rgba(0, 0, 0, 0.15);
		}
	}

	/* ---- {@html} ---- */

	article :global {
		& > * {
			grid-column: 2;
		}
		& > p:empty {
			margin: 0;

			& + p:empty {
				margin-top: 0.5rem;
			}
		}
		& > header:first-child + :not(section) {
			margin-top: 4rem;
		}
		& > .half-bleed {
			width: 100%;
			max-width: 72rem;
			grid-column: 1 / -1;
			margin: 1rem auto;
		}
		& > .full-bleed {
			width: calc(100% + 2rem);
			max-width: 120rem;
			grid-column: 1 / -1;
			margin: 1rem auto;
			transform: translateX(-1rem);
		}
		& > .half-bleed img,
		& > .full-bleed img {
			object-fit: cover;
			width: 100%;
			max-height: 60vh;
		}

		section {
			margin-top: 2rem;

			& > :first-child {
				margin: 0;
			}
		}
		section:first-of-type {
			margin-top: 4rem;
		}
		p,
		li {
			font-size: clamp(1rem, 2vw, 1.15rem);
			line-height: 2rem;
		}
		p {
			margin-top: 0.75rem;

			&:last-of-type + ul > li:only-child {
				margin-top: 0;
			}

			& + ul,
			& + ol {
				& > li:only-child {
					margin-top: 1rem;
				}
			}
		}
		blockquote {
			line-height: 1.5;
			text-align: center;
			font-style: italic;
			font-size: clamp(1.4rem, 3vw, 1.8rem);
			margin: clamp(0.5rem, 3vw, 1.5rem);

			& > :first-child {
				margin: 0;
			}
			p {
				font-size: inherit;
				line-height: unset;
			}
			li {
				margin-left: unset;
			}
		}
		p,
		ol,
		ul {
			code {
				font-size: clamp(0.8rem, 2vw, 1rem);
			}
		}
		img,
		video {
			max-height: 42rem;
			margin: auto;
			border-radius: var(--b-radius);
			text-align: center;

			&[src*="://"]
			{
				border: none;
				border-radius: var(--b-radius);
				text-align: center;
			}
		}
		h2,
		h3 {
			scroll-margin-top: 4rem;
			font-weight: 500;
			font-family: var(--mrq-heading);
		}
		h2 {
			margin-top: 1.5rem;
			font-size: clamp(1.5rem, 4vw, 2rem);
			color: rgba(255, 255, 255, 0.9);

			& + h3 {
				margin-top: 0.5rem;
			}
		}
		h3 {
			margin: 1.5rem 0 -0.25rem;
			font-size: clamp(1.2rem, 4vw, 1.5rem);
			color: rgba(255, 255, 255, 0.8);
		}
		ol,
		ul {
			padding: 0;
			padding-left: 0.5rem;
			margin: 0;
			margin-top: 0.75rem;
			margin-bottom: -0.5rem;

			& + h3 {
				margin-top: 1.25rem;
			}

			li:not(:only-child):last-child {
				margin-bottom: 1rem;
			}
		}
		li {
			margin-left: 1rem;

			& > ol,
			& > ul {
				margin: 0;
			}
		}
		hr {
			width: 100%;
			height: 0.1rem;
			margin-top: 2rem;
			border: 0;
			background-color: var(--fg-surface);
		}
		figure,
		details {
			& > div.captioned {
				display: flex;
				justify-content: center;
				border-radius: var(--b-radius);

				&:not(.flexible) {
					position: relative;
					padding-top: 56.25%;
				}
			}
		}
		figure {
			margin: 1rem 0;

			figcaption {
				padding: 0.5rem 0.25rem 0;
				text-align: center;
				font: 90% var(--font-monospace);
			}
		}
		details {
			margin: 1rem 0 0;

			summary {
				padding: 0 0.25rem;
				font-family: var(--font-monospace);
			}

			&[open] > summary {
				margin-bottom: 0.5rem;
			}
		}
		div.captioned {
			img,
			video {
				border-radius: inherit;
			}

			&.flexible video {
				width: 100%;
			}

			&:not(.flexible) {
				iframe,
				img,
				video {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}
				img {
					object-fit: cover;
				}
			}
		}

		.mrq[data-mrq='header'] {
			line-height: 1;
		}
		& > .layout-wrapper {
			padding: 0 !important;
		}
	}

	footer {
		margin-top: 2rem;
		display: grid;
		border-radius: 0.5rem;
		border: 0.1rem solid var(--fg-surface);

		a {
			display: grid;
			grid-template-rows: auto 1fr;
			text-decoration: none;
			color: inherit;

			&:nth-child(2) {
				border-top: 0.1rem solid var(--fg-surface);
			}
			&:only-child {
				grid-column: 1 / -1;
			}

			strong,
			span {
				padding: 0.2rem 0.8rem;
				margin: 0;
			}
		}

		strong {
			border-bottom: 0.1rem solid var(--fg-surface);
		}
	}

	@media only screen and (min-width: 600px) {
		footer {
			grid-template-columns: 1fr 1fr;
		}
		footer a:nth-child(2) {
			border-top: none;
			border-left: 0.1rem solid var(--fg-surface);
		}
	}
</style>
