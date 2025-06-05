<script lang="ts">
	import Dialog from 'syv/core/Dialog.svelte';

	import type { ComponentProps } from 'svelte';

	type Forwarded = ComponentProps<typeof Dialog>;
	interface Props {
		filters: Record<
			string,
			| Array<{ name: string; selected: boolean }>
			| { selected: string; options: Record<string, string>; required?: boolean }
		>;
		onclose?: Forwarded['onclose'];
	}
	let { filters, ...props }: Props = $props();
</script>

<Dialog
	{...props}
	styles={{
		'--backdrop-filter': 'none',
		'--background': 'var(--color-base)',
		'--border-radius': 'var(--rounding-box)',
		'--padding': '1rem 1.5rem 1.5rem',
	}}
>
	{#snippet children({ forward })}
		<header>
			<h2>Search filters</h2>

			<button onclick={forward} aria-label="Close">
				<i data-icon="x"></i>
			</button>
		</header>

		<div class="options">
			{#each Object.entries(filters) as [key, item]}
				<section>
					<h3>{key.replace(/_/g, ' ')}</h3>

					{#if Array.isArray(item)}
						{#each item as option}
							<label>
								<input type="checkbox" bind:checked={option.selected} value={option.name} />
								<span>{option.name}</span>
							</label>
						{/each}
					{:else}
						{#each Object.entries(item.options) as [value, name]}
							<label>
								{#if item.required}
									<input type="radio" bind:group={item.selected} {value} />
								{:else}
									<input
										type="checkbox"
										{value}
										checked={item.selected === value}
										onclick={() => {
											item.selected = item.selected === value ? '' : value;
										}}
									/>
								{/if}
								<span>{name}</span>
							</label>
						{/each}
					{/if}
				</section>
			{/each}
		</div>
	{/snippet}
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
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		margin-top: 1rem;
		background: inherit;

		section {
			overflow-y: auto;
			max-height: 24rem;
			display: flex;
			flex-direction: column;
			background: inherit;

			h3 {
				position: sticky;
				top: 0;
				padding: 0.5rem 0.25rem;
				border-bottom: 1px solid var(--color-text);
				margin-bottom: 0.5rem;
				background: inherit;
				text-transform: capitalize;
			}
			label {
				cursor: pointer;
				padding: 0.5rem 0.25rem;

				span {
					text-transform: capitalize;
					color: var(--color-text);
				}
			}

			input {
				display: none;

				&:checked + span {
					&::after {
						content: '✔';
						margin-left: 0.5rem;
					}
				}
			}
		}
	}

	i[data-icon] {
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		background: currentColor;
		mask: no-repeat center / 100%;
		mask-image: var(--svg);

		&[data-icon='x'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="200" y1="56" x2="56" y2="200"/><line x1="200" y1="200" x2="56" y2="56"/></svg>');
		}
	}
</style>
