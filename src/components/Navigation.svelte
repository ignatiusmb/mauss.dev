<script>
	export let mobile;
	export let scrolled = false;

	import { stores } from '@sapper/app';
	const { preloading, page } = stores();
	const sections = ['about', 'curated', 'posts', 'reviews', 'uses'];

	import Link from '@ignatiusmb/elements/svelte/Link.svelte';
	import Icon from '@ignatiusmb/elements/svelte/Icon.svelte';
	import ThemeSwitcher from '@ignatiusmb/elements/svelte/ThemeSwitcher.svelte';
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
			<Icon name={opened ? 'close' : 'menu'} />
		</span>
	{/if}

	<NavLink>
		<img src="favicon.ico" alt="Mauss" width="24" />
	</NavLink>

	{#if !mobile || opened}
		<NavGrid {mobile}>
			{#each sections as to}
				<NavLink {path} {to} hover>{to}</NavLink>
			{/each}
		</NavGrid>
	{/if}

	<Link href="help" inherit>
		<Icon name="help" />
	</Link>
	<ThemeSwitcher />
</nav>

<style>
	:global(html.dark) nav :global(a),
	:global(html.dark) nav :global(a:focus),
	:global(html.dark) nav :global(a:hover) {
		color: var(--fg-color);
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
		border-top: 0.25em solid var(--mauss-primary);
		font-family: var(--aqua-heading);
		background-color: var(--bg-color);
		transition: var(--transition-duration) var(--transition-function);
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

	@media only screen and (min-width: 600px) {
		nav {
			top: 0;
			position: sticky;
			flex-direction: row;
			border-top: none;
		}
		nav.scrolled {
			border: none;
			box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
			transition: var(--transition-duration) var(--transition-function);
		}
	}
</style>
