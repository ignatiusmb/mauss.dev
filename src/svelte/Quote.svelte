<script>
	export let author;
	import { GradientBorder } from '@ignatiusmb/elements';
</script>

<blockquote>
	<slot />
	<small on:click>
		<GradientBorder>&mdash;{author}</GradientBorder>
	</small>
</blockquote>

<style>
	blockquote {
		width: calc(100% - 2em);
		position: relative;
		padding: 0.5em 1em 0.75em;
		border: 0.25em solid;
		border-left: none;
		border-image-slice: 1;
		border-image-source: linear-gradient(-45deg, rgba(var(--theme-secondary, 1)), transparent);
		margin: 1em;
		text-align: justify;
		font-size: 1.25rem;
	}
	blockquote small {
		cursor: pointer;
		user-select: none;
		position: absolute;
		right: -1.5em;
		bottom: -0.125em;
		padding: 0.5em;
		transform: translateY(50%);
		background-color: rgba(var(--bg-color, 1));
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
