<script>
	export let prev = null;
	export let next = null;
</script>

{#if prev || next}
	<footer>
		{#if prev}
			<a rel="prefetch" href={prev.slug} style="text-align: left">
				<strong>&larr; Prev</strong>
				<span>{(prev.title?.jp || prev.title?.en) ?? prev.title}</span>
			</a>
		{/if}
		{#if next}
			<a rel="prefetch" href={next.slug} style="text-align: right">
				<strong>Next &rarr;</strong>
				<span>{(next.title?.jp || next.title?.en) ?? next.title}</span>
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
