<script>
	export let scrolled = false;

	import { navigating, page } from '$app/stores';
	const sections = ['about', 'curated', 'posts', 'reviews', 'uses'];

	import { Feather } from 'syv/icons';
	import { Link, ThemeSwitcher } from 'syv';
	import NavLink from './NavLink.svelte';
	import NavGrid from './NavGrid.svelte';

	let innerWidth;
	let opened = false;
	$: path = $page.path.split('/')[1];
	$: opened = $navigating ? false : opened;
</script>

<svelte:window bind:innerWidth bind:scrollY={scrolled} />

<nav class:scrolled>
	<span on:click={() => (opened = !opened)}>
		{#if opened}
			<Feather.X />
		{:else}
			<Feather.Menu />
		{/if}
	</span>

	<NavLink>
		<img src="/favicon.ico" alt="Alchemauss" width="24" height="24" />
	</NavLink>

	{#if innerWidth > 600 || opened}
		<NavGrid>
			{#each sections as to}
				<NavLink {path} {to} hover>{to}</NavLink>
			{/each}
		</NavGrid>
	{/if}

	<Link inherit href="/rss.xml" label="Get RSS">
		<Feather.Rss />
	</Link>
	<Link inherit href="/help" label="See help page">
		<Feather.HelpCircle />
	</Link>
	<ThemeSwitcher let:current>
		{#if current === 'light'}
			<Feather.Sun />
		{:else if current === 'dark'}
			<Feather.Moon />
		{/if}
	</ThemeSwitcher>
</nav>

<style>
	:global(html.dark) nav :global(a),
	:global(html.dark) nav :global(a:focus),
	:global(html.dark) nav :global(a:hover) {
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
		font-family: var(--aqua-heading);
	}

	nav > span,
	nav > :global(a.syv-core-link) {
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

	nav > :global(.syv-core-theme-switcher path) {
		fill: none;
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
		nav > span:first-child {
			display: none;
		}
		nav > span:first-child + :global(a) {
			margin: 0;
		}
	}
</style>
