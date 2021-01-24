<script context="module">
	import type { Preload } from '@sapper/common';
	import type { Uses } from '$utils/types';
	export const preload: Preload = async function (this) {
		const post: Uses = await this.fetch('uses.json').then((r) => r.json());
		return { post };
	};
</script>

<script>
	export let post: Uses;
	import MetaHead from '$pages/MetaHead.svelte';
	import Article from '$pages/Article.svelte';
</script>

<MetaHead
	{post}
	canonical="uses"
	title="Uses"
	description="Ignatius Bagussuputra's collections, detailing his setup, applications, workstations,
	and other stuffs." />

<Article header {post}>
	<section>
		{@html post.content}
	</section>
</Article>
