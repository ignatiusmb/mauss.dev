<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import { date } from 'mauss';

	const { data } = $props();
	const indexes = [
		{ name: 'curated', icon: 'bookmarks' },
		{ name: 'posts', icon: 'feather' },
		{ name: 'reviews', icon: 'flower-lotus' },
	] as const;
</script>

<Article>
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
			<a href="/{name}">
				<span>see more</span>
				<i data-icon="arrow-circle-right"></i>
			</a>
		</section>
	{/each}
	<hr />
	<section>
		<h2>
			<i data-icon="lifebuoy"></i>
			<span>/help</span>
		</h2>
		<div>
			<!-- prettier-ignore -->
			<p style:margin-top="0">surfing the web is like sailing the sea, and this site is a small island in the vast ocean of the internet. foreign shores can feel intimidating at first — that's where the <a href="/help">safe harbor</a> comes in. think of it as the island's guild hall, the place you step into after docking, where you'll find the <strong>Dockside Chart</strong> to help you get your bearings and see every path laid out. if you ever feel a bit lost, you can always return to the harbor and consult the chart.</p>
			<!-- prettier-ignore -->
			<p>this may be the <em>landing</em> page, but much like a real harbor, it's not meant to overwhelm you with everything at once. if you're like me and prefer to orient yourself first, you know where to look. if you'd rather set off right away, the island is open for you to wander and discover at your own pace.</p>
		</div>
	</section>
</Article>

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
		> a {
			display: flex;
			align-items: center;

			i[data-icon] {
				height: 1.25rem;
				width: 1.25rem;
				margin-left: 0.5rem;
				transition: transform var(--transition-base) ease-in-out;
			}

			&:hover i[data-icon] {
				transform: translateX(0.25rem);
			}
			&:focus-visible i[data-icon] {
				transform: scale(1.1);
			}
		}
	}
</style>
