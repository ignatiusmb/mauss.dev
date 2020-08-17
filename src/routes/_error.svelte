<script>
	export let status, error;
	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<section>
		<h1>{status}</h1>
		<p>{error.message}</p>
		{#if dev && error.stack}
			<pre>{error.stack}</pre>
		{/if}
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
	pre {
		display: flex;
		justify-content: center;
		margin-top: 1em;
		text-align: left;
	}
</style>
