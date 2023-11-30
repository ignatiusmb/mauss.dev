<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	import { dt } from 'mauss';

	export let data;
</script>

<Article>
	<header>
		<h1>Ignatius Bagussuputra</h1>
		<span><em>Software Alchemist</em> — Workdays Engineer, Weekends Wordsmith</span>
	</header>

	<!-- prettier-ignore -->
	<p>Hi, I am Igna, an independent software engineer living between GMT+7 to GMT+8. I'm a member of the <a href="https://svelte.dev/">Svelte</a> core team and mostly tend to open source technologies, which is publicly available on <a href="https://github.com/ignatiusmb">GitHub</a>.</p>
	<!-- prettier-ignore -->
	<p>I also do consultancy and take on freelancing projects that are typically confidential and involves tailored solutions for clients seeking a more personalized approach. If you're interested, feel free to <a href="/contact/">contact me</a> from one of my socials.</p>
	<!-- prettier-ignore -->
	<p>Besides my engineering pursuits, I enjoy writing and sharing my thoughts and experiences, where I often reflect on life lessons and new discoveries. Check out the <a href="/help/">help page</a> for more details.</p>

	<section>
		<h2>Blog</h2>
		{#each data.posts as { slug, title, date }}
			<article>
				<a href="/posts/{slug}/">{title}</a>
				<time datetime={date}>{dt.format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/posts/">All posts &rarr;</a>
	</section>

	<section>
		<h2>Curated</h2>
		{#each data.curated as { slug, title, date }}
			<article>
				<a href="/curated/{slug}/">{title}</a>
				<time datetime={date}>{dt.format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/curated/">All curated things &rarr;</a>
	</section>

	<section>
		<h2>Reviews</h2>
		{#each data.reviews as { slug, title, date }}
			<article>
				<a href="/reviews/{slug}/">{title.short || title.en}</a>
				<time datetime={date}>{dt.format(date)('DD MMM YYYY')}</time>
			</article>
		{/each}
		<a href="/reviews/">All reviews &rarr;</a>
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
	}
	h1 {
		grid-template-columns: auto 1fr;
		color: rgba(255, 255, 255, 1);
		font-weight: 600;
	}
	section {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
	}
	article {
		width: 100%;
		display: flex;
		gap: 1rem;
	}
	time {
		flex: 1;
		text-align: right;
		text-wrap: nowrap;
	}
	h2 {
		text-transform: capitalize;
		font-size: 1.5rem;
	}
</style>
