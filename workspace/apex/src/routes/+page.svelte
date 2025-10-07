<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	import { date } from 'mauss';
	import { write } from '$lib/prose';

	const { data } = $props();
	const indexes = [
		{ name: 'curated', icon: 'bookmarks' },
		{ name: 'posts', icon: 'feather' },
		{ name: 'reviews', icon: 'flower-lotus' },
	] as const;
</script>

<Piece>
	<header>
		<h1>Alkamauss</h1>
		<span>by <a href="/about">Ignatius Bagus.</a></span>
	</header>
	<hr />
	{#each indexes as { icon, name }}
		<section>
			<h2>
				<i data-icon={icon}></i>
				<span>/{name}</span>
			</h2>
			{#each data[name] as { slug, title, date: created }}
				<article>
					<a href="/{name}/{slug}">{title}</a>
					<time datetime={created}>{date(created).format('DD MMM YYYY')}</time>
				</article>
			{/each}
			<a href="/{name}">&rdca; see more</a>
		</section>
	{/each}
	<hr />
	<section>
		<h2>
			<i data-icon="lifebuoy"></i>
			<span>/help</span>
		</h2>
		{@html write(
			"surfing the web is like sailing the sea, and this site is my small island in the vast ocean. i know how daunting new shores can feel — that's why i've set a [safe harbor](/help) here. you'll find the [Dockside Chart](/help#index) to get your bearings and follow the paths already charted for you. if things ever feel unclear, you can always return to the harbor and consult the chart.",
		)}
	</section>
</Piece>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		line-height: 2;
		font-size: var(--size-base);

		h1 {
			text-align: left;
			font-size: var(--size-h2);
			font-weight: 500;
		}
		span {
			color: var(--color-text-muted);
		}
	}

	section {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
		line-height: 1.5;
		font-size: var(--size-base);

		h2 {
			--size: var(--size-h3);
			display: flex;
			align-items: center;

			i[data-icon] {
				margin-right: 0.5rem;
			}
		}
		article {
			width: 100%;
			display: flex;
			gap: 1rem;
			justify-content: space-between;

			time {
				text-wrap: nowrap;
			}
		}
	}
</style>
