<script>
	export let opened;
</script>

<div class:opened>
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

	@media only screen and (max-width: 599px) {
		div {
			width: 100%;
			position: absolute;
			top: 1px;
			right: 0;

			gap: 1em;
			grid-auto-flow: row;
			padding: 1em;
			margin: 0;
			border-top: 0.25em solid var(--theme-primary);

			transform: translateY(-100%) translateX(100%);
			background-color: var(--bg-surface);
			text-align: center;
		}
		div.opened {
			display: grid;
			transform: translateY(-100%) translateX(0%);
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
