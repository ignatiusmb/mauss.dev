<script context="module">
	import type { Preload } from '@sapper/common';
	type Help = { content: string };
	export const preload: Preload = async function (this) {
		return { post: await this.fetch('help.json').then((r) => r.json()) };
	};
</script>

<script>
	export let post: Help;
	import MetaHead from '$pages/MetaHead.svelte';
	import Article from '$pages/Article.svelte';
	import Disclaimer from '$components/Disclaimer.svelte';
</script>

<MetaHead canonical="help" title="Help" description="DevMauss help page." />

<Article>
	<Disclaimer link />

	{@html post.content}
</Article>
