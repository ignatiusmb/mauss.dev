<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
	import ReviewBanner from './ReviewBanner.svelte';
	import Spoilers from './SpoilerSection.svelte';

	export let data;
</script>

<Article
	post={data.article}
	path="sites/dev.mauss/reviews/{data.article.slug}/+article.md"
	flank={data.article.flank}
>
	<div slot="header">
		<ReviewBanner post={data.article} />

		{#if data.article.link}
			<small>
				<span>[</span>
				{#each Object.entries(data.article.link) as [key, link]}
					{#each typeof link === 'string' ? [link] : link as href, idx}
						<a {href}>
							<span>{key}</span>
							{#if typeof link !== 'string'}
								<span>({idx + 1})</span>
							{/if}
						</a>
					{/each}
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

	{@html data.article.content}

	{#if data.article.spoilers}
		<Spoilers spoilers={data.article.spoilers} />
	{/if}

	{#if data.article.closing}
		{@html data.article.closing}
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
