<script>
	export let mobile;
	export let scrolled = false;
	import Icon from '../svelte/Icon.svelte';
	import Link from '../svelte/Link.svelte';
	import NavLink from '../svelte/NavLink.svelte';
	import ToggleTheme from '../svelte/ToggleTheme.svelte';
	import NavGrid from './NavGrid.svelte';

	import { stores } from '@sapper/app';
	const { preloading } = stores();
	$: opened = $preloading ? false : opened;
	$: scrolled = mobile ? true : scrolled;
</script>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled>
	{#if mobile}
		<span on:click={() => (opened = !opened)} style="cursor:pointer">
			<Icon name={opened ? 'close' : 'menu'} />
		</span>
	{/if}

	<NavLink>
		<img src="favicon.ico" alt="Mauss" width="24" />
	</NavLink>

	{#if !mobile || opened}
		<NavGrid {mobile}>
			<NavLink hover to="about">about</NavLink>
			<NavLink hover to="curated">curated</NavLink>
			<NavLink hover to="posts">posts</NavLink>
			<NavLink hover to="reviews">reviews</NavLink>
			<NavLink hover to="uses">uses</NavLink>
		</NavGrid>
	{/if}

	<Link href="help" inherit>
		<Icon name="help" />
	</Link>
	<ToggleTheme />
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
