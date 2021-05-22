<script context="module">
	export async function load({ fetch, page }) {
		const { category, slug } = page.params;
		const res = await fetch(`/reviews/${category}/${slug}.json`);
		if (!res.ok) return { status: 404, error: 'Review not found' };
		const post = await res.json();

		const list = await fetch('/reviews.json');
		for (const review of await list.json()) {
			if (review.slug !== post.slug) continue;
			post.siblings = review.siblings;
			return { props: { post } };
		}
	}
	const links = new Map([
		['mal', 'MyAnimeList'],
		['tmdb', 'TheMovieDB'],
	]);
</script>

<script>
	export let post;

	import { Link } from 'svelement';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';

	import ReviewBanner from '$lib/components/ReviewBanner.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';
	import Spoilers from '$lib/components/SpoilerSection.svelte';
	$: ({ title, spoilers, siblings } = post);
</script>

<MetaHead
	{post}
	canonical="reviews/{post.slug}"
	title={title.short ? title.short : title.jp ? title.jp : title.en} />

<Article {post} header path="content/reviews/{post.slug}.md" {siblings}>
	<div slot="header">
		<ReviewBanner {post} />

		{#if post.link}
			<small>
				<span>[</span>
				{#each Object.entries(post.link) as [key, href]}
					<span>
						<Link {href}>{links.get(key) || key.toUpperCase()}</Link>
					</span>
				{/each}
				<span>]</span>
			</small>
		{/if}
	</div>

	<Disclaimer link />

	{@html post.content}

	{#if spoilers}
		<Spoilers {spoilers} />
	{/if}

	{#if post.closing}
		{@html post.closing}
	{/if}
</Article>

<style>
	div small {
		justify-content: center;
	}
</style>
