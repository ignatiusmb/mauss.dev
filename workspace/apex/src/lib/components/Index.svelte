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
		background: var(--color-surface);

		&[open] {
			border: 1px solid var(--color-border);

			summary {
				margin-bottom: 0;
				border-width: 0;
				border-bottom-width: 1px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;

				&::before {
					transform: rotate(315deg);
				}
			}
		}

		summary {
			list-style: none;
			cursor: pointer;
			user-select: none;

			display: grid;
			gap: 0.5rem;
			align-items: center;
			grid-template-columns: auto 1fr;
			padding: 0.5rem 1rem;
			margin: 0;
			border: 1px solid var(--color-border);
			border-radius: var(--rounding-box);

			&:hover,
			&:focus-within {
				background: var(--color-overlay);
			}

			&::before {
				content: '';
				width: 1.5rem;
				height: 1.5rem;
				display: inline-block;
				background: currentColor;
				transition: var(--transition-slow) ease-out;
				mask: no-repeat center / 100%;
				mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polygon points="128 8 104 104 128 128 152 104 128 8"/><polygon points="128 248 104 152 128 128 152 152 128 248"/><polyline points="152 104 248 128 152 152"/><polyline points="104 104 8 128 104 152"/><path d="M40.37,119.91a88,88,0,0,1,79.54-79.54"/><path d="M119.91,215.63a88,88,0,0,1-79.54-79.54"/><path d="M215.63,136.09a88,88,0,0,1-79.54,79.54"/><path d="M136.09,40.37a88,88,0,0,1,79.54,79.54"/></svg>');
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
