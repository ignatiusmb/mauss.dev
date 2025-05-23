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
		{@render link('curated', 'books')}
		{@render link('posts', 'article')}
		{@render link('reviews', 'list-star')}
		{@render link('about', 'id-badge')}
		{@render link('uses', 'bookmark')}
		{@render link('rss.xml', 'rss')}
		{@render link('help', 'lifebuoy')}
	</menu>
</nav>

{#snippet link(path: string, icon: string)}
	<a
		href="/{path}"
		aria-label="/{path}"
		aria-current={page.url.pathname.startsWith(`/${path}`) ? 'page' : null}
	>
		<i data-icon={icon}></i>
	</a>
{/snippet}

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
			max-height: 80vh;
			transform: translateY(0);
		}
	}
	label[for='menu'] {
		display: inline-flex;
		padding: var(--pad);
	}

	menu {
		--pad: 0.5rem;

		visibility: hidden;
		overflow: hidden;
		width: 100%;
		max-height: 0;
		position: absolute;
		top: 100%;
		left: 0;

		display: grid;
		gap: var(--pad);
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));

		padding: var(--pad);
		margin: 0;
		border-bottom: 1px solid var(--bg-cover);
		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.188);
		background-color: inherit;
		transform: translateY(-100%);
		transition: var(--t-duration) ease;

		a {
			display: flex;
			align-items: center;
			color: var(--fg-surface);

			&::after {
				content: attr(aria-label);
				margin-left: var(--pad);
			}

			&:hover,
			&[aria-current] {
				background: rgba(255, 255, 255, 0.1);
			}
		}

		@media (min-width: 549px) {
			grid-auto-flow: column;
			visibility: visible;
			overflow: unset;
			width: auto;
			max-height: initial;
			position: static;

			grid-template-columns: auto;
			padding: 0;
			border: none;
			box-shadow: none;
			transform: none;

			a::after {
				content: none;
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
