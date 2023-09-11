<script>
	let className = '';
	export { className as class };
	export let itemSize = '12rem';
	export let header = false;

	let view = 'grid';
</script>

<div class="{className} layout-wrapper">
	{#if header}
		<header>
			<slot name="header" />

			<aside>
				<slot name="picker" />
			</aside>
		</header>
	{/if}

	<main
		class:flex={view === 'flex'}
		class:grid={view === 'grid'}
		class:column={view === 'column'}
		class:scrollsnap={view === 'scrollsnap'}
		style="--grid-minval: {itemSize}"
	>
		<slot {view} />
	</main>
</div>

<style>
	.layout-wrapper {
		width: 100%;
		display: grid;
		gap: 4rem;
		grid-template-columns: minmax(0, 1fr);
		padding: 0 1rem;
		margin: 3rem auto 2rem;
		transition: var(--t-duration);
	}

	.layout-wrapper > main,
	.layout-wrapper > header {
		max-width: 86rem;
		width: 100%;
		position: relative;
		margin: 0 auto;
	}
	header {
		display: grid;
		gap: 1rem;
	}
	header :global(h1) {
		text-align: center;
	}
	header :global(.syv-core-pagination) {
		max-width: 32rem;
	}
	header :global(.syv-core-search-bar) {
		border-radius: var(--b-radius);
	}
	aside {
		width: 100%;
		position: absolute;
		display: grid;
		gap: 1rem;
		grid-auto-flow: column;
		transform: translateY(calc(2rem - 50%));
	}
	aside :global(button) {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 0.5rem;
		border: 0;
		border-radius: var(--b-radius);
		transition: var(--t-duration);

		color: var(--fg-surface);
		background-color: var(--bg-overlay);
	}
	aside :global(button:hover) {
		filter: brightness(1.2);
	}

	main :global(img[src='']),
	main :global(img:not([src])) {
		display: none;
	}
	main :global(h2[slot='empty']) {
		grid-column: 1 / -1;
		text-align: center;
	}
	/* View Specific */
	main.flex {
		display: flex;
	}
	main.grid,
	main.column {
		display: grid;
		gap: 1rem;
		transition: var(--t-duration);
	}
	main.grid {
		grid-template-columns: repeat(auto-fill, minmax(var(--grid-minval), 1fr));
	}
	main.grid > :global(section:hover) {
		transform: translateY(-0.15rem);
	}
	main.grid > :global(section) {
		transition: var(--t-duration);
	}
	main.column {
		grid-template-columns: minmax(0, 1fr);
	}
	main.scrollsnap {
		scrollbar-width: none;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;

		display: grid;
		gap: calc(2rem + 1vw);
		grid-auto-flow: column;
		grid-auto-columns: 12rem;
		padding: 1rem 0;

		mask: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000 10%, #000 90%, rgba(0, 0, 0, 0) 100%);
	}
	main.scrollsnap::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}
	main.scrollsnap::-webkit-scrollbar-thumb {
		background: #201c29;
		border-radius: 0.5rem;
		box-shadow:
			inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
			inset -2px -2px 2px rgba(0, 0, 0, 0.25);
	}

	main.scrollsnap::-webkit-scrollbar-track {
		background: linear-gradient(90deg, #201c29, #201c29 1px, #17141d 0, #17141d);
	}
	main.scrollsnap > :global(section) {
		scroll-snap-align: center;
		transition: var(--t-duration);
	}

	@media only screen and (min-width: 480px) {
		header > aside {
			width: unset;
			right: 0;
		}
	}
	@media only screen and (min-width: 600px) {
		main.scrollsnap:hover > :global(section) {
			opacity: 0.6;
			filter: blur(0.1rem);
		}
		main.scrollsnap:hover > :global(section:hover) {
			opacity: 1;
			filter: blur(0);
		}
	}
</style>
