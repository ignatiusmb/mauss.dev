<script>
	export let href = '';
	export let style = '';
	import { Link } from 'svelement';
</script>

<span on:click {style} class:empty={!href} class="text-icon">
	{#if href}
		<Link {href} invert>
			<slot />
		</Link>
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
	span > :global(a) {
		display: inline-grid;
		gap: 0.25em;
		grid-template-columns: repeat(2, auto);
		align-items: center;
	}
</style>
