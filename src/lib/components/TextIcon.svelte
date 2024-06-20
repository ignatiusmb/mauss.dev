<script lang="ts">
	interface Props {
		href: string;
		style: string;
		children: import('svelte').Snippet;
	}
	const { href = '', style = '', children }: Props = $props();

	import Link from '$lib/components/Link.svelte';
</script>

<span {style} class:empty={!href} class="text-icon">
	{#if href}
		<Link {href}>{@render children()}</Link>
	{:else}
		{@render children()}
	{/if}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;

		&.empty > :global(:not(:first-child)) {
			margin-left: 0.25rem;
		}
	}
</style>
