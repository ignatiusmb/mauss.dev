<script>
	import { slide } from 'svelte/transition';
	import { TIME } from 'syv/options';
</script>

<div transition:slide={{ duration: TIME.SLIDE }}>
	<slot />
</div>

<style>
	div {
		display: grid;
		gap: 0.5em;
		grid-auto-flow: column;
		margin-left: 1em;
		margin-right: auto;
	}

	@media only screen and (max-width: 599px) {
		div {
			width: 100%;
			position: absolute;
			right: 0;
			bottom: 100%;

			gap: 1em;
			grid-auto-flow: row;
			padding: 1em;
			margin: 0;
			border-top: 0.25em solid var(--theme-primary);

			background-color: var(--bg-surface);
			text-align: center;
		}
		div > :global(a) {
			width: 100%;
			padding: 0.5em 0;
		}
		div > :global(a::after) {
			content: none !important;
		}
		div > :global(a[aria-current]) {
			border: 0.15em solid var(--theme-primary);
			border-radius: var(--b-radius);
		}
	}
</style>
