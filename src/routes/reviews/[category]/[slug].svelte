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
	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';

	import Disclaimer from '../../../components/Disclaimer.svelte';
	import ReviewsTab from '../../../components/ReviewsTab.svelte';
	import Spoilers from '../../../components/SpoilerSection.svelte';

	const linkMap = {
		mal: 'MyAnimeList',
	};
</script>

<MetaHead
	{post}
	canonical="reviews/{post.category}/{post.slug}"
	title={post.title.short ? post.title.short : post.title.jp ? post.title.jp : post.title.en}
	description={post.description} />

<Article header {post} path="content/reviews/{post.category}/{post.slug}.md" siblings={post.siblings}>
	<small slot="header">
		{#if post.link}
			<span>
				{#each Object.keys(post.link) as linkKey}
					<a href={post.link[linkKey]}>{linkMap[linkKey]}</a>
				{/each}
			</span>
		{/if}
	</small>

	<Disclaimer link />

	<section>
		{@html post.content}
	</section>

	{#if post.seasons}
		<ReviewsTab seasons={post.seasons} />
	{:else if post.spoilers}
		<Spoilers spoilers={post.spoilers} />
	{/if}

	{#if post.closing}
		<section>
			{@html post.closing}
		</section>
	{/if}
</Article>

<style>
	small {
		font-size: 1rem;
	}
</style>
