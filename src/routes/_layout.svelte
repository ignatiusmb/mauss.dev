<script>
	export let segment;

	import { stores } from '@sapper/app';
	const { page } = stores();

	import { ScrollTop } from '@ignatiusmb/elements';
	import Navigation from '../components/Navigation.svelte';
	import Footer from '../components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '../styles/fonts.css';
	import '../styles/theme.css';
	import '../styles/blog.css';
	import '../styles/animation.css';

	$: if (!process.dev && process.browser && !$page.error) {
		fetch(`api/page?slug=${$page.path}`, { method: 'POST' });
	}
</script>

<ScrollTop />

{#if segment}
	<Navigation />
{/if}
<slot />
<Footer />

<style>
	:global(#sapper) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--aqua-default);
	}
</style>
