<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<article>
	<h1>{$page.status}</h1>
	{#if dev}
		<pre>{$page.error?.message}</pre>
	{/if}
</article>

<style>
	article {
		display: grid;
		gap: 1rem;
		justify-content: center;
		margin-top: auto;
		text-align: center;
	}

	h1 {
		font-family: var(--font-monospace);
		font-size: 5rem;
	}
	pre {
		text-align: left;
	}
</style>
