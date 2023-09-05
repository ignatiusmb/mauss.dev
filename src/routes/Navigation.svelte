<script lang="ts">
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
	import Divider from '$lib/components/Divider.svelte';

	import { click } from 'syv/action';
	import { page } from '$app/stores';

	let opened = false;
</script>

<nav
	use:click.outside={() => {
		opened = false;
	}}
>
	<a href="/">
		<img src="/favicon.ico" alt="Alchemauss" width="24" height="24" />
	</a>

	<input type="checkbox" id="menu" bind:checked={opened} />
	<label for="menu">
		<Feather icon={feather.Menu} />
		<Feather icon={feather.X} />
	</label>

	<menu>
		<div class="routes">
			{#each ['about', 'curated', 'posts', 'reviews'] as to}
				{@const current = $page.url.pathname.startsWith(`/${to}`)}

				<a href="/{to}" aria-current={current ? 'page' : null}>{to}</a>
			{/each}

			<Divider type="horizontal" />
		</div>

		<div class="shortcuts">
			<a href="/uses" aria-label="Uses page">
				<Feather icon={feather.Bookmark} />
			</a>
			<a href="/rss.xml" aria-label="Get RSS">
				<Feather icon={feather.Rss} />
			</a>
			<a href="/help/" aria-label="See help page">
				<Feather icon={feather.HelpCircle} />
			</a>
		</div>
	</menu>
</nav>

<style>
	nav {
		z-index: 3;
		width: 100%;
		position: sticky;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;

		background-color: var(--bg-surface);
		font-family: var(--mrq-heading);
		color: var(--fg-surface);
	}
	a {
		outline: 2px solid transparent;
		transition-duration: var(--t-duration);
	}
	nav a:focus {
		outline-color: var(--bg-cover);
	}
	nav > a:first-child {
		flex-shrink: 0;
		border-radius: 0.875rem;
		outline-offset: -0.5rem;
	}
	nav > :not(menu) {
		padding: 1rem 0.875rem;
	}

	input {
		visibility: hidden;
		width: auto;
	}
	label[for='menu'] {
		display: inline-flex;
	}
	input:not(:checked) + label[for='menu'] > :global(:last-child),
	input:checked + label[for='menu'] > :global(:first-child) {
		display: none;
	}

	menu {
		visibility: hidden;
		z-index: 2;
		top: 0;
		position: absolute;
		width: 100%;
		display: grid;

		padding: 0;
		margin: 0;
		border-bottom: 1px solid var(--bg-cover);
		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.188);

		background-color: var(--bg-surface);
		/* TODO: reenable transition */
		/* transition-duration: calc(var(--t-duration) * 2); */
		transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		/* transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); */
		transform: translate3d(0, -100%, 0) scale3d(0.9, 0.9, 1);
	}
	input:checked ~ menu {
		visibility: visible;
		top: 100%;
		transform: none;
	}
	menu a {
		padding: 0.375rem;
		border-radius: 0.375rem;
		color: var(--fg-surface);
		text-transform: capitalize;
	}
	menu .routes {
		display: grid;
		gap: 0.375rem;
		align-items: center;
		padding: 0 0.5rem;
	}
	menu .shortcuts {
		display: grid;
		gap: 1em;
		grid-auto-flow: column;
		padding: 0.5rem;
	}
	menu .shortcuts a {
		width: 100%;
		display: inline-flex;
		justify-content: center;
	}

	/* change to 600 when there's more routes */
	@media only screen and (min-width: 500px) {
		input,
		label[for='menu'] {
			display: none;
		}

		input:checked ~ menu,
		menu {
			visibility: unset;
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-between;

			border-bottom: none;
			box-shadow: none;
			transform: none;
		}

		menu .routes {
			display: grid;
			gap: 0.5em;
			grid-auto-flow: column;
			align-items: center;
		}
		menu .routes a[aria-current]::after {
			width: 100%;
			background-color: var(--theme-primary);
		}
		menu .routes a {
			position: relative;
			color: var(--fg-surface);
		}
		menu .routes a::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			width: 0;
			height: 0.15em;
			border-radius: 0.25em;
			background-color: var(--theme-secondary);
			transition: width var(--t-duration) ease;
			transform: translateY(100%);
		}
		menu .routes a:hover::after,
		menu .routes a:focus::after {
			left: 0;
			right: auto;
			width: 100%;
		}

		menu .shortcuts {
			gap: 0.375rem;
		}
	}
</style>
