<script>
	import { post } from 'mauss/api';
	import { browser, dev } from '$app/env';
	import { page } from '$app/stores';
	import { current } from '$lib/utils/stores';

	import { ScrollTop } from 'syv';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs.js';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/blog.css';
	import '$lib/styles/animation.css';

	$: if (!dev && browser) {
		current.set(post(`/api/page?slug=${$page.path}`));
	}
</script>

<ScrollTop />

{#if $page.path !== '/'}
	<Navigation />
{/if}
<slot />
<Footer />

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--aqua-default);
	}
</style>
