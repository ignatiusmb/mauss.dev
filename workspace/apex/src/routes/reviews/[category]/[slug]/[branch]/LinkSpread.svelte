<script lang="ts">
	interface Props {
		links: Record<string, string | string[]>;
	}
	const { links }: Props = $props();
</script>

<small>
	<span>[</span>
	{#each Object.entries(links) as [key, link], idx}
		{#if idx !== 0}<span class="dash">—</span>{/if}

		{#each typeof link === 'string' ? [link] : link as href, v}
			{@const indexed = typeof link !== 'string' ? ` (${v + 1})` : ''}

			{#if v !== 0}<span class="dash">—</span>{/if}
			<a {href}>{key}{indexed}</a>
		{/each}
	{/each}
	<span>]</span>
</small>

<style>
	small {
		display: flex;
		gap: 0.25rem;
	}
</style>
