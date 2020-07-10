<script>
	export let segment;
	import IconList from '../svelte/IconList.svelte';
	import ScrollTop from '../svelte/ScrollTop.svelte';

	import Navigation from '../components/Navigation.svelte';
	import Footer from '../components/Footer.svelte';

	import '@ignatiusmb/aqua/lib/aqua.min.css';
	import '../styles/fonts.css';
	import '../styles/theme.css';
	import '../styles/blog.css';
	import '../styles/animation.css';

	import { mobile } from '../stores';
	let innerWidth;
	$: $mobile = innerWidth < 600;
</script>

<svelte:window bind:innerWidth />
<IconList />
<ScrollTop />

{#if segment}
	<Navigation mobile={$mobile} />
{/if}
<slot />
<Footer mobile={$mobile} />

<style>
	:global(#sapper) {
		min-height: 100vh;
		display: grid;
		font-family: var(--aqua-default);
	}
</style>
