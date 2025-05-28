<script lang="ts">
	interface Props {
		items: Array<{ id: string; title: string; level?: number }>;
	}
	const { items }: Props = $props();

	const balancer = $derived(items.reduce((c, i) => Math.min(c, i.level || 4), 4) - 2);
</script>

<details id="index">
	<summary>Article Index</summary>
	<div>
		{#each items as { id, title, level = 2 }}
			{@const pad = `${(level - balancer) * 0.5}rem`}
			<a href="#{id}" style:padding-left={pad}>{title}</a>
		{/each}
	</div>
</details>

<style>
	/* add # to increase specificity */
	details#index {
		--radius: calc(var(--b-radius));
		margin-bottom: 1rem;
		border-radius: var(--radius);
		background: rgba(255, 255, 255, 0.1);

		&[open] {
			border: 1px solid rgba(124, 124, 124, 0.7);

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
			border: 1px solid rgba(124, 124, 124, 0.7);
			border-radius: var(--radius);

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
					background: rgba(255, 255, 255, 0.1);
				}
				&:last-child {
					border-bottom-right-radius: var(--radius);
					border-bottom-left-radius: var(--radius);
				}
			}
		}
	}
</style>
