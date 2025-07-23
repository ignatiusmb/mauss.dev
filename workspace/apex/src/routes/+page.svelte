<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	import { date } from 'mauss';

	const { data } = $props();
	const indexes = [
		{ name: 'curated', icon: 'books' },
		{ name: 'posts', icon: 'article' },
		{ name: 'reviews', icon: 'list-star' },
	] as const;
</script>

<Article>
	<header>
		<h1>Alkamauss</h1>
		<span><em>by</em> <a href="/about">Ignatius Bagus.</a></span>
	</header>

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
</Article>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		line-height: 2;

		h1 {
			text-align: left;
			font-size: var(--size-h2);
			font-weight: 600;
		}
	}

	section {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
		line-height: 1.5;

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
