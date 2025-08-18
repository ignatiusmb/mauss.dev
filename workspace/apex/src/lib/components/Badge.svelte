<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		tag: string;
	}
	const { tag }: Props = $props();
	const Contrast = { DARK: 'var(--color-base)', LIGHT: 'oklch(1 0 0)' };
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
		nodejs: ['#90c53f', Contrast.DARK],
		ppl2020: ['#feb229', Contrast.DARK],
		productivity: ['#ff9900', Contrast.DARK],
		python: ['#3879ab', '#ffda5d'],
		reflection: ['#708090', Contrast.DARK],
		sapper: ['#159794', Contrast.DARK],
		stoicism: ['#789488', Contrast.LIGHT],
		svelte: ['#ff3e00', Contrast.DARK],
		tutorial: ['#feffa5', '#b30047'],
		typescript: ['#2775c3', Contrast.LIGHT],
		windows: ['#357ec7', Contrast.DARK],
	};
</script>

<a
	href="/{page.url.pathname.split('/')[1]}?tags={tag}"
	style:background={table[tag]?.[0] || Contrast.LIGHT}
	style:color={table[tag]?.[1] || Contrast.DARK}
>
	<i data-icon="tag" style:color="inherit"></i>
	<span>{tag}</span>
</a>

<style>
	a {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		padding: 0.2rem 0.4rem;
		padding-left: 0.35rem;
		border-radius: var(--rounding-base);
		font-family: var(--font-sans);
		font-size: var(--size-small);
	}

	i[data-icon='tag'] {
		--size: var(--size-small);
		--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M42.34,138.34A8,8,0,0,1,40,132.69V40h92.69a8,8,0,0,1,5.65,2.34l99.32,99.32a8,8,0,0,1,0,11.31L153,237.66a8,8,0,0,1-11.31,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="84" cy="84" r="10"/></svg>');
	}
</style>
