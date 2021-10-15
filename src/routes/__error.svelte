<script context="module">
	export const load = (props) => ({ props });
</script>

<script>
	/** @type {number} */
	export let status;
	/** @type {Error} */
	export let error;

	import { dev } from '$app/env';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<h1>{status}</h1>
	<p>{error.message}</p>
	{#if dev}
		<pre>{error.stack}</pre>
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
