<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
	import Backdrop from './Backdrop.svelte';

	const { data } = $props();
</script>

<Article
	post={data.article}
	path="reviews/{data.article.slug}/+article.md"
	flank={data.article.flank}
>
	{#snippet header()}
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
	{/snippet}

	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>DISCLAIMER</h2>
		</Link>
	</section>

	{@html data.article.content}
</Article>

<style>
	small {
		display: flex;

		:not(:first-child) {
			margin-left: 0.25rem;
		}
	}

	section {
		text-align: center;

		h2 {
			margin-top: 0;
			color: inherit;
		}
	}
</style>
