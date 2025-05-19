<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';

	import { outside } from 'syv/action';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let opened = $state(false);

	afterNavigate(() => {
		opened = false;
	});
</script>

<nav
	use:outside={() => {
		opened = false;
	}}
>
	<a href="/">
		<img src="/favicon.ico" alt="Alchemauss" width="24" height="24" />
	</a>

	<input type="checkbox" id="menu" aria-label="Menu" bind:checked={opened} />
	<label for="menu">
		<i data-icon="menu"></i>
		<i data-icon="x"></i>
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
				<i data-icon="id-badge"></i>
			</a>
			<a href="/uses" aria-label="Uses page">
				<i data-icon="bookmark"></i>
			</a>
			<a href="/rss.xml" aria-label="Get RSS">
				<i data-icon="rss"></i>
			</a>
			<a href="/help" aria-label="Help page">
				<i data-icon="lifebuoy"></i>
			</a>
		</div>
	</menu>
</nav>

<style>
	nav {
		--fg-surface: rgba(200, 200, 200, 1);

		grid-column: content;
		width: 100%;
		display: flex;
		align-items: center;

		background-color: var(--bg-base);
		font-family: var(--mrq-heading);
		color: var(--fg-surface);

		a {
			z-index: 1;
			padding: 0.375rem;
			border-radius: 0.375rem;
			text-decoration: none;
			outline: 2px solid transparent;

			&:focus {
				outline-color: var(--bg-cover);
			}

			& > img {
				animation: rotate 42s linear infinite;
			}
		}
	}

	menu {
		width: 100%;
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		justify-content: end;
		padding: 0;
		margin: 0;

		a {
			color: var(--fg-surface);
			text-transform: capitalize;
		}

		.routes {
			display: grid;
			gap: 0.5rem;
			grid-auto-flow: column;
			align-items: center;

			a {
				position: relative;
				color: var(--fg-surface);

				&:hover::after {
					left: 0;
					right: auto;
					width: 100%;
				}

				&::after {
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

				&[aria-current]::after {
					width: 100%;
					background-color: var(--theme-primary);
				}
			}
		}

		.shortcuts {
			display: grid;
			gap: 0.375rem;
			grid-auto-flow: column;

			a {
				width: 100%;
				display: inline-flex;
				justify-content: center;

				&:hover {
					background: rgba(255, 255, 255, 0.1);
				}
			}
		}
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
