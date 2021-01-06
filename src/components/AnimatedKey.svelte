<script>
	export let items, component;
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	const duration = 100;
</script>

{#each items as post (post.slug)}
	<div animate:flip={{ duration }} transition:scale={{ duration }}>
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
</style>
