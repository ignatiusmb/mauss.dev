<script lang="ts">
	import ProgressBar from 'syv/core/ProgressBar.svelte';
	import Index from '$lib/components/Index.svelte';

	import type { ComponentProps } from 'svelte';
	import { hydrate } from 'aubade/browser';
	import { dt } from 'mauss';
	import { navigating, page } from '$app/stores';

	export let path = '';
	export let post: null | {
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
	} = null;

	type Flank = null | { slug: string; title: string | Record<string, any> };
	export let flank: null | Partial<Record<'back' | 'next', Flank>> = null;
</script>

{#if $$slots.header}
	<ProgressBar height="4px" />
{/if}

<main use:hydrate={$navigating}>
	{#if $$slots.header && post}
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

			<slot name="header" />

			{#if post.description}
				<p style:text-align="center">{post.description}</p>
			{/if}
		</header>

		{#if post.table.length}
			<Index items={post.table} />
		{/if}
	{/if}

	<slot />

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
				<a href="/{slug}/" style:text-align="left">
					<strong>&larr; Prev</strong>
					{#if typeof title === 'string'}
						<span>{title}</span>
					{:else if title.jp}
						<span>{title.jp}</span>
					{:else}
						<span>{title.en}</span>
					{/if}
				</a>
			{/if}
			{#if flank.next}
				{@const { slug, title } = flank.next}
				<a href="/{slug}/" style:text-align="right">
					<strong>Next &rarr;</strong>
					{#if typeof title === 'string'}
						<span>{title}</span>
					{:else if title.jp}
						<span>{title.jp}</span>
					{:else}
						<span>{title.en}</span>
					{/if}
				</a>
			{/if}
		</footer>
	{/if}
</main>

<style>
	main {
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
	}

	aside {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		align-items: center;
		font-size: 0.875rem;
	}
	header > a {
		margin: 0.5rem 0;
		font-size: 1rem;
	}
	header > h1,
	main > :global(h1) {
		font-size: clamp(2.5rem, 4vw, 3rem);
		text-align: center;
		text-wrap: balance;
	}

	header :global(.dash) {
		color: var(--theme-secondary);
		font-weight: 600;
	}

	/* ---- {@html} ---- */

	main > :global(*) {
		grid-column: 2;
	}
	main > :global(p:empty) {
		margin: 0;
	}
	main > :global(p:empty + p:empty) {
		margin-top: 0.5rem;
	}

	main > :global(.half-bleed) {
		width: 100%;
		max-width: 72rem;
		grid-column: 1 / -1;
		margin: 1rem auto;
	}
	main > :global(.full-bleed) {
		width: calc(100% + 2rem);
		max-width: 120rem;
		grid-column: 1 / -1;
		margin: 1rem auto;
		transform: translateX(-1rem);
	}
	main > :global(.half-bleed img),
	main > :global(.full-bleed img) {
		object-fit: cover;
		width: 100%;
		max-height: 60vh;
	}

	main > :global(header:first-child + :not(section)) {
		margin-top: 4rem;
	}

	main :global(section) {
		margin-top: 2rem;
	}
	main :global(section > :first-child) {
		margin: 0;
	}
	main > :global(section:first-of-type) {
		margin-top: 4rem;
	}
	main section#end-card {
		padding: 0.4rem 0.8rem;
		border-left: 2px solid var(--theme-secondary);
		background-color: rgba(0, 0, 0, 0.15);
	}
	main :global(p),
	main :global(li) {
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 2rem;
	}
	main :global(blockquote p) {
		font-size: inherit;
		line-height: unset;
	}
	main :global(blockquote > :first-child) {
		margin: 0;
	}

	main :global(p) {
		margin-top: 0.75rem;
	}
	main :global(p code),
	main :global(ol code),
	main :global(ul code) {
		font-size: clamp(0.8rem, 2vw, 1rem);
	}
	main :global(img),
	main :global(video) {
		max-height: 42rem;
		margin: auto;
		border-radius: var(--b-radius);
		text-align: center;
	}
	main :global(img[src*="://"])
	{
		border: none;
		border-radius: var(--b-radius);
		text-align: center;
	}
	main :global(h2),
	main :global(h3) {
		scroll-margin-top: 4rem;
		font-weight: 500;
		font-family: var(--mrq-heading);
	}
	main :global(h2) {
		margin-top: 1.5rem;
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: rgba(255, 255, 255, 0.9);
	}
	main :global(h2 + h3) {
		margin-top: 0.5rem;
	}
	main :global(h3) {
		margin: 1.5rem 0 -0.25rem;
		font-size: clamp(1.2rem, 4vw, 1.5rem);
		color: rgba(255, 255, 255, 0.8);
	}
	main :global(ol + h3),
	main :global(ul + h3) {
		margin-top: 1.25rem;
	}
	main :global(ol),
	main :global(ul) {
		padding: 0;
		padding-left: 0.5rem;
		margin: 0;
		margin-top: 0.75rem;
		margin-bottom: -0.5rem;
	}
	main :global(ol li:not(:only-child):last-child),
	main :global(ul li:not(:only-child):last-child) {
		margin-bottom: 1rem;
	}
	main :global(li) {
		margin-left: 1rem;
	}
	main :global(li > ol),
	main :global(li > ul) {
		margin: 0;
	}
	main :global(p + ul > li:only-child),
	main :global(p + ol > li:only-child) {
		margin-top: 1rem;
	}
	main :global(p:last-of-type + ul > li:only-child) {
		/* references list */
		margin-top: 0;
	}
	main :global(blockquote) {
		line-height: 1.5;
		text-align: center;
		font-style: italic;
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		margin: clamp(0.5rem, 3vw, 1.5rem);
	}
	main :global(blockquote li) {
		margin-left: unset;
	}
	main :global(hr) {
		width: 100%;
		height: 0.1rem;
		margin-top: 2rem;
		border: 0;
		background-color: var(--fg-surface);
	}

	main :global(figure) {
		margin: 1rem 0;
	}
	main :global(details) {
		margin: 1rem 0 0;
	}
	main :global(details[open] > summary) {
		margin-bottom: 0.5rem;
	}
	main :global(figure figcaption) {
		padding: 0.5rem 0.25rem 0;
		text-align: center;
		font: 90% var(--font-monospace);
	}
	main :global(details summary) {
		padding: 0 0.25rem;
		font-family: var(--font-monospace);
	}
	main :global(details > div.captioned),
	main :global(figure > div.captioned) {
		display: flex;
		justify-content: center;
		border-radius: var(--b-radius);
	}
	main :global(details > div.captioned:not(.flexible)),
	main :global(figure > div.captioned:not(.flexible)) {
		position: relative;
		padding-top: 56.25%;
	}
	main :global(div.captioned:not(.flexible) iframe),
	main :global(div.captioned:not(.flexible) img),
	main :global(div.captioned:not(.flexible) video) {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	main :global(div.captioned:not(.flexible) img) {
		object-fit: cover;
	}

	main :global(div.captioned img),
	main :global(div.captioned video) {
		border-radius: inherit;
	}
	main :global(div.captioned.flexible video) {
		width: 100%;
	}

	main :global(.mrq[data-mrq='header']) {
		line-height: 1;
	}

	main > :global(.layout-wrapper) {
		padding: 0 !important;
	}

	footer {
		margin-top: 2rem;
		display: grid;
		border-radius: 0.5rem;
		border: 0.1rem solid var(--fg-surface);
	}
	footer a {
		display: grid;
		grid-template-rows: auto 1fr;
		color: inherit;
	}
	footer a:nth-child(2) {
		border-top: 0.1rem solid var(--fg-surface);
	}
	footer a:only-child {
		grid-column: 1 / -1;
	}
	footer a strong,
	footer a span {
		padding: 0.2rem 0.8rem;
		margin: 0;
	}
	footer strong {
		border-bottom: 0.1rem solid var(--fg-surface);
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
