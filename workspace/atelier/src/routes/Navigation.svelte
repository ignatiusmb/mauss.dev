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
		<Logo animate />
	</a>

	{@render link('curated', 'books')}
	{@render link('posts', 'article')}
	{@render link('reviews', 'list-star')}

	<input type="checkbox" id="menu" aria-label="Menu" bind:checked={opened} />
	<label for="menu" aria-label="Toggle menu">
		<i data-icon="menu" role="presentation"></i>
		<i data-icon="x" role="presentation"></i>
	</label>

	<menu>
		{@render link('about', 'id-badge')}
		{@render link('uses', 'bookmark')}
		{@render link('rss.xml', 'rss')}
		{@render link('help', 'lifebuoy')}
	</menu>
</nav>

{#snippet link(path: string, icon: string)}
	{@const current = page.url.pathname.startsWith(`/${path}`) ? 'page' : null}
	<a href="/{path}" aria-label="/{path}" aria-current={current}>
		<i data-icon={icon}></i>
	</a>
{/snippet}

<style>
	nav {
		--pad: 0.5rem;
		--fg-surface: rgba(200, 200, 200, 1);

		grid-column: full-bleed;
		z-index: 3;
		position: sticky;
		top: 0;

		display: flex;
		gap: var(--pad);
		align-items: center;
		padding: calc(var(--pad) * 2) calc(var(--pad) * 3);

		background: var(--bg-base);
		color: var(--fg-surface);

		@media (min-width: 549px) {
			grid-column: content;
			padding: calc(var(--pad) * 1.5) 0;

			input,
			label[for='menu'] {
				display: none;
			}
		}

		a {
			display: flex;
			align-items: center;
			padding: var(--pad);
			border-radius: var(--pad);
			outline: 2px solid transparent;
			text-decoration: none;
			color: var(--fg-surface);

			&:hover,
			&[aria-current] {
				background: rgba(255, 255, 255, 0.1);
			}
			&:focus {
				outline-color: var(--bg-cover);
			}

			&.logo {
				width: 2.5rem;
				height: 2.5rem;
				padding: 0;
				border-radius: 50%;
			}
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
		margin-left: auto;
	}

	menu {
		list-style: none;
		visibility: hidden;
		overflow: hidden;
		width: 100%;
		max-height: 0;
		position: absolute;
		top: 100%;
		left: 0;

		display: grid;
		gap: calc((var(--pad)) * 1.5);
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));

		padding: calc(var(--pad) * 2) calc(var(--pad) * 3);
		margin: 0;
		margin-left: auto;
		border-bottom: 1px solid var(--bg-cover);
		border-radius: calc(var(--b-radius) * 2);
		box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.188);
		background-color: inherit;
		transform: translateY(-100%);
		transition: var(--t-duration) ease;

		> a::after {
			content: attr(aria-label);
			margin-left: var(--pad);

			@media (min-width: 549px) {
				content: none;
			}
		}

		@media (min-width: 549px) {
			grid-auto-flow: column;
			visibility: visible;
			overflow: unset;
			width: auto;
			max-height: initial;
			position: static;

			gap: var(--pad);
			grid-template-columns: auto;
			padding: 0;
			border: none;
			box-shadow: none;
			transform: none;
		}
	}

	i[data-icon] {
		&[data-icon='menu'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="40" y1="128" x2="216" y2="128"/><line x1="40" y1="64" x2="216" y2="64"/><line x1="40" y1="192" x2="216" y2="192"/></svg>');
		}
	}
</style>
