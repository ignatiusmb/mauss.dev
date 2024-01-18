<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data;
</script>

<Article post={data.article} path="sites/dev.mauss/curated/{data.article.slug}/+article.md">
	<svelte:fragment slot="header">
		{#if data.article.tags}
			<small class="tags">
				{#each data.article.tags as tag}
					<Badge {tag} />
				{/each}
			</small>
		{/if}

		{#if data.article.branches.length}
			<div style:text-transform="capitalize">
				<span>[</span>
				{#each data.article.branches as branch, idx}
					{#if idx !== 0}<span class="dash">&mdash;</span>{/if}
					<a href="/curated/{data.article.slug}/{branch}">{branch}</a>
				{/each}
				<span>]</span>
			</div>
		{/if}
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
