<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch(`posts/${params.slug}.json`);
		if (res.status !== 200) return this.error(404, 'Post not found');

		const list = await this.fetch('posts.json').then((r) => r.json());
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
	import MetaHead from '../../pages/MetaHead.svelte';
	import Article from '../../pages/Article.svelte';
	import TagBadge from '../../components/TagBadge.svelte';
</script>

<MetaHead {post} canonical="posts/{post.slug}" title={post.title} />

<Article
	{post}
	header
	path="content/posts/{post.date.published}.{post.slug}.md"
	siblings={post.siblings}>
	<small slot="header">
		{#each post.tags as tag}
			<TagBadge {tag} />
		{/each}
	</small>

	{#if post.toc.length}
		<section id="objective" class="info-box">
			<h3>Outline & Focus</h3>
			<ul>
				{#each post.toc as heading}
					<li>{heading}</li>
				{/each}
			</ul>
		</section>
	{/if}

	<section>
		{@html post.content}
	</section>
</Article>

<style>
	small {
		display: flex;
		flex-wrap: wrap;
	}
	small > :global(:not(:last-child)) {
		margin-right: 0.5em;
	}
	small > :global(span) {
		margin-bottom: 0.5em;
	}
</style>
