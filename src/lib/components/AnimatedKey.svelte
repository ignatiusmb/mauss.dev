<script>
	export let items, component;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { duration } from 'syv/options';
</script>

{#each items as post (post.slug)}
	<div animate:flip={{ duration }} transition:scale|local={{ duration }}>
		{#if component}
			<svelte:component this={component} {post} />
		{:else}
			<slot {post} />
		{/if}
	</div>
{:else}
	<slot name="empty" />
{/each}

<style>
	div {
		display: grid;
	}
	div:not(.empty) {
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
</style>
