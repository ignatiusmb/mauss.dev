<script>
	export let mobile;
	import { slide } from 'svelte/transition';
</script>

<div class:mobile transition:slide={{ duration: 100 }}>
	<slot />
</div>

<style>
	div {
		display: grid;
		gap: 0.5em;
		grid-auto-flow: column;
		margin-left: 1em;
		margin-right: auto;
		transition: var(--t-duration);
	}
	div.mobile {
		width: 100%;
		position: absolute;
		top: 1px;
		right: 0;
		gap: 1em;
		grid-auto-flow: row;
		padding: 1em;
		margin: 0;
		border-top: 0.25em solid rgba(var(--theme-primary), 1);
		transform: translateY(-100%);
		background-color: rgba(var(--bg-color, 1));
		text-align: center;
	}
	div.mobile :global(a) {
		width: 100%;
		padding: 0.5em 0;
	}
	div.mobile :global(a::after) {
		content: none;
	}
	div.mobile :global(a[aria-current]) {
		border: 0.15em solid rgba(var(--theme-primary), 1);
		border-radius: 0.25em;
	}
</style>
