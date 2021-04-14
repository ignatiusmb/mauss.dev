<script context="module">
	export const load = (props) => ({ props });
</script>

<script>
	export let status, error;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<h1>{status}</h1>
	<p>{error.message}</p>
</article>

<style>
	article {
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
</style>
