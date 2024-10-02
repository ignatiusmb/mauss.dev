<script lang="ts">
	interface Props {
		href: string;
		type?: 'submit' | 'reset';
		style?: 'primary' | 'secondary' | 'danger';
		/** passed through to aria-label */
		label?: string;
		/** sets rel to external and disable data-sveltekit-prefetch */
		external?: boolean;
		disabled?: boolean;
		class?: string | any[];

		onclick?(event: MouseEvent): void;
		onkeydown?(event: KeyboardEvent): void;
		children: import('svelte').Snippet;
	}
	const {
		href = '',
		type,
		style = type === 'submit' ? 'primary' : 'secondary',
		label = '',
		external = /^https?:\/\//.test(href),
		disabled = false,
		class: classes = '',
		onclick,
		onkeydown,
		children,
	}: Props = $props();
</script>

{#if !disabled && href}
	<a
		{href}
		rel={external ? 'external noopener noreferrer' : undefined}
		aria-label={label || undefined}
		class="{style} {classes}"
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		aria-label={label || undefined}
		class="{style} {classes}"
		{onclick}
		{onkeydown}
	>
		{@render children()}
	</button>
{/if}

<style>
	a,
	button {
		display: inline-grid;
		gap: 0.25rem;
		grid-auto-flow: column;
		align-items: center;
		justify-items: center;

		outline: none;
		outline-offset: 0;
		text-decoration: none;
		transition-duration: 240ms;
	}
	button {
		border-radius: 1rem;

		&:disabled {
			cursor: default;
			opacity: 0.5;
			pointer-events: none;
		}
	}

	.primary {
		padding: 0.5rem 1rem;
		border-radius: inherit;

		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-base, #1f2023);

		transition: all var(--t-duration, 300ms) ease-in-out;

		&:hover,
		&:focus,
		&:active {
			color: var(--theme-secondary, #dc143c);
		}
	}

	.danger {
		color: #f06464;
	}
</style>
