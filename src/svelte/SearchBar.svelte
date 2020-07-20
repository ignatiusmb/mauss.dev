<script>
	export let query = '';
	export let filters = null;
	export let unique = {};

	import Icon from './Icon.svelte';
	import { slide } from 'svelte/transition';

	let show = false;
</script>

<div>
	<header>
		<input type="text" on:keyup bind:value={query} placeholder="Type in your search query here" />
		{#if filters}
			<span on:click={() => (show = !show)}>
				<Icon name="filter" />
			</span>
		{/if}
	</header>

	{#if filters && show}
		<aside transition:slide={{ duration: 100 }}>
			{#each Object.keys(unique) as key}
				<section>
					<h3>{key}</h3>
					{#each unique[key] as value}
						<label>
							<input type="checkbox" bind:group={filters[key]} {value} />
							<span>{value}</span>
						</label>
					{/each}
				</section>
			{/each}

			<slot />
		</aside>
	{/if}
</div>

<style>
	div {
		display: grid;
		gap: 0.5em;
	}

	/* SearchBar */
	header {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr auto;
	}
	header input {
		color: var(--fg-color);
		background-color: var(--bg-color-secondary);
	}
	header span {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0.7em;
		border-radius: 0.3em;
		background-color: var(--bg-color-secondary);
	}

	/* FilterGrid */
	aside {
		width: 100%;
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
	}
	aside :global(h3),
	aside :global(label span) {
		text-transform: capitalize;
	}
	aside :global(input) {
		display: none;
	}
	aside :global(section) {
		overflow-y: auto;
		max-height: 20em;
		display: flex;
		flex-direction: column;
	}
	aside :global(section h3) {
		position: sticky;
		top: 0;
		padding: 0.5em 0.25em;
		border-bottom: 1px solid var(--fg-color);
		margin-bottom: 0.5em;
		background-color: var(--bg-color);
	}
	aside :global(section label) {
		cursor: pointer;
		padding: 0.5em 0.25em;
	}
	aside :global(section label span) {
		color: var(--fg-secondary-color);
	}
	aside :global(section input:checked + span) {
		color: var(--fg-color);
	}
	aside :global(section input:checked + span::after) {
		content: '✔';
		margin-left: 0.5em;
	}
</style>
