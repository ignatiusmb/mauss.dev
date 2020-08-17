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

	import ReviewBanner from '../../../components/ReviewBanner.svelte';
	import Disclaimer from '../../../components/Disclaimer.svelte';
	import Spoilers from '../../../components/SpoilerSection.svelte';
	$: ({ title, spoilers, siblings } = post);
</script>

<MetaHead {post} canonical="reviews/{post.slug}" title={title.short ? title.short : title.jp ? title.jp : title.en} />

<Article header {post} path="content/reviews/{post.slug}.md" {siblings}>
	<div slot="header">
		<ReviewBanner {post} />

		{#if post.link}
			<small>
				<span>[</span>
				{#each Object.keys(post.link) as linkKey}
					<span>
						<a href={post.link[linkKey]}>{linkMap[linkKey]}</a>
					</span>
				{/each}
				<span>]</span>
			</small>
		{/if}
	</div>

	<Disclaimer link />

	<section>
		{@html post.content}
	</section>

	{#if spoilers}
		<Spoilers {spoilers} />
	{/if}

	{#if post.closing}
		<section>
			{@html post.closing}
		</section>
	{/if}
</Article>

<style>
	div small {
		justify-content: center;
	}
</style>
