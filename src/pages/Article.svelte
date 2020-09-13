<script>
	export let header = false;
	export let post = null;
	export let path = null;
	export let siblings = null;
	import { onMount } from 'svelte';
	import { Link, ProgressBar } from '@ignatiusmb/elements';
	import Header from './Header.svelte';
	import Edit from '../svelte/Edit.svelte';
	import Siblings from '../svelte/Siblings.svelte';

	onMount(() => {
		function offsetAnchor() {
			if (!window.location.hash.length) return;
			const offset = window.innerWidth < 600 ? 10 : 50;
			window.scrollTo(window.scrollX, window.scrollY - offset);
		}
		setTimeout(offsetAnchor, 0);

		const anchors = document.querySelectorAll('a[href*="#"]');
		const delay = () => setTimeout(offsetAnchor, 0);
		for (const hash of anchors) hash.addEventListener('click', delay);
	});
</script>

{#if header}
	<ProgressBar />
{/if}

<article>
	{#if header}
		<Header {post} {path}>
			<slot name="header" />
		</Header>
	{:else}
		<slot name="header" />
	{/if}

	<slot />

	{#if path}
		<section>
			<p>
				Find an issue with this post? Have something to add, update, or clarify? All my posts here
				are editable.
			</p>
			<p>
				Just create a new
				<Link newTab href="https://github.com/ignatiusmb/mauss/issues">Issue</Link>
				or
				<Link newTab href="https://github.com/ignatiusmb/mauss/pulls">PR</Link>
				on GitHub, any fix or addition is much appreciated!
				<Edit {path} />
			</p>
		</section>
	{/if}

	{#if siblings}
		<Siblings {...siblings} />
	{/if}
</article>

<style>
	article {
		width: 100%;
		max-width: 53em;
		padding: 0 1em;
		margin: 0 auto;
		word-wrap: break-word;
		line-height: 1.5;
	}
	article :global(section) {
		margin-top: 2em;
		font-size: clamp(1rem, 2vw, 1.15rem);
	}
	article > :global(section:first-of-type) {
		margin-top: 4em;
	}
	section {
		padding: 0.4em 0.8em;
		border-left: 2px solid var(--theme-secondary);
		background-color: rgba(0, 0, 0, 0.05);
	}
	article :global(section > :first-child) {
		margin: 0;
	}
	article :global(section p),
	article :global(section li) {
		line-height: 2rem;
	}
	article :global(blockquote p) {
		line-height: unset;
	}

	article :global(p) {
		margin-top: 0.75em;
	}
	article :global(p code),
	article :global(ol code),
	article :global(ul code) {
		font-size: clamp(0.8rem, 2vw, 1rem);
	}
	article :global(img) {
		max-height: 42em;
		margin: auto;
		border-radius: var(--b-radius);
		text-align: center;
	}
	article :global(img[src*="://"])
	{
		border: none;
		border-radius: var(--b-radius);
		text-align: center;
	}
	article :global(h2),
	article :global(h3) {
		font-weight: bold;
		font-family: var(--aqua-heading);
	}
	article :global(h2) {
		margin-top: 1.5em;
		font-size: clamp(1.5rem, 4vw, 2rem);
	}
	article :global(h2 + h3) {
		margin-top: 0.5em;
	}
	article :global(h3) {
		margin: 1em 0 -0.25em;
		font-size: clamp(1.2rem, 4vw, 1.5rem);
	}
	article :global(ol + h3),
	article :global(ul + h3) {
		margin-top: 1.25em;
	}
	article :global(ol),
	article :global(ul) {
		padding: 0;
		padding-left: 0.5em;
		margin: 0;
		margin-top: 0.75em;
		margin-bottom: -0.5em;
	}
	article :global(ol li:not(:only-child):last-child),
	article :global(ul li:not(:only-child):last-child) {
		margin-bottom: 1em;
	}
	article :global(li) {
		margin-left: 1em;
	}
	article :global(li > ol),
	article :global(li > ul) {
		margin: 0;
	}
	article :global(blockquote) {
		line-height: 1.5;
		text-align: center;
		font-style: italic;
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		margin: clamp(0.5em, 3vw, 1.5em);
	}
	article :global(blockquote li) {
		margin-left: unset;
	}
	article :global(strong) {
		font-weight: 500;
	}
	article :global(hr) {
		height: 0.1em;
		margin-top: 2em;
		border: 0;
		background-color: var(--fg-surface);
	}

	article :global(figure) {
		margin: 1em 0 2em;
	}
	article :global(details) {
		margin: 1em 0;
	}
	article :global(figure figcaption) {
		padding: 0.5em 0.25em 0;
		text-align: center;
		font: 80% var(--aqua-monospace);
	}
	article :global(details summary) {
		padding: 0 0.25em;
		margin-bottom: 0.5em;
		font: 90% var(--aqua-monospace);
	}
	article :global(details > div.captioned),
	article :global(figure > div.captioned) {
		position: relative;
		padding-top: 56.25%;
		border-radius: var(--b-radius);
	}
	article :global(div.captioned iframe),
	article :global(div.captioned img),
	article :global(div.captioned video) {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	article :global(div.captioned img) {
		object-fit: cover;
		border-radius: inherit;
	}
	article :global(div.captioned video) {
		border-radius: inherit;
	}

	article :global(.aqua.code-box) {
		line-height: unset;
		font-size: 0.8rem;
	}
	article :global(.aqua.code-header) {
		line-height: 1;
	}
</style>
