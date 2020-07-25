<script>
	export let href = '';
	export let disabled = false;
	import Link from '@ignatiusmb/elements/svelte/Link.svelte';
</script>

<span class:disabled>
	<Link href={!disabled ? href : ''} inherit>
		<slot />
	</Link>
</span>

<style>
	span {
		display: inline-flex;
		border-radius: 0.25em;
		text-transform: uppercase;
		color: var(--fg-color);
		background-color: var(--bg-color);
		transition: 50ms;
	}
	span:hover,
	span:active {
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
		transform: scale(1.05);
	}

	span.disabled {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.4;
		text-transform: none;
	}
	span.disabled:hover,
	span.disabled:active {
		box-shadow: none;
		transform: none;
	}

	span :global(a) {
		padding: 0.5em 1em;
	}
</style>
