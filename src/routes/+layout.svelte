<script>
	import '@ignatiusmb/styles/core.css';
	import 'marqua/styles/code.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/blog.css';
	import '$lib/styles/animation.css';

	import ScrollTop from 'syv/core/ScrollTop.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/stores';
</script>

<ScrollTop />

{#if $page.url.pathname !== '/'}
	<Navigation />
{/if}
<slot />
<Footer />

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
