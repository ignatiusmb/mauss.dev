<script context="module">
	export async function preload() {
		return { post: await this.fetch('help.json').then((r) => r.json()) };
	}
</script>

<script>
	export let post;
	import MetaHead from '../pages/MetaHead.svelte';
	import Article from '../pages/Article.svelte';
	import Disclaimer from '../components/Disclaimer.svelte';
</script>

<MetaHead {post} canonical="help" title="Help" description="Help page with explanation for each page in the website." />

<Article {post}>
	<Disclaimer link />

	<section>
		{@html post.content}
	</section>
</Article>
