<script>
	import { post } from 'mauss/api';
	import { browser, dev } from '$app/env';
	import { page as local } from '$app/stores';
	import { page } from '$lib/utils/stores';

	import { ScrollTop } from 'svelement';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs.js';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/blog.css';
	import '$lib/styles/animation.css';

	$: if (!dev && browser) {
		page.set(post(`/api/page?slug=${$local.path}`));
	}
</script>

<ScrollTop />

{#if $local.path !== '/'}
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
