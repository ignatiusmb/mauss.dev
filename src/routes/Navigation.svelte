<script lang="ts">
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
	import NavGrid from './NavGrid.svelte';
	import NavLink from './NavLink.svelte';
	import { navigating, page } from '$app/stores';

	export let scrolled = 0;

	let innerWidth: number;
	let opened = false;
	$: path = $page.url.pathname.split('/')[1];
	$: opened = $navigating ? false : opened;
</script>

<svelte:window bind:innerWidth bind:scrollY={scrolled} />

<nav class:scrolled>
	<button on:click={() => (opened = !opened)}>
		{#if opened}
			<Feather icon={feather.X} />
		{:else}
			<Feather icon={feather.Menu} />
		{/if}
	</button>

	<NavLink>
		<img src="/favicon.ico" alt="Alchemauss" width="24" height="24" />
	</NavLink>

	{#if innerWidth > 600 || opened}
		<NavGrid>
			{#each ['about', 'curated', 'posts', 'reviews'] as to}
				<NavLink {path} {to} hover>{to}</NavLink>
			{/each}
		</NavGrid>
	{/if}

	<a href="/uses" aria-label="Uses page">
		<Feather icon={feather.Bookmark} />
	</a>
	<a href="/rss.xml" aria-label="Get RSS">
		<Feather icon={feather.Rss} />
	</a>
	<a href="/help/" aria-label="See help page">
		<Feather icon={feather.HelpCircle} />
	</a>
</nav>

<style>
	nav :global(a),
	nav :global(a:focus),
	nav :global(a:hover) {
		color: var(--fg-surface);
	}

	nav {
		z-index: 3;
		width: 100%;
		position: fixed;
		bottom: 0;

		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding: 0.8em 1em;

		transition: var(--t-duration) var(--t-function);
		background-color: var(--bg-surface);
		font-family: var(--mrq-heading);
	}

	nav > button,
	nav > :global(a) {
		display: inline-flex;
	}

	nav > :global(a:first-of-type) {
		padding: 0;
		margin-left: auto;
		margin-right: 1em;
	}
	nav > :global(:nth-last-child(2)) {
		margin-left: 1em;
		margin-right: 1em;
	}

	@media only screen and (max-width: 599px) {
		nav {
			border-top: 0.25em solid var(--theme-primary);
			box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
			transition: var(--t-duration) var(--t-function);
			background-color: var(--bg-surface);
		}
	}
	@media only screen and (min-width: 600px) {
		nav {
			position: sticky;
			top: 0;
			flex-direction: row;
			border-top: none;
			background-color: var(--bg-base);
		}
		nav.scrolled {
			box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
			transition: var(--t-duration) var(--t-function);
			background-color: var(--bg-surface);
		}
		nav > button:first-child {
			display: none;
		}
		nav > button:first-child + :global(a) {
			margin: 0;
		}
	}
</style>
