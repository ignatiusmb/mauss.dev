<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Article from '$lib/pages/Article.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<Article
	post={data.article}
	path="sites/dev.mauss/curated/{data.article.slug}/+{$page.params.branch}.md"
>
	<svelte:fragment slot="header">
		{#if data.article.tags}
			<small class="tags">
				{#each data.article.tags as tag}
					<Badge {tag} />
				{/each}
			</small>
		{/if}

		<div style:text-transform="capitalize">
			<span>[</span>
			{#each data.article.branches as branch, idx}
				{@const b = branch === 'article' ? '' : branch}
				{#if idx !== 0}<span class="dash">&mdash;</span>{/if}
				<a href="/curated/{data.article.slug}/{b}">{branch}</a>
			{/each}
			<span>]</span>
		</div>
	</svelte:fragment>

	{@html data.article.content}
</Article>

<style>
	div {
		display: flex;
	}
	div :not(:first-child) {
		margin-left: 0.25rem;
	}
</style>
