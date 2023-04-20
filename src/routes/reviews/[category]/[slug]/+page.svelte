<script lang="ts">
	export let data: import('./$types').PageData;

	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';

	import Link from '$lib/components/Link.svelte';
	import ReviewBanner from '$lib/components/ReviewBanner.svelte';
	import Spoilers from '$lib/components/SpoilerSection.svelte';

	$: ({ title, spoilers, flank } = data);
</script>

<MetaHead
	post={data}
	canonical="reviews/{data.slug}"
	title={title.short ? title.short : title.jp ? title.jp : title.en}
/>

<Article post={data} header path="src/reviews/{data.slug}.md" {flank}>
	<div slot="header">
		<ReviewBanner post={data} />

		{#if data.link}
			{@const links = new Map([
				['mal', 'MyAnimeList'],
				['tmdb', 'TheMovieDB'],
			])}

			<small>
				<span>[</span>
				{#each Object.entries(data.link) as [key, href]}
					<Link {href}>{links.get(key) || key.toUpperCase()}</Link>
				{/each}
				<span>]</span>
			</small>
		{/if}
	</div>

	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>READ DISCLAIMER</h2>
		</Link>
	</section>

	{@html data.content}

	{#if spoilers}
		<Spoilers {spoilers} />
	{/if}

	{#if data.closing}
		{@html data.closing}
	{/if}
</Article>

<style>
	section {
		text-align: center;
	}
	section h2 {
		margin-top: 0;
		color: inherit;
	}
	div small {
		justify-content: center;
	}
</style>
