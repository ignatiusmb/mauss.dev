<script>
	import { page } from '$app/state';
</script>

<article>
	<h1>{page.status}</h1>
	<pre>{page.error?.message}</pre>

	{#if page.params.slug}
		{@const [, parent] = page.url.pathname.split('/')}
		{@const search = `/${parent}?q=${page.params.slug}`}
		<p>Try <a href={search}>{search}</a>.</p>
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
		font-size: 5rem;
	}
	pre {
		white-space: pre-wrap;
		text-align: center;
	}
</style>
