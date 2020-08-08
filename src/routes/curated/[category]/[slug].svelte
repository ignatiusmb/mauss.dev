<script context="module">
	export async function preload({ params }) {
		const { category, slug } = params;
		const res = await this.fetch(`curated/${category}/${slug}.json`);
		if (res.status !== 200) return this.error(404, 'Curated post not found');
		return { post: await res.json() };
	}
</script>

<script>
	export let post;
	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';
	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} canonical="curated/{slug}" {title} />

<Article header {post} path="content/curated/{slug}.md">
	<section>
		{@html content}
	</section>
</Article>
