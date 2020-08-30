<script>
	export let itemSize = '12em';
</script>

<div class="grid-view">
	<slot name="header" />

	<main style="grid-template-columns: repeat(auto-fill, minmax({itemSize}, 1fr))">
		<slot />
	</main>
</div>

<style>
	div {
		width: 100%;
		display: grid;
		gap: 2em;
		grid-template-columns: minmax(0, 1fr);
		padding: 0 1em;
		margin: 3em auto 2em;
	}
	div > :global(header),
	div main {
		max-width: 86em;
		width: 100%;
		display: grid;
		gap: 1em;
		margin: 0 auto;
	}

	main > :global(div) {
		transition: var(--t-duration);
	}
	main > :global(div:hover) {
		transform: translateY(-0.15em);
	}
	main :global(img:not([src])) {
		display: none;
	}
</style>
