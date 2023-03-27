<script lang="ts">
	type Sibling = { slug: string; title: string | Record<string, any> };
	export let back: null | Sibling = null;
	export let next: null | Sibling = null;
</script>

{#if back || next}
	<footer>
		{#if back}
			<a href="/{back.slug}/" style="text-align: left">
				<strong>&larr; Prev</strong>
				{#if typeof back.title === 'string'}
					<span>{back.title}</span>
				{:else if back.title.jp}
					<span>{back.title.jp}</span>
				{:else}
					<span>{back.title.en}</span>
				{/if}
			</a>
		{/if}
		{#if next}
			<a href="/{next.slug}/" style="text-align: right">
				<strong>Next &rarr;</strong>
				{#if typeof next.title === 'string'}
					<span>{next.title}</span>
				{:else if next.title.jp}
					<span>{next.title.jp}</span>
				{:else}
					<span>{next.title.en}</span>
				{/if}
			</a>
		{/if}
	</footer>
{/if}

<style>
	footer {
		margin-top: 2em;
		display: grid;
		border-radius: 0.5em;
		border: 0.1em solid var(--fg-surface);
	}
	a {
		display: grid;
		grid-template-rows: auto 1fr;
		color: inherit;
	}
	a:nth-child(2) {
		border-top: 0.1em solid var(--fg-surface);
	}
	a:only-child {
		grid-column: 1 / -1;
	}
	a strong,
	a span {
		padding: 0.2em 0.8em;
		margin: 0;
	}
	strong {
		border-bottom: 0.1em solid var(--fg-surface);
	}

	@media only screen and (min-width: 600px) {
		footer {
			grid-template-columns: 1fr 1fr;
		}
		a:nth-child(2) {
			border-top: none;
			border-left: 0.1em solid var(--fg-surface);
		}
	}
</style>
