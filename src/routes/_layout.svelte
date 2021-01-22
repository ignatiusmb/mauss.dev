<script>
	export let segment;

	import { page } from '$utils/stores';
	import { stores } from '@sapper/app';
	const { page: local } = stores();

	import { ScrollTop } from 'svelement';
	import Navigation from '$components/Navigation.svelte';
	import Footer from '$components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.cbs';
	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '$styles/fonts.css';
	import '$styles/theme.css';
	import '$styles/blog.css';
	import '$styles/animation.css';

	$: if (!process.dev && typeof window !== 'undefined' && !$local.error) {
		page.set(fetch(`api/page?slug=${$local.path}`, { method: 'POST' }).then((r) => r.json()));
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
