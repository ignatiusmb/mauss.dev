<script lang="ts">
	export let data: import('./$types').PageData;

	import { Link } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';

	import ReviewBanner from '$lib/components/ReviewBanner.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';
	import Spoilers from '$lib/components/SpoilerSection.svelte';

	const links = new Map([
		['mal', 'MyAnimeList'],
		['tmdb', 'TheMovieDB'],
	]);

	$: ({ title, spoilers, siblings } = data);
</script>

<MetaHead
	post={data}
	canonical="reviews/{data.slug}"
	title={title.short ? title.short : title.jp ? title.jp : title.en}
/>

<Article post={data} header path="src/reviews/{data.slug}.md" {siblings}>
	<div slot="header">
		<ReviewBanner post={data} />

		{#if data.link}
			<small>
				<span>[</span>
				{#each Object.entries(data.link) as [key, href]}
					<span>
						<Link {href}>{links.get(key) || key.toUpperCase()}</Link>
					</span>
				{/each}
				<span>]</span>
			</small>
		{/if}
	</div>

	<Disclaimer link />

	{@html data.content}

	{#if spoilers}
		<Spoilers {spoilers} />
	{/if}

	{#if data.closing}
		{@html data.closing}
	{/if}
</Article>

<style>
	div small {
		justify-content: center;
	}
</style>
