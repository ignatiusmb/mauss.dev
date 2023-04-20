<script>
	export let href = '';
	/** @type {undefined | 'submit' | 'reset'} */
	export let type = undefined;
	/** @type {'primary' | 'secondary' | 'danger'} */
	export let style = type === 'submit' ? 'primary' : 'secondary';

	/** passed through to aria-label */
	export let label = '';
	/** sets rel to external and disable data-sveltekit-prefetch */
	export let external = /^https?:\/\//.test(href);

	export let disabled = false;
	export { classes as class };
	/** @type {string | any[]} */
	let classes = '';
</script>

{#if !disabled && href}
	<a
		{href}
		rel={external ? `external noopener noreferrer` : undefined}
		aria-label={label || undefined}
		class="{style} {classes}"
	>
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		aria-label={label || undefined}
		class="{style} {classes}"
		on:click
		on:keydown
	>
		<slot />
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

		border-radius: 1rem;
		outline: none;
		outline-offset: 0;
		transition-duration: 240ms;
	}

	button:disabled {
		cursor: default;
		opacity: 0.5;
		pointer-events: none;
	}

	.primary {
		padding: 0.5em 1em;
		border-radius: inherit;

		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-base, #1f2023);

		transition: all var(--t-duration, 300ms) ease-in-out;
	}
	.primary:hover,
	.primary:active {
		color: var(--theme-secondary, #dc143c);
	}

	.danger {
		color: #f06464;
	}
</style>
