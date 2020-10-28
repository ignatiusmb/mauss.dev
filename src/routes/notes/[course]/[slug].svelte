<script context="module">
	export async function preload({ params }) {
		const { course, slug } = params;
		const res = await this.fetch(`notes/${course}/${slug}.json`);
		if (res.status !== 200) return this.error(404, 'Notes not found');
		return { post: await res.json() };
	}
</script>

<script>
	export let post;
	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';
	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} canonical="notes/{slug}" {title} />

<Article {post} header path="content/notes/{slug}.md">
	{@html content}
</Article>
