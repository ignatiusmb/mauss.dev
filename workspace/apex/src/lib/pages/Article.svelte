<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import type { IntersectUnion, Overwrite, PartialOmit } from 'mauss/typings';
	import type { Items } from '$content/builder';
	import { hydrate } from 'aubade/browser';
	import { date } from 'mauss';
	import { navigating, page } from '$app/state';

	type Base = Items['/curated' | '/posts' | '/reviews'][number];
	type Article = Overwrite<IntersectUnion<Base>, { branches?: string[] }>;
	interface Props {
		path?: string;
		post?: PartialOmit<Article, keyof Omit<Article, keyof Base>>;

		header?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
	const { path = '', post, header, children }: Props = $props();
</script>

<article {@attach hydrate(navigating.from)}>
	{#if post}
		<header>
			<aside>
				<time datetime={post.date}>{date(post.date).format('DD MMMM YYYY')}</time>
				{#if post.estimate}
					<span class="separator">&bull;</span>
					<span>{post.estimate} min read</span>
				{/if}
			</aside>

			<h1>{post.title}</h1>

			{@render header?.()}

			{#if post.description}
				<p style:margin="0" style:line-height="1.5">{post.description}</p>
			{/if}
		</header>

		{#if post.table.length}
			<Index items={post.table} />
		{/if}
	{/if}

	{@render children()}

	{#if post?.branches?.length || post?.flank}
		<footer>
			{#if post?.branches?.length}
				{@const icons = {
					'reviews/deep-dive': 'plugs-connected',
				} as Record<string, string>}

				{#each post.branches.filter((branch) => branch !== page.params.branch) as branch}
					{@const root = page.url.pathname.split('/')[1]}
					<a href="/{root}/{post.slug}/{branch}" data-branch={branch}>
						<strong style:grid-template-columns="1fr auto">
							<span style:text-align="right">{branch.replace(/-/g, ' ')}</span>
							<i data-icon={icons[`${root}/${branch}`] || 'binoculars'}></i>
						</strong>
					</a>
				{/each}

				{#if page.params.branch}
					{@const idx = page.url.pathname.lastIndexOf('/')}
					<a href={page.url.pathname.slice(0, idx)} data-branch="index">
						<strong style:grid-template-columns="auto 1fr">
							<i data-icon="arrow-circle-left"></i>
							<span>back to index</span>
						</strong>
					</a>
				{/if}
			{/if}

			{#if post.flank}
				{@const { back, next } = post.flank}
				{@const end = (next && !back) || (!next && back)}
				{@const wide = end ? '1 / -1' : ''}

				{#if back}{@render sibling('back', back.slug, back.title)}{/if}
				{#if next}{@render sibling('next', next.slug, next.title)}{/if}

				{#snippet sibling(type: 'back' | 'next', slug: string, title: string)}
					<a href={slug} data-flank={type} style:grid-column={wide}>
						<strong>
							{#if type === 'back'}
								<i data-icon="arrow-circle-left"></i>
								<span>newer</span>
							{:else}
								<span>older</span>
								<i data-icon="arrow-circle-right"></i>
							{/if}
						</strong>
						<span class="underlined">{title}</span>
					</a>
				{/snippet}
			{/if}
		</footer>
	{/if}

	{#if path}
		<section data-info>
			<!-- prettier-ignore -->
			<p>open-source and open to improvement — <a href="https://github.com/ignatiusmb/mauss.dev/issues" target="_blank">file an issue</a> or <a href="https://github.com/ignatiusmb/mauss.dev/blob/master/workspace/content/routes/{path}" target="_blank">suggest changes</a> via github</p>
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
		}

		:global(.separator) {
			color: var(--color-accent-primary);
		}
	}

	footer {
		margin-top: 2rem;
		display: grid;
		gap: 0.2rem 0.25rem;
		border-radius: var(--rounding-box);
		background: var(--color-text-muted);

		a {
			display: grid;
			gap: 0.5rem;
			grid-template-rows: auto 1fr;
			padding: 0.8rem;
			border-radius: var(--rounding-base);
			text-decoration: none;
			color: inherit;
			background: var(--color-base);

			&[data-branch] {
				grid-column: 1 / -1;
				grid-template-rows: auto;
				border: var(--rounding-base) solid transparent;
				border-top-width: 0;
				border-bottom-width: 0;

				&:hover,
				&:focus-visible {
					border-right-color: var(--color-accent-tertiary);
					border-left-color: var(--color-accent-tertiary);
				}
			}

			&[data-flank='back'] {
				border-left: var(--rounding-base) solid transparent;
				border-top-left-radius: var(--rounding-base);
				border-bottom-left-radius: var(--rounding-base);

				strong {
					grid-template-columns: auto 1fr;
				}
			}
			&[data-flank='next'] {
				border-right: var(--rounding-base) solid transparent;
				border-top-right-radius: var(--rounding-base);
				border-bottom-right-radius: var(--rounding-base);
				text-align: right;

				strong {
					grid-template-columns: 1fr auto;
				}
			}

			&:hover,
			&:focus-visible {
				border-color: var(--color-accent-primary);
				background: var(--color-surface);
			}

			strong {
				display: grid;
				gap: 0.5rem;
				align-items: center;
			}
			i[data-icon] {
				width: 1.25rem;
				height: 1.25rem;
			}
		}

		@media (min-width: 600px) {
			grid-template-columns: 1fr 1fr;
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
		/* @TODO: have 2 quote styles */
		blockquote {
			line-height: 1.325;
			text-align: center;
			font-style: italic;
			font-size: clamp(1.4rem, 3vw, 1.8rem);
			margin: clamp(0.5rem, 3vw, 1.5rem);

			> :first-child {
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
				scroll-margin-top: 1.5rem;
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
			height: 0.1rem;
			margin-top: 2rem;
			border: 0;
			background-color: var(--color-text);
		}
		figure,
		details {
			border-radius: var(--rounding-box);
			&.full-bleed {
				border-radius: 0;
			}
			> div.captioned {
				display: flex;
				justify-content: center;
				border-radius: inherit;

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
				font-family: var(--font-sans);
				font-size: var(--size-small);
			}
		}
		details {
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

			> :not(summary) {
				padding: 0.2rem;
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
					border-radius: var(--rounding-box);
				}
				img {
					object-fit: cover;
				}
			}
		}

		[data-info] {
			padding: min(2%, 0.8rem) min(4%, 1.2rem);
			border-radius: var(--rounding-base);
			border-left: var(--rounding-base) solid var(--color-accent-primary);
			margin: 1rem 0 0 -0.25rem;
			background: var(--color-surface);

			&[data-info='warning'] {
				border-left-color: oklch(0.6793 0.1734 23 / 40%);
				background: oklch(0.6793 0.1734 23 / 10%);
				color: oklch(0.6793 0.1734 23);

				var,
				code {
					background: oklch(0.6793 0.1734 23);
					color: white;
				}
			}

			&[data-info='tip'] {
				border-left-color: oklch(0.7712 0.1737 127 / 40%);
				background: oklch(0.7712 0.1737 127 / 10%);
				color: oklch(0.7712 0.1737 127);

				var,
				code {
					background: oklch(0.7712 0.1737 127);
					color: white;
				}
			}

			&[data-info='important'] {
				border-left-color: oklch(0.7828 0.159987 88);
				background: oklch(0.9499 0.0781 95 / 20%);
				color: oklch(0.7828 0.159987 88);

				var,
				code {
					background: oklch(0.7828 0.159987 88);
					color: white;
				}
			}

			&[data-info='note'] {
				border-left-color: oklch(0.6648 0.1322 233 / 40%);
				background: oklch(0.6648 0.1322 233 / 10%);
				color: oklch(0.6648 0.1322 233);

				var,
				code {
					background: oklch(0.6648 0.1322 233);
					color: white;
				}
			}
		}

		[data-aubade] {
			--aubade-rounding: var(--rounding-base);
			font-weight: 350;
		}
		[data-aubade='header'] {
			background: var(--color-border);
			line-height: 1;
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

	i[data-icon] {
		&[data-icon='binoculars'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="104" y1="88" x2="152" y2="88"/><path d="M229.59,154.32,185.94,55A24,24,0,0,0,152,55V168"/><path d="M104,168V55a24,24,0,0,0-33.94,0L26.41,154.32"/><circle cx="64" cy="168" r="40"/><circle cx="192" cy="168" r="40"/></svg>');
		}
		&[data-icon='plugs-connected'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="63.03" y="88.4" width="129.94" height="79.2" rx="24" transform="translate(-53.02 128) rotate(-45)"/><line x1="88" y1="88" x2="168" y2="168"/><line x1="232" y1="24" x2="173.94" y2="82.06"/><line x1="82.06" y1="173.94" x2="24" y2="232"/><line x1="96" y1="32" x2="104" y2="52"/><line x1="32" y1="96" x2="52" y2="104"/><line x1="204" y1="152" x2="224" y2="160"/><line x1="152" y1="204" x2="160" y2="224"/></svg>');
		}
	}
</style>
