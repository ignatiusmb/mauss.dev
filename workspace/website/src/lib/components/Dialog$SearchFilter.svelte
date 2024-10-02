<script lang="ts">
	import Dialog from 'syv/core/Dialog.svelte';
	import Feather from 'syv/icons/Feather.svelte';

	import type { ComponentProps } from 'svelte';
	import { X } from 'syv/icons/feather';

	type Forwarded = ComponentProps<Dialog>;
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
		'--background': 'var(--bg-base)',
		'--padding': '1rem 1.5rem 1.5rem',
	}}
>
	{#snippet children({ forward })}
		<header>
			<h2>Search filters</h2>

			<button onclick={forward}>
				<Feather icon={X} />
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
			color: inherit;

			&:hover,
			&:focus {
				background-color: var(--bg-surface);
			}
		}
	}

	.options {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
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
				border-bottom: 1px solid var(--fg-surface);
				margin-bottom: 0.5rem;
				background: inherit;
				text-transform: capitalize;
			}
			label {
				cursor: pointer;
				padding: 0.5rem 0.25rem;

				span {
					text-transform: capitalize;
					color: var(--fg-surface);
				}
			}

			input {
				display: none;

				&:checked + span {
					color: var(--fg-overlay);

					&::after {
						content: '✔';
						margin-left: 0.5rem;
					}
				}
			}
		}
	}
</style>
