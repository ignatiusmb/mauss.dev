<script lang="ts">
	interface Props {
		items: Array<{ id: string; title: string; level?: number }>;
		summary?: string;
	}
	const { summary = 'Article Index', items }: Props = $props();

	const balancer = $derived(items.reduce((c, i) => Math.min(c, i.level || 2), 4));
</script>

<details id="index">
	<summary>{summary}</summary>
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
		background: oklch(1 0 0 / 0.1);

		&[open] {
			border: 1px solid oklch(0.5863 0 0 / 70%);

			summary {
				margin-bottom: 0;
				border-width: 0;
				border-bottom-width: 1px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		summary {
			padding: 0.5rem 1rem;
			margin: 0;
			border: 1px solid oklch(0.5863 0 0 / 70%);
			border-radius: var(--rounding-box);

			&::marker {
				text-align: right;
			}
		}

		div {
			display: grid;
			margin: 0;
			line-height: 2;
			font-size: 1rem;

			a {
				padding: 0.25rem 1rem;
				text-decoration: none;

				&:hover {
					background: oklch(1 0 0 / 10%);
				}
				&:last-child {
					border-bottom-right-radius: var(--rounding-box);
					border-bottom-left-radius: var(--rounding-box);
				}
			}
		}
	}
</style>
