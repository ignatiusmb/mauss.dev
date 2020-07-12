<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch(`curated/${params.slug}.json`);
		if (res.status !== 200) return this.error(404, 'Curated post not found');
		return { post: await res.json() };
	}
</script>

<script>
	export let post;
	import MetaHead from '../../pages/MetaHead.svelte';
	import Article from '../../pages/Article.svelte';
</script>

<MetaHead {post} canonical="curated/{post.slug}" title={post.title} />

<Article {post} path="content/curated/{post.slug}.md">
	<section>
		{@html post.content}
	</section>
</Article>
