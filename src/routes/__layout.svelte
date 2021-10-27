<script>
	import { page } from '$app/stores';

	import { ScrollTop } from 'syv';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs.js';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/blog.css';
	import '$lib/styles/animation.css';
</script>

<ScrollTop />

{#if $page.path !== '/'}
	<Navigation />
{/if}
<slot />
<Footer />

<style>
	:global(body > #svelte) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--aqua-default);
	}
</style>
