<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	import { date } from 'mauss';

	const { data } = $props();
</script>

<Article>
	<header>
		<h1>Alkamauss</h1>
		<span><em>by</em> <a href="/about">Ignatius Bagus.</a></span>
	</header>

	<section>
		<h2>
			<i data-icon="books"></i>
			<span>/curated</span>
		</h2>
		{#each data.curated as { slug, title, date: created }}
			<article>
				<a href="/curated/{slug}">{title}</a>
				<time datetime={created}>{date(created).format('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/curated">
			<span>All curated things</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>
			<i data-icon="article"></i>
			<span>/posts</span>
		</h2>
		{#each data.posts as { slug, title, date: created }}
			<article>
				<a href="/posts/{slug}">{title}</a>
				<time datetime={created}>{date(created).format('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/posts">
			<span>All posts</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>
			<i data-icon="list-star"></i>
			<span>/reviews</span>
		</h2>
		{#each data.reviews as { slug, title, date: created }}
			<article>
				<a href="/reviews/{slug}">{title}</a>
				<time datetime={created}>{date(created).format('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/reviews">
			<span>All reviews</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>
</Article>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 3rem;
		text-align: left;

		h1 {
			text-align: left;
			font-size: 1.875rem;
			font-weight: 600;
		}
	}

	section {
		display: grid;
		gap: 0.75rem;
		justify-items: start;

		h2 {
			display: flex;
			align-items: center;
			font-size: 1.5rem;

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
