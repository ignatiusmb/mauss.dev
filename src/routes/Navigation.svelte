<script lang="ts">
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
	import Divider from '$lib/components/Divider.svelte';

	import { click } from 'syv/action';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let opened = false;

	afterNavigate(() => {
		opened = false;
	});
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
			{#each ['curated', 'posts', 'reviews'] as to}
				{@const current = $page.url.pathname.startsWith(`/${to}`)}

				<a href="/{to}" aria-current={current ? 'page' : null}>{to}</a>
			{/each}

			<Divider type="horizontal" />
		</div>

		<div class="shortcuts">
			<a href="/about" aria-label="Profile">
				<Feather icon={feather.User} />
			</a>
			<a href="/uses" aria-label="Uses page">
				<Feather icon={feather.Bookmark} />
			</a>
			<a href="/rss.xml" aria-label="Get RSS">
				<Feather icon={feather.Rss} />
			</a>
			<a href="/help" aria-label="Help page">
				<Feather icon={feather.HelpCircle} />
			</a>
		</div>
	</menu>
</nav>

<style>
	nav {
		--fg-surface: rgba(200, 200, 200, 1);

		width: 100%;
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem;

		background-color: var(--bg-base);
		font-family: var(--mrq-heading);
		color: var(--fg-surface);
	}
	a {
		border-bottom: none;
		outline: 2px solid transparent;
	}
	a > img {
		animation: rotate 42s linear infinite;
	}
	a:focus {
		outline-color: var(--bg-cover);
	}

	nav > a:first-child {
		flex-shrink: 0;
		/* height: 24px; */
		display: flex;
		padding: 0.25rem;
		margin: 0 0.5rem;
		border-radius: 1rem;
	}

	menu {
		width: 100%;
		display: flex;
		justify-content: end;
		padding: 0;
		margin: 0;
	}
	menu a {
		padding: 0.375rem;
		border-radius: 0.375rem;
		color: var(--fg-surface);
		text-transform: capitalize;
	}
	menu .routes {
		display: grid;
		gap: 0.5rem;
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
		height: 0.15rem;
		border-radius: 0.25rem;
		background-color: var(--theme-secondary);
		transition: width var(--t-duration) ease;
		transform: translateY(100%);
	}
	menu .routes a:hover::after {
		left: 0;
		right: auto;
		width: 100%;
	}
	menu .shortcuts {
		display: grid;
		gap: 0.375rem;
		grid-auto-flow: column;
		padding: 0.5rem;
	}
	menu .shortcuts a {
		width: 100%;
		display: inline-flex;
		justify-content: center;
	}
	menu .shortcuts a:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	@media only screen and (min-width: 500px) {
		input,
		label[for='menu'] {
			display: none;
		}
		nav > a:first-child {
			position: fixed;
		}
		menu .routes > :global(:last-child) {
			display: none;
		}
	}
	/* change to 599 when there's more routes */
	@media only screen and (max-width: 499px) {
		label[for='menu'] {
			display: inline-flex;
			padding: 1rem 0.875rem;
		}
		input:not(:checked) + label[for='menu'] > :global(:last-child),
		input:checked + label[for='menu'] > :global(:first-child) {
			display: none;
		}

		nav {
			z-index: 3;
			position: sticky;
			top: 0;
			justify-content: space-between;
		}
		input {
			visibility: hidden;
			width: auto;
		}

		menu {
			visibility: hidden;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			display: grid;
			justify-content: initial;

			border-bottom: 1px solid var(--bg-cover);
			border-bottom-right-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
			box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.188);

			background-color: inherit;
			/* transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); */
			/* transform: translate3d(0, -100%, 0) scale3d(0.9, 0.9, 1); */
		}
		input:checked ~ menu {
			visibility: visible;
			transform: none;
		}

		menu .routes,
		menu .shortcuts {
			width: 100%;
			display: grid;
			gap: 0.375rem;
		}
		menu .routes {
			grid-auto-flow: row;
			padding: 0 0.5rem;
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
