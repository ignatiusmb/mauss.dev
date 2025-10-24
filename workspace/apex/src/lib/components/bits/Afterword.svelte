<script lang="ts">
	import type { Article } from '$lib/prose';
	import { page } from '$app/state';

	interface Props {
		slug: string;
		branches: Article['branches'];
		flank?: Article['flank'];
	}
	const { slug, branches, flank }: Props = $props();
</script>

<footer>
	{#if branches?.length}
		{@const icons = {
			'reviews/deep-dive': 'plugs-connected',
		} as Record<string, string>}

		{#each branches.filter((branch) => branch !== page.params.branch) as branch}
			{@const root = page.url.pathname.split('/')[1]}
			<a href="/{root}/{slug}/{branch}" data-branch={branch}>
				<strong style:grid-template-columns="1fr auto">
					<span style:text-align="right">{branch.replace(/-/g, ' ')}</span>
					<i data-icon={icons[`${root}/${branch}`] || 'binoculars'}></i>
				</strong>
			</a>
		{/each}

		{#if page.params.branch}
			{@const idx = page.url.pathname.lastIndexOf('/')}
			<a href={page.url.pathname.slice(0, idx)} data-branch="index">
				<strong>◂ back to index</strong>
			</a>
		{/if}
	{/if}

	{#if flank}
		{@const { back, next } = flank}
		{@const end = (next && !back) || (!next && back)}
		{@const wide = end ? '1 / -1' : ''}

		{#if back}{@render sibling('back', back.slug, back.title)}{/if}
		{#if next}{@render sibling('next', next.slug, next.title)}{/if}

		{#snippet sibling(type: 'back' | 'next', slug: string, title: string)}
			<a href={slug} data-flank={type} style:grid-column={wide}>
				{#if type === 'back'}
					<span class="chevron">&lsaquo;</span>
					<strong>newer</strong>
				{:else}
					<span class="chevron" style:grid-column="2">&rsaquo;</span>
					<strong>older</strong>
				{/if}
				<span class="underlined">{title}</span>
			</a>
		{/snippet}
	{/if}
</footer>

<style>
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

			&[data-flank] {
				display: grid;
				gap: 0.3rem 0.5rem;
				grid-template-rows: auto auto;
				align-items: start;
				align-content: start;

				.chevron {
					grid-row: 1 / -1;
					font-size: calc(var(--size-base) * 2);
				}
			}
			&[data-flank='back'] {
				grid-template-columns: auto 1fr;
				border-left: var(--rounding-base) solid transparent;
				border-top-left-radius: var(--rounding-base);
				border-bottom-left-radius: var(--rounding-base);
			}
			&[data-flank='next'] {
				grid-template-columns: 1fr auto;
				border-right: var(--rounding-base) solid transparent;
				border-top-right-radius: var(--rounding-base);
				border-bottom-right-radius: var(--rounding-base);
				text-align: right;
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

	i[data-icon] {
		&[data-icon='binoculars'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="104" y1="88" x2="152" y2="88"/><path d="M229.59,154.32,185.94,55A24,24,0,0,0,152,55V168"/><path d="M104,168V55a24,24,0,0,0-33.94,0L26.41,154.32"/><circle cx="64" cy="168" r="40"/><circle cx="192" cy="168" r="40"/></svg>');
		}
		&[data-icon='plugs-connected'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="63.03" y="88.4" width="129.94" height="79.2" rx="24" transform="translate(-53.02 128) rotate(-45)"/><line x1="88" y1="88" x2="168" y2="168"/><line x1="232" y1="24" x2="173.94" y2="82.06"/><line x1="82.06" y1="173.94" x2="24" y2="232"/><line x1="96" y1="32" x2="104" y2="52"/><line x1="32" y1="96" x2="52" y2="104"/><line x1="204" y1="152" x2="224" y2="160"/><line x1="152" y1="204" x2="160" y2="224"/></svg>');
		}
	}
</style>
