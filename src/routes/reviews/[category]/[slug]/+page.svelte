<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
	import Backdrop from './Backdrop.svelte';
	import Spoilers from './SpoilerSection.svelte';

	export let data;
</script>

<Article
	post={data.article}
	path="sites/dev.mauss/reviews/{data.article.slug}/+article.md"
	flank={data.article.flank}
>
	<svelte:fragment slot="header">
		<Backdrop post={data.article} />

		{#if data.article.link}
			<small>
				<span>[</span>
				{#each Object.entries(data.article.link) as [key, link], idx}
					{#if idx !== 0}<span class="dash">&mdash;</span>{/if}

					{#each typeof link === 'string' ? [link] : link as href, v}
						{@const indexed = typeof link !== 'string' ? ` (${v + 1})` : ''}

						{#if v !== 0}<span class="dash">&mdash;</span>{/if}
						<a {href}>{key}{indexed}</a>
					{/each}
				{/each}
				<span>]</span>
			</small>
		{/if}
	</svelte:fragment>

	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>DISCLAIMER</h2>
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
	small {
		display: flex;
	}
	small :not(:first-child) {
		margin-left: 0.25rem;
	}

	section {
		text-align: center;
	}
	section h2 {
		margin-top: 0;
		color: inherit;
	}
</style>
