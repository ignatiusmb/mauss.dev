<script>
	export let segment;

	import { stores } from '@sapper/app';
	const { page: local } = stores();

	import { ScrollTop } from '@ignatiusmb/elements';
	import Navigation from '../components/Navigation.svelte';
	import Footer from '../components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '../styles/fonts.css';
	import '../styles/theme.css';
	import '../styles/blog.css';
	import '../styles/animation.css';

	import { page } from '../stores';
	$: if (!process.dev && process.browser && !$local.error) {
		$page = fetch(`api/page?slug=${$local.path}`, { method: 'POST' });
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
