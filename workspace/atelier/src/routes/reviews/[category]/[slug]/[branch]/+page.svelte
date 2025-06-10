<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import Backdrop from '../Backdrop.svelte';
	import { page } from '$app/state';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source}>
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

	<!-- @TODO: change to '/deep-dive' -->
	{#if page.params.branch === 'spoilers'}
		{@const margin = `${data.article.table.length ? 1 : 3}rem 0 1rem`}
		<section data-info="warning" style:margin>
			<!-- prettier-ignore -->
			<em><strong>spoiler warning!</strong> this is a deeper look into the story — themes, moments, and everything in between. if you haven't finished it yet, why are you here...</em>
		</section>
	{/if}

	{@html data.article.content}
</Article>
