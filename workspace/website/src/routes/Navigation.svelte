<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';

	import { outside } from 'syv/attachment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let opened = $state(false);

	afterNavigate(() => {
		opened = false;
	});
</script>

<nav
	{@attach outside(() => {
		opened = false;
	})}
>
	<a href="/" class="logo" aria-label="Alkamauss">
		<Logo />
	</a>

	<input type="checkbox" id="menu" aria-label="Menu" bind:checked={opened} />
	<label for="menu" aria-label="Toggle menu">
		<i data-icon="menu" role="presentation"></i>
		<i data-icon="x" role="presentation"></i>
	</label>

	<menu>
		<div class="routes">
			{#each ['curated', 'posts', 'reviews'] as to}
				{@const current = page.url.pathname.startsWith(`/${to}`)}

				<a href="/{to}" aria-current={current ? 'page' : null}>{to}</a>
			{/each}
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
		--pad: 0.375rem;
		--fg-surface: rgba(200, 200, 200, 1);

		grid-column: full-bleed;
		z-index: 3;
		width: 100%;
		position: sticky;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--pad) * 2) calc(var(--pad) * 3);

		background: var(--bg-base);
		font-family: var(--mrq-heading);
		color: var(--fg-surface);

		@media (min-width: 549px) {
			position: relative;
			grid-column: content;
			padding: 0;

			input,
			label[for='menu'] {
				display: none;
			}
		}

		a {
			z-index: 1;
			padding: var(--pad);
			border-radius: var(--pad);
			text-decoration: none;
			outline: 2px solid transparent;

			&:focus {
				outline-color: var(--bg-cover);
			}
		}
	}

	.logo {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border-radius: 50%;

		:global(svg) {
			animation: rotate 42s linear infinite;
		}
	}

	input {
		display: none;

		&:not(:checked) + label[for='menu'] > :global(:last-child),
		&:checked + label[for='menu'] > :global(:first-child) {
			display: none;
		}

		&:checked ~ menu {
			visibility: visible;
		}
	}
	label[for='menu'] {
		display: inline-flex;
		padding: var(--pad);
	}

	menu {
		--pad: 0.5rem;

		visibility: hidden;
		width: 100%;
		position: absolute;
		top: 100%;
		left: 0;

		display: grid;
		gap: var(--pad);
		padding: var(--pad);
		margin: 0;

		border-bottom: 1px solid var(--bg-cover);
		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.188);
		background-color: inherit;

		@media (min-width: 549px) {
			grid-auto-flow: column;
			visibility: visible;
			width: auto;
			position: static;

			padding: 0;
			border: none;
			box-shadow: none;
		}

		a {
			color: var(--fg-surface);
			text-transform: capitalize;
		}

		.routes {
			display: grid;
			gap: var(--pad);
			grid-auto-flow: column;
			align-items: center;

			a {
				position: relative;
				text-align: center;
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
					background: var(--theme-secondary);
					transition: width var(--t-duration) ease;
					transform: translateY(100%);
				}

				&[aria-current] {
					background: rgba(255, 255, 255, 0.1);
				}
			}

			@media (min-width: 549px) {
				a[aria-current] {
					background: inherit;

					&::after {
						width: 100%;
						background-color: var(--theme-primary);
					}
				}
			}
		}

		.shortcuts {
			display: grid;
			gap: var(--pad);
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

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
