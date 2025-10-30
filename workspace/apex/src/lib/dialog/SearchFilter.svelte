<script lang="ts">
	import Dialog from 'syv/core/Dialog.svelte';
	import type { ComponentProps } from 'svelte';

	interface Props extends Omit<ComponentProps<typeof Dialog>, 'children'> {
		matches: number;
		filters: {
			[category: string]:
				| { name: string; selected: boolean }[]
				| {
						required?: boolean;
						selected: string | number | boolean;
						options: Record<string, string>;
				  };
		};
		onchange(item: { key: string; value: string; required?: boolean }): void;
	}
	const { matches, filters, onchange, ...props }: Props = $props();
</script>

<Dialog
	{...props}
	styles={{
		'--backdrop-color': 'oklch(0 0 0 / 0.42)',
		'--background': 'var(--color-base)',
		'--border-radius': 'var(--rounding-box)',
		'--padding': '1rem 1.5rem 1.5rem',
		'font-family': 'var(--font-sans)',
	}}
>
	<header>
		<h3>Search filters ({matches} matches)</h3>

		<button onclick={props.onclose} aria-label="Close">
			<i data-icon="x"></i>
		</button>
	</header>

	<div class="options">
		{#each Object.entries(filters) as [key, item]}
			<section>
				<h4>{key.replace(/_/g, ' ')}</h4>

				{#if Array.isArray(item)}
					{#each item as option}
						<button
							class:selected={option.selected}
							onclick={() => {
								option.selected = !option.selected;
								onchange({ key, value: option.name });
							}}
						>
							{option.name}
						</button>
					{/each}
				{:else}
					{#each Object.entries(item.options) as [value, name]}
						<button
							class:selected={item.selected === value}
							onclick={() => {
								item.selected = item.required ? value : item.selected === value ? '' : value;
								onchange({ key, value: item.selected, required: item.required });
							}}
						>
							{name}
						</button>
					{/each}
				{/if}
			</section>
		{/each}
	</div>
</Dialog>

<style>
	header {
		z-index: 1;
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: inherit;
		background: inherit;

		button {
			display: flex;
			align-items: center;
			padding: 0.6rem;
			border-radius: inherit;
			color: var(--color-text);

			&:hover,
			&:focus {
				background-color: var(--color-surface);
			}
		}
	}

	.options {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;
		margin-top: 1rem;
		background: inherit;

		@media (min-width: 600px) {
			grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		}

		section {
			overflow-y: auto;
			max-height: 24rem;
			display: grid;
			gap: 0.5rem;
			align-content: start;
			background: inherit;

			h4 {
				position: sticky;
				top: 0;
				padding: 0.5rem;
				margin: 0 0.25rem;
				border-bottom: 1px solid var(--color-text);
				background: inherit;
				text-transform: capitalize;
			}
			button {
				cursor: pointer;
				padding: 0.5rem;
				margin: 0 0.5rem;
				border-radius: var(--rounding-base);
				text-align: left;
				color: var(--color-text);

				&:last-child {
					margin-bottom: 0.25rem;
				}

				&.selected,
				&:hover {
					background: var(--color-surface);
				}
				&.selected:hover {
					background: var(--color-overlay);
				}
				&.selected:active,
				&:active {
					background: var(--color-border);
				}
			}
		}
	}
</style>
