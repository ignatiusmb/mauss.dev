<script>
	export let status: number, error: { message: string; stack?: string };
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<section>
		<h1>{status}</h1>
		<p>{error.message}</p>
		{#if process.dev && error.stack}
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
