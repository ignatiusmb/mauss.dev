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

	import { mobile } from '../stores';
	let innerWidth;
	$: $mobile = innerWidth < 600;

	$: if (!process.dev && process.browser) {
		fetch(`api/hit?slug=${$page.path}`, { method: 'POST' });
	}
</script>

<svelte:window bind:innerWidth />
<ScrollTop />

{#if segment}
	<Navigation mobile={$mobile} />
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
