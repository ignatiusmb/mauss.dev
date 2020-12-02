<script context="module">
	export async function preload({ params }) {
		const { section } = params;
		const articles = await this.fetch('about.json').then((r) => r.json());
		if (!articles[section]) return this.error(404, 'Section not found');
		return { section, post: articles[section] };
	}
</script>

<script>
	export let section, post;
	import { Link, WeavedImage } from 'svelement';
	import MetaHead from '../../pages/MetaHead.svelte';
	import Article from '../../pages/Article.svelte';
	import { capitalize } from '../../utils/helper';
</script>

<MetaHead
	{post}
	canonical="about/{section}"
	title="About - {capitalize(section)}"
	description="Get to know Ignatius Bagussuputra from his About page." />

<Article {post}>
	<WeavedImage src="profile/mauss.jpeg" alt="DevMauss Profile" />

	<section>
		<Link href="about">
			<h2>About</h2>
		</Link>
	</section>

	{@html post.content}
</Article>

<style>
	section:first-of-type {
		border: 0.2em solid var(--fg-surface);
		border-radius: var(--b-radius);
	}
	section:first-of-type h2 {
		margin-top: 0;
		text-align: center;
	}
</style>
