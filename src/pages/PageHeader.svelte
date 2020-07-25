<header>
	<slot />
</header>

<style>
	header {
		width: 100%;
		max-width: 84em;
		display: grid;
		gap: 1em;
		justify-content: stretch;
		padding: 0 1em;
		margin: 2em auto;
	}
	header :global(h1) {
		margin: 0.5em 0 0;
		text-align: center;
	}
</style>
