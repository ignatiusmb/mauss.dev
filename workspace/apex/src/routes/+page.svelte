<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	import { format } from 'mauss/date';

	const { data } = $props();
</script>

<Article>
	<header>
		<h1>Ignatius Bagus.</h1>
		<span><em>Software Alchemist</em> — code and prose, perfectly distilled</span>
	</header>

	<!-- prettier-ignore -->
	<p><a href="/about#expertise">Independent software engineer</a> based in Southeast Asia (GMT+7&ndash;8), <a href="https://github.com/ignatiusmb" target="_blank">building in public</a> — <a href="/atelier">mostly open source</a>. I also take on consulting and freelance projects, tailored for you if you're looking for something custom, focused, and private. If that resonates, feel free to reach out through one of <a href="/about#elsewhere">my socials</a>.</p>
	<!-- prettier-ignore -->
	<p>I tend to build quietly and write to make sense of it all. It's a way for me to process lessons, share discoveries, and explore new ideas. If you're curious, the <a href="/help">help page</a> is the dedicated page to get you started — or jump straight to any of the links below.</p>

	<section>
		<h2>
			<i data-icon="article"></i>
			<span>/posts</span>
		</h2>
		{#each data.posts as { slug, title, date }}
			<article>
				<a href="/posts/{slug}">{title}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/posts">
			<span>All posts</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>
			<i data-icon="books"></i>
			<span>/curated</span>
		</h2>
		{#each data.curated as { slug, title, date }}
			<article>
				<a href="/curated/{slug}">{title}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/curated">
			<span>All curated things</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>
			<i data-icon="list-star"></i>
			<span>/reviews</span>
		</h2>
		{#each data.reviews as { slug, title, date }}
			<article>
				<a href="/reviews/{slug}">{title.short || title.en}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
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
