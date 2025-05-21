<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import Backdrop from './Backdrop.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source} flank={data.article.flank}>
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
						<a {href} target="_blank">{key}{indexed}</a>
					{/each}
				{/each}
				<span>]</span>
			</small>
		{/if}
	{/snippet}

	<section class="info-box warning" style:margin="1rem 0">
		<em>
			this review reflects my personal opinions. see the <a href="/fine-print">fine print</a> for more.
		</em>
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
</style>
