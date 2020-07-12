<script>
	export let query = '';
	export let filters = false;
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div>
	<input type="text" on:keyup bind:value={query} placeholder="Type in your search query here" />
	{#if filters}
		<span on:click={() => dispatch('filter')}>
			<Icon name="filter" />
		</span>
	{/if}
</div>

<style>
	div {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr auto;
	}
	input {
		color: var(--fg-color);
		background-color: var(--bg-color-secondary);
	}
	span {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0.7em;
		border-radius: 0.3em;
		background-color: var(--bg-color-secondary);
	}
</style>
