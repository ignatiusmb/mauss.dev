<script lang="ts">
	interface Props {
		items: Array<{ id: string; title: string; level?: number }>;
		summary?: string;
	}
	const { summary = 'Article Index', items }: Props = $props();

	const balancer = $derived(items.reduce((c, i) => Math.min(c, i.level || 2), 4));
</script>

<details open id="index">
	<summary>
		<i data-icon="duotone-caret-right"></i>
		<span>{summary}</span>
	</summary>
	<div>
		{#each items as { id, title, level = 2 }}
			{@const pad = `${1 + (level - balancer) * 0.75}rem`}
			<a href="#{id}" style:padding-left={pad}>{title}</a>
		{/each}
	</div>
</details>

<style>
	/* add # to increase specificity */
	details#index {
		margin-bottom: 1rem;
		border-radius: var(--rounding-box);
		background: var(--color-surface);
		font-size: var(--size-base);

		&[open] {
			border: 1px solid var(--color-border);

			summary {
				margin-bottom: 0;
				border-width: 0;
				border-bottom-width: 1px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;

				i[data-icon] {
					transform: rotate(90deg);
				}
			}
		}

		summary {
			list-style: none;
			cursor: pointer;
			user-select: none;

			display: grid;
			gap: 0.25rem;
			align-items: center;
			grid-template-columns: auto 1fr;
			padding: 0.5rem 1rem;
			margin: 0;
			border: 1px solid var(--color-border);
			border-radius: var(--rounding-box);
			font-weight: 500;

			&:hover,
			&:focus-within {
				background: var(--color-overlay);
			}
		}

		div {
			display: grid;
			margin: 0;
			line-height: 1.8;

			a {
				padding: 0.2rem 1rem 0.1rem;
				border-radius: var(--rounding-base);
				text-decoration: none;

				&:hover {
					background: var(--color-overlay);
				}
				&:last-child {
					border-bottom-right-radius: var(--rounding-box);
					border-bottom-left-radius: var(--rounding-box);
				}
			}
		}

		i[data-icon='duotone-caret-right'] {
			transition: var(--transition-fast) ease-out;
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><polygon points="96 48 176 128 96 208 96 48" opacity="0.2"/><polygon points="96 48 176 128 96 208 96 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
		}
	}
</style>
