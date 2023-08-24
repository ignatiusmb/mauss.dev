<script lang="ts">
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';

	import { page } from '$app/stores';
</script>

<nav>
	<a href="/">
		<img src="/favicon.ico" alt="Alchemauss" width="24" height="24" />
	</a>

	<input type="checkbox" id="menu" />
	<label for="menu">
		<Feather icon={feather.Menu} />
		<Feather icon={feather.X} />
	</label>

	<menu>
		<div class="routes">
			{#each ['about', 'curated', 'posts', 'reviews'] as to}
				{@const current = $page.url.pathname.split('/')[1] === to}

				<a href="/{to}" aria-current={current ? 'page' : null}>{to}</a>
			{/each}
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
	nav :global(a),
	nav :global(a:focus),
	nav :global(a:hover) {
		border-radius: 0.375rem;
		color: var(--fg-surface);
	}
	nav :global(a:focus),
	nav :global(a:hover) {
		/* outline: 1px solid var(--theme-primary); */
		outline: 2px solid var(--bg-cover);
		/* background: var(--bg-cover); */
	}

	nav {
		z-index: 3;
		width: 100%;
		position: sticky;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;

		transition: var(--t-duration) var(--t-function);
		background-color: var(--bg-surface);
		font-family: var(--mrq-heading);
		color: var(--fg-surface);
	}

	nav > :not(menu) {
		padding: 0.875rem;
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
		display: none;
		padding: 0;
		margin: 0;
	}
	input:checked ~ menu {
		top: 100%;
		position: absolute;
		width: 100%;
		display: grid;

		border-bottom: 1px solid var(--bg-cover);
		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;

		background-color: var(--bg-surface);
	}
	input:checked ~ menu .routes {
		display: grid;
		gap: 0.375rem;
		align-items: center;
		padding: 0.875rem 0.5rem 0;
	}
	input:checked ~ menu :global(a) {
		padding: 0.375rem;
	}
	input:checked ~ menu .shortcuts {
		display: grid;
		gap: 1em;
		grid-auto-flow: column;
		padding: 0.875rem 0.5rem 0.5rem;
	}
	input:checked ~ menu .shortcuts a {
		width: 100%;
		display: inline-flex;
		justify-content: center;
	}

	@media only screen and (min-width: 600px) {
		input,
		label[for='menu'] {
			display: none;
		}

		menu {
			width: 100%;
			display: flex;
			/* align-items: center; */
			justify-content: space-between;
		}

		.routes {
			display: grid;
			gap: 0.5em;
			grid-auto-flow: column;
			align-items: center;
		}
		.routes a[aria-current]::after {
			width: 100%;
			background-color: var(--theme-primary);
		}
		.routes a {
			position: relative;
			padding: 0.1em 0.2em;
			color: var(--fg-surface);
			text-transform: capitalize;
		}
		.routes a::after {
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
		.routes a:hover::after,
		.routes a:focus::after {
			left: 0;
			right: auto;
			width: 100%;
		}

		.shortcuts {
			display: grid;
			grid-auto-flow: column;
			align-items: center;
		}
		.shortcuts a {
			display: inline-flex;
			padding: 0.875rem 0.5rem;
		}
	}
</style>
