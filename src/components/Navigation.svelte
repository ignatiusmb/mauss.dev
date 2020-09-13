<script>
	export let mobile;
	export let scrolled = false;

	import { stores } from '@sapper/app';
	const { preloading, page } = stores();
	const sections = ['about', 'curated', 'posts', 'reviews', 'uses'];

	import { Feather, ThemeSwitcher, Link } from '@ignatiusmb/elements';
	import NavLink from '../svelte/NavLink.svelte';
	import NavGrid from './NavGrid.svelte';

	let opened = false;
	$: path = $page.path.split('/')[1];
	$: opened = $preloading ? false : opened;
	$: scrolled = mobile ? true : scrolled;
</script>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled>
	{#if mobile}
		<span on:click={() => (opened = !opened)}>
			{#if opened}
				<Feather.X />
			{:else}
				<Feather.Menu />
			{/if}
		</span>
	{/if}

	<NavLink>
		<img src="favicon.ico" alt="DevMauss" width="24" />
	</NavLink>

	{#if !mobile || opened}
		<NavGrid {mobile}>
			{#each sections as to}
				<NavLink {path} {to} hover>{to}</NavLink>
			{/each}
		</NavGrid>
	{/if}

	<Link newTab href="rss.xml" inherit>
		<Feather.Rss />
	</Link>
	<Link href="help" inherit>
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
		border-top: 0.25em solid var(--theme-primary);

		transition: var(--t-duration) var(--t-function);
		background-color: var(--bg-surface);
		font-family: var(--aqua-heading);
	}

	nav > span,
	nav > :global(a.lmns-link) {
		display: inline-flex;
	}

	nav > :global(a[href='/']:not(:first-child)) {
		padding: 0;
		margin-left: auto;
		margin-right: 1em;
	}
	nav > :global(:nth-last-child(2)) {
		margin-left: 1em;
		margin-right: 1em;
	}

	nav > :global(.lmns-theme-switcher path) {
		fill: none;
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
			border: none;
			box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
			transition: var(--t-duration) var(--t-function);
			background-color: var(--bg-surface);
		}
	}
</style>
