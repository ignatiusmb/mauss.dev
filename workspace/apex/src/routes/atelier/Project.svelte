<script lang="ts">
	interface Props {
		link: string;
		name: string;
		est: string;

		open: boolean;
		logo: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
	let { link, logo, name, est, open = $bindable(true), children }: Props = $props();
	const id = name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$|(?<=-)-+/g, '');
</script>

<section {id}>
	<a href={link}>
		{@render logo()}
		<div>
			<strong class="underlined">{name}</strong>
			<small><em>est.</em> {est}</small>
		</div>
	</a>

	<details bind:open>
		<summary>
			<span>notes</span>
		</summary>
		<div>{@render children()}</div>
	</details>
</section>

<style>
	section {
		display: grid;
		align-items: center;
		border-radius: var(--rounding-box);

		a {
			display: grid;
			gap: 0 0.5rem;
			grid-template-rows: 4rem 1fr;
			grid-template-columns: 4rem 1fr;
			align-items: center;
			padding: 0.5rem;
			padding-right: 0.8rem;
			border-top-right-radius: inherit;
			border-top-left-radius: inherit;
			background: var(--color-surface);
			text-decoration: none;

			&:hover {
				background: var(--color-overlay);
			}

			> :global(:first-child) {
				width: 100%;
				height: 100%;
				border-radius: var(--rounding-base);
			}

			> div {
				display: grid;
				gap: 0.25rem;

				small {
					color: var(--color-text-muted);
				}
			}
		}

		details {
			background: var(--color-surface);
			border-bottom-right-radius: inherit;
			border-bottom-left-radius: inherit;

			&:not([open]) summary {
				border-bottom-right-radius: var(--rounding-box);
				border-bottom-left-radius: var(--rounding-box);
			}

			summary {
				user-select: none;
				padding: 0.5rem;
				padding-left: 0.75rem;
				text-align: center;

				&:hover {
					background: var(--color-overlay);
				}
			}

			> div {
				display: grid;
				gap: 0.5rem;
				padding: 0.5rem;
				font-size: 0.98rem;
				line-height: 1.67;
			}
		}
	}
</style>
