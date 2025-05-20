<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	import { format } from 'mauss/date';

	const { data } = $props();
</script>

<Article>
	<header>
		<h1>Ignatius Bagussuputra</h1>
		<span><em>Software Alchemist</em> — Workdays Engineer, Weekends Wordsmith</span>
	</header>

	<!-- prettier-ignore -->
	<p>Independent software engineer based in Southeast Asia (GMT+7&ndash;8). I build in public — mostly open source, all on <a href="https://github.com/ignatiusmb">GitHub</a>. Some private work is there too, mostly under the radar.</p>
	<!-- prettier-ignore -->
	<p>I also take on consulting and freelance projects — tailored for those seeking customized and private work. If that sounds like you, feel free to reach out through one of <a href="/about#elsewhere">my socials</a>.</p>
	<!-- prettier-ignore -->
	<p>Outside engineering, I compose — it's how I process lessons, share discoveries, and explore new ideas. If you're curious, the <a href="/help">help page</a> is a good place to start.</p>

	<section>
		<h2>Blog</h2>
		{#each data.posts as { slug, title, date }}
			<article>
				<a href="/posts/{slug}/">{title}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/posts/">
			<span>All posts</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>Curated</h2>
		{#each data.curated as { slug, title, date }}
			<article>
				<a href="/curated/{slug}/">{title}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/curated/">
			<span>All curated things</span>
			<i data-icon="arrow-circle-right"></i>
		</a>
	</section>

	<section>
		<h2>Reviews</h2>
		{#each data.reviews as { slug, title, date }}
			<article>
				<a href="/reviews/{slug}/">{title.short || title.en}</a>
				<time datetime={date}>{format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/reviews/">
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
		font-family: var(--mrq-heading);

		h1 {
			grid-template-columns: auto 1fr;
			color: rgba(255, 255, 255, 1);
			font-size: 1.875rem;
			font-weight: 600;
		}
	}

	section {
		display: grid;
		gap: 0.75rem;
		justify-items: start;

		h2 {
			text-transform: capitalize;
			font-size: 1.5rem;
		}
		article {
			width: 100%;
			display: flex;
			gap: 1rem;

			time {
				flex: 1;
				text-align: right;
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
				transition: transform 150ms ease-in-out;
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
