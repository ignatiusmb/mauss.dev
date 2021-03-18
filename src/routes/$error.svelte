<script>
	export let status, error;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<section>
		<h1>{status}</h1>
		<p>{error.message}</p>
	</section>
</article>

<style>
	article {
		margin-top: auto;
	}
	section:first-of-type {
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
