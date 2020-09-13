<script>
	export let view = 'grid';
	export let itemSize = '12em';
</script>

<div class="layout-wrapper">
	<div class="header-wrapper">
		<slot name="header" />

		<div class="aside-wrapper">
			<slot name="picker" />
		</div>
	</div>

	<main class:grid={view === 'grid'} style="--grid-minval: {itemSize}">
		<slot />
	</main>
</div>

<style>
	.layout-wrapper {
		width: 100%;
		display: grid;
		gap: 4em;
		grid-template-columns: minmax(0, 1fr);
		padding: 0 1em;
		margin: 3em auto 2em;
		transition: var(--t-duration);
	}

	.layout-wrapper > main,
	.layout-wrapper > .header-wrapper {
		max-width: 86em;
		width: 100%;
		position: relative;
		margin: 0 auto;
	}
	.layout-wrapper main.grid,
	.header-wrapper > :global(header) {
		display: grid;
		gap: 1em;
	}
	.layout-wrapper main.grid {
		grid-template-columns: repeat(auto-fill, minmax(var(--grid-minval), 1fr));
	}
	.header-wrapper > .aside-wrapper {
		width: 100%;
		position: absolute;
		transform: translateY(calc(2em - 50%));
	}
	.aside-wrapper > :global(aside) {
		display: grid;
		gap: 1em;
		grid-auto-flow: column;
	}
	.aside-wrapper :global(button) {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 0.5em;
		border: 0;
		border-radius: var(--b-radius);
		transition: var(--t-duration);

		color: var(--fg-surface);
		background-color: var(--bg-overlay);
	}
	.aside-wrapper :global(button:hover) {
		filter: brightness(1.2);
	}

	main :global(img:not([src])) {
		display: none;
	}
	main.grid > :global(div:hover) {
		transform: translateY(-0.15em);
	}

	@media only screen and (min-width: 480px) {
		.header-wrapper > .aside-wrapper {
			width: unset;
			right: 0;
		}
	}
</style>
