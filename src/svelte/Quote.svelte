<script>
	export let author;
</script>

<blockquote>
	<slot />
	<small>&mdash;{author}</small>
</blockquote>

<style>
	blockquote {
		width: calc(100% - 2em);
		position: relative;
		padding: 0.5em 1em 0.75em;
		border: 0.25em solid;
		border-left: none;
		border-image-slice: 1;
		border-image-source: linear-gradient(-45deg, crimson, transparent);
		margin: 1em;
		text-align: justify;
		font-size: 1.25rem;
	}
	blockquote small {
		position: absolute;
		right: -1.5em;
		bottom: -0.125em;
		padding: 0.5em;
		transform: translateY(50%);
		background-color: var(--bg-color);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.5rem;
		font-size: inherit;
		font-weight: 500;
	}
	blockquote > :global(.from) {
		text-align: right;
	}
	blockquote > :global(:first-child) {
		margin: 0;
	}
</style>
