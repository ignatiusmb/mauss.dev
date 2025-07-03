<script lang="ts">
	import Index from '$lib/components/Index.svelte';

	import type { ComponentProps } from 'svelte';
	import { hydrate } from 'aubade/browser';
	import { date } from 'mauss';
	import { navigating, page } from '$app/state';

	type Flank = null | { slug: string; title: string | Record<string, any> };
	interface Props {
		path?: string;
		post?: null | {
			date: string;
			title: string | { en?: string; jp?: string };
			table: ComponentProps<typeof Index>['items'];

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

<article {@attach hydrate(navigating.from)}>
	{#if header && post}
		<header>
			<aside>
				<time datetime={post.date}>{date(post.date).format('DD MMMM YYYY')}</time>
				{#if post.estimate}
					<span class="separator">&bull;</span>
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

	{#if flank || post}
		<footer>
			{#if post && (page.params.branch || post.branches?.length)}
				{#each post.branches || [] as { branch }}
					{@const root = page.url.pathname.split('/')[1]}
					<a href="/{root}/{post.slug}/{branch}" data-branch={branch}>
						<strong style:grid-template-columns="1fr auto">
							<span style:text-align="right">{branch.replace(/-/g, ' ')}</span>
							{#if root === 'reviews' && branch === 'deep-dive'}
								<i data-icon="plugs-connected"></i>
							{:else}
								<i data-icon="binoculars"></i>
							{/if}
						</strong>
					</a>
				{:else}
					{@const idx = page.url.pathname.lastIndexOf('/')}
					<a href={page.url.pathname.slice(0, idx)} data-branch="index">
						<strong style:grid-template-columns="auto 1fr">
							<i data-icon="arrow-circle-left"></i>
							<span>back to index</span>
						</strong>
					</a>
				{/each}
			{/if}

			{#if flank}
				{@const end = (flank.next && !flank.back) || (!flank.next && flank.back)}
				{@const wide = end ? '1 / -1' : ''}

				{#if flank.back}{@render sibling('back', flank.back)}{/if}
				{#if flank.next}{@render sibling('next', flank.next)}{/if}

				{#snippet sibling(type: 'back' | 'next', { slug, title }: NonNullable<Flank>)}
					{@const text = typeof title === 'string' ? title : title.jp || title.en}

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
						<span class="underlined">{text}</span>
					</a>
				{/snippet}
			{/if}
		</footer>
	{/if}

	{#if path}
		<section id="end-card">
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
		line-height: 1.5;

		#end-card {
			padding: 0.4rem 0.8rem;
			border: 0 solid var(--color-accent-primary);
			border-left-width: var(--rounding-base);
			border-radius: var(--rounding-base);
			background: var(--color-surface);
		}
	}

	header {
		z-index: 0;
		position: relative;
		display: grid;
		gap: 0.8rem;
		justify-items: center;
		padding: 0 0.5rem;
		margin-top: 2rem;

		line-height: 1;

		aside {
			display: grid;
			gap: 0.5rem;
			grid-auto-flow: column;
			align-items: center;
			font-size: 0.875rem;
		}

		:global(.separator) {
			color: var(--color-accent-primary);
		}
	}

	footer {
		margin-top: 2rem;
		display: grid;
		gap: 0.325rem;
		border-radius: var(--rounding-box);
		background: var(--color-text-muted);

		a {
			display: grid;
			gap: 0.2rem;
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

			+ p:empty {
				margin-top: 0.5rem;
			}
		}
		> header + :not(section) {
			margin-top: 4rem;
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

			+ ul,
			+ ol {
				> li:only-child {
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
			font-size: clamp(2.5rem, 4vw, 3rem);
			text-align: center;
			text-wrap: balance;
			color: oklch(1 0 0 / 90%);
		}
		h2,
		h3 {
			scroll-margin-top: 4.8rem;
			font-weight: 500;

			@media (min-width: 549px) {
				scroll-margin-top: 1.5rem;
			}
		}
		h2 {
			margin-top: 1.5rem;
			font-size: clamp(1.5rem, 4vw, 2rem);
			color: oklch(1 0 0 / 85%);

			+ h3 {
				margin-top: 0.5rem;
			}
		}
		h3 {
			margin: 1.5rem 0 -0.25rem;
			font-size: clamp(1.2rem, 4vw, 1.5rem);
			color: oklch(1 0 0 / 80%);
		}
		ol,
		ul {
			padding: 0;
			padding-left: 0.5rem;
			margin: 0;
			margin-top: 0.75rem;
			margin-bottom: -0.5rem;

			+ h3 {
				margin-top: 1.25rem;
			}
		}
		li {
			margin-left: 1rem;

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
				font: 90% var(--font-monospace);
			}
		}
		details {
			margin: 1rem 0 0;
			border-radius: var(--rounding-box);
			background: var(--color-surface);

			summary {
				user-select: none;
				padding: 0.2rem 0.8rem;
				border-radius: var(--rounding-box);
				font-family: var(--font-monospace);

				&:hover,
				&:focus-visible {
					background: var(--color-overlay);
				}
			}

			&[open] > summary {
				margin-bottom: 0.5rem;
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
			padding: 1rem 1.5rem;
			border-radius: var(--rounding-base);
			border-left: var(--rounding-base) solid oklch(0.5624 0 0);
			margin: 2rem 0;

			&:not([id]) {
				margin-left: -0.25rem;
			}

			&[id] {
				filter: invert() hue-rotate(180deg);

				ol,
				li {
					margin: 0;

					li {
						margin-left: 0.5rem;
						margin-bottom: 0 !important;
					}
				}
			}
			h3 {
				margin-bottom: 0.3rem;
			}
			p {
				margin-bottom: 0;
			}

			&[data-info='objective'] {
				position: relative;
				border-top: clamp(2.5rem, 9vw, 3.5rem) solid;
				border-right: 0.25rem solid;
				border-bottom: 0.25rem solid;
				border-color: oklch(0.2686 0.1394 288 / 40%);
				background: oklch(0.2686 0.1394 288 / 10%);
				color: oklch(0.2686 0.1394 288 / 70%);

				h3 {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					transform: translateY(-125%);
					text-align: center;
					color: inherit;
				}
				h4 {
					margin: 1rem 0 0.5rem;
					font-weight: 500;
				}
				var,
				code {
					background: oklch(0.2686 0.1394 288);
					color: white;
				}
			}

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

		[data-aubade='header'] {
			line-height: 1;
		}
		[data-aubade='pre'] {
			background: var(--color-code-block);
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
