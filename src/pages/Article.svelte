<script>
	export let header = false;
	export let post = null;
	export let path = null;
	export let siblings = null;
	import { onMount } from 'svelte';
	import { Link, ProgressBar } from '@ignatiusmb/elements';
	import Header from './Header.svelte';
	import EditLink from '../components/EditLink.svelte';
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

<main>
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
				<EditLink {path} />
			</p>
		</section>
	{/if}

	{#if siblings}
		<Siblings {...siblings} />
	{/if}
</main>

<style>
	main {
		width: 100%;
		max-width: 53em;
		padding: 0 1em;
		margin: 0 auto;
		word-wrap: break-word;
		line-height: 1.5;
	}
	main :global(section) {
		margin-top: 2em;
		font-size: clamp(1rem, 2vw, 1.15rem);
	}
	main > :global(section:first-of-type) {
		margin-top: 4em;
	}
	section {
		padding: 0.4em 0.8em;
		border-left: 2px solid var(--theme-secondary);
		background-color: rgba(0, 0, 0, 0.05);
	}
	main :global(section > :first-child) {
		margin: 0;
	}
	main :global(section p),
	main :global(section li) {
		line-height: 2rem;
	}
	main :global(blockquote p) {
		line-height: unset;
	}

	main :global(p) {
		margin-top: 0.75em;
	}
	main :global(p code),
	main :global(ol code),
	main :global(ul code) {
		font-size: clamp(0.8rem, 2vw, 1rem);
	}
	main :global(img) {
		max-height: 42em;
		margin: auto;
		border-radius: var(--b-radius);
		text-align: center;
	}
	main :global(img[src*="://"])
	{
		border: none;
		border-radius: var(--b-radius);
		text-align: center;
	}
	main :global(h2),
	main :global(h3) {
		font-weight: bold;
		font-family: var(--aqua-heading);
	}
	main :global(h2) {
		margin-top: 1.5em;
		font-size: clamp(1.5rem, 4vw, 2rem);
	}
	main :global(h2 + h3) {
		margin-top: 0.5em;
	}
	main :global(h3) {
		margin: 1em 0 -0.25em;
		font-size: clamp(1.2rem, 4vw, 1.5rem);
	}
	main :global(ol + h3),
	main :global(ul + h3) {
		margin-top: 1.25em;
	}
	main :global(ol),
	main :global(ul) {
		padding: 0;
		padding-left: 0.5em;
		margin: 0;
		margin-top: 0.75em;
		margin-bottom: -0.5em;
	}
	main :global(ol li:not(:only-child):last-child),
	main :global(ul li:not(:only-child):last-child) {
		margin-bottom: 1em;
	}
	main :global(li) {
		margin-left: 1em;
	}
	main :global(li > ol),
	main :global(li > ul) {
		margin: 0;
	}
	main :global(blockquote) {
		line-height: 1.5;
		text-align: center;
		font-style: italic;
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		margin: clamp(0.5em, 3vw, 1.5em);
	}
	main :global(blockquote li) {
		margin-left: unset;
	}
	main :global(hr) {
		height: 0.1em;
		margin-top: 2em;
		border: 0;
		background-color: var(--fg-surface);
	}

	main :global(figure) {
		margin: 1em 0 2em;
	}
	main :global(details) {
		margin: 1em 0;
	}
	main :global(figure figcaption) {
		padding: 0.5em 0.25em 0;
		text-align: center;
		font: 80% var(--aqua-monospace);
	}
	main :global(details summary) {
		padding: 0 0.25em;
		margin-bottom: 0.5em;
		font: 90% var(--aqua-monospace);
	}
	main :global(details > div.captioned),
	main :global(figure > div.captioned) {
		position: relative;
		padding-top: 56.25%;
		border-radius: var(--b-radius);
	}
	main :global(div.captioned iframe),
	main :global(div.captioned img),
	main :global(div.captioned video) {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	main :global(div.captioned img) {
		object-fit: cover;
		border-radius: inherit;
	}
	main :global(div.captioned video) {
		border-radius: inherit;
	}

	main :global(.aqua.code-box) {
		line-height: unset;
		font-size: 0.8rem;
	}
	main :global(.aqua.code-header) {
		line-height: 1;
	}
</style>
