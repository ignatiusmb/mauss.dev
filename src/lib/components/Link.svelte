<script>
	export let href = '';
	/** @type {undefined | 'submit' | 'reset'} */
	export let type = undefined;
	/** @type {'primary' | 'secondary' | 'tertiary' | 'danger'} */
	export let style = type === 'submit' ? 'primary' : 'secondary';

	/** sets rel to external and disable data-sveltekit-prefetch */
	export let external = /^https?:\/\//.test(href);
	/** @type {boolean | 'off'} - sets data-sveltekit-prefetch value */
	export let prefetch = !external;
	/** @type {boolean | 'off'} - sets data-sveltekit-noscroll value */
	export let noscroll = false;

	export let disabled = false;
	export { classes as class };
	/** @type {string | any[]} */
	let classes = '';

	/** @param {typeof prefetch} option */
	function assign(option) {
		if (option === false) return undefined;
		if (option === true) return '';
		return option;
	}
</script>

{#if href}
	<a
		{href}
		rel={external ? `external noopener noreferrer` : undefined}
		data-sveltekit-prefetch={assign(prefetch)}
		data-sveltekit-noscroll={assign(noscroll)}
		class="{style} {classes}"
	>
		<slot />
	</a>
{:else}
	<button {type} {disabled} class="{style} {classes}" on:click on:keydown>
		<slot />
	</button>
{/if}

<style>
	button {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		align-items: center;

		border-radius: 1rem;

		outline: none;
		outline-offset: 0;
		transition-duration: 240ms;
	}

	button:disabled {
		cursor: default;
		opacity: 0.5;
	}

	.danger {
		color: #f06464;
	}
</style>
