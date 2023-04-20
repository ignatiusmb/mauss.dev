<script>
	export let href = '';
	export let style = '';
	import Link from '$lib/components/Link.svelte';
</script>

<span {style} class:empty={!href} class="text-icon">
	{#if href}
		<Link {href}><slot /></Link>
	{:else}
		<slot />
	{/if}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
	}
	span.empty > :global(:not(:first-child)) {
		margin-left: 0.25em;
	}
</style>
