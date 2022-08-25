<script>
	import { dev } from '$app/env';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<article>
	<h1>{$page.status}</h1>
	<p>{$page.error?.message}</p>
	{#if dev}
		<pre>{$page.error?.stack}</pre>
	{/if}
</article>

<style>
	article {
		display: grid;
		gap: 1em;
		justify-content: center;
		margin-top: auto;
		text-align: center;
	}

	h1 {
		font-family: var(--aqua-monospace);
		font-size: 5em;
	}
	p {
		font-size: 2em;
	}
	pre {
		text-align: left;
	}
</style>
