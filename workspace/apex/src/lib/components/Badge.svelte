<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		tag: string;
	}
	const { tag }: Props = $props();
	const Contrast = {
		DARK: 'var(--color-base)',
		LIGHT: 'oklch(1 0 0)',
	};
	const table: Record<string, [background: string, color: string]> = {
		accessibility: ['#4285f4', Contrast.LIGHT],
		android: ['#56a036', Contrast.LIGHT],
		computing: ['#007acc', Contrast.DARK],
		concert: ['#ff6f00', Contrast.LIGHT],
		firebase: ['#ffca28', '#757575'],
		flutter: ['#54c5f8', '#003b6c'],
		git: ['#f54d27', '#413932'],
		github: ['#24292e', Contrast.LIGHT],
		html: ['#e34c26', Contrast.LIGHT],
		javascript: ['#f7df1e', Contrast.DARK],
		life: ['#4caf50', Contrast.LIGHT],
		lighthouse: ['#304ffe', Contrast.LIGHT],
		music: ['#1e88e5', Contrast.LIGHT],
		nodejs: ['#90c53f', '#46483d'],
		ppl2020: ['#feb229', Contrast.DARK],
		productivity: ['#ff9900', Contrast.DARK],
		python: ['#3879ab', '#ffda5d'],
		reflection: ['#708090', Contrast.DARK],
		sapper: ['#159794', Contrast.LIGHT],
		stoicism: ['#789488', Contrast.LIGHT],
		svelte: ['#ff3e00', Contrast.DARK],
		tutorial: ['#feffa5', '#b30047'],
		typescript: ['#2775c3', Contrast.LIGHT],
	};
</script>

<a
	href="/{page.url.pathname.split('/')[1]}?tags={tag}"
	style:background={table[tag]?.[0] || Contrast.LIGHT}
	style:color={table[tag]?.[1] || Contrast.DARK}
>
	#{tag}
</a>

<style>
	a {
		padding: 0.2rem 0.4rem;
		border-radius: var(--rounding-base);
		font-family: var(--font-sans);
		font-size: var(--size-small);
	}
</style>
