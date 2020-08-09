<script context="module">
	export async function preload({ params }) {
		const { category, slug } = params;
		const res = await this.fetch(`reviews/${category}/${slug}.json`);
		if (res.status !== 200) return this.error(404, 'Review not found');

		const list = await this.fetch('reviews.json').then((r) => r.json());
		const post = await res.json();

		for (const review of list) {
			if (review.slug !== post.slug) continue;
			post.siblings = review.siblings;
			return { post };
		}
	}
</script>

<script>
	export let post;
	const linkMap = {
		mal: 'MyAnimeList',
	};

	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';

	import Disclaimer from '../../../components/Disclaimer.svelte';
	import ReviewsTab from '../../../components/ReviewsTab.svelte';
	import Spoilers from '../../../components/SpoilerSection.svelte';
	$: ({ slug, title, link, content, seasons, spoilers, closing, siblings } = post);
</script>

<MetaHead {post} canonical="reviews/{slug}" title={title.short ? title.short : title.jp ? title.jp : title.en} />

<Article header {post} path="content/reviews/{slug}.md" {siblings}>
	<small slot="header">
		{#if link}
			<span>
				{#each Object.keys(link) as linkKey}
					<a href={link[linkKey]}>{linkMap[linkKey]}</a>
				{/each}
			</span>
		{/if}
	</small>

	<Disclaimer link />

	<section>
		{@html content}
	</section>

	{#if seasons}
		<ReviewsTab {seasons} />
	{:else if spoilers}
		<Spoilers {spoilers} />
	{/if}

	{#if closing}
		<section>
			{@html closing}
		</section>
	{/if}
</Article>

<style>
	small {
		font-size: 1rem;
	}
</style>
