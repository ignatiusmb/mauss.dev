<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		tag: string;
	}
	const { tag }: Props = $props();

	const table = {
		accessibility: ['#4285f4', 'oklch(1 0 0)'],
		android: ['#56a036', 'oklch(1 0 0)'],
		computing: ['#007acc', 'var(--color-base)'],
		concert: ['#ff6f00', 'oklch(1 0 0)'],
		firebase: ['#ffca28', '#757575'],
		flutter: ['#54c5f8', '#003b6c'],
		git: ['#f54d27', '#413932'],
		github: ['#24292e', 'oklch(1 0 0)'],
		html: ['#e34c26', 'oklch(1 0 0)'],
		javascript: ['#f7df1e', 'var(--color-base)'],
		life: ['#4caf50', 'oklch(1 0 0)'],
		lighthouse: ['#304ffe', 'oklch(1 0 0)'],
		music: ['#1e88e5', 'oklch(1 0 0)'],
		nodejs: ['#90c53f', '#46483d'],
		ppl2020: ['#feb229', 'var(--color-base)'],
		productivity: ['#ff9900', 'var(--color-base)'],
		python: ['#3879ab', '#ffda5d'],
		reflection: ['#708090', 'var(--color-base)'],
		sapper: ['#159794', 'oklch(1 0 0)'],
		stoicism: ['#789488', 'oklch(1 0 0)'],
		svelte: ['#ff3e00', 'oklch(1 0 0)'],
		tutorial: ['#feffa5', '#b30047'],
		typescript: ['#2775c3', 'oklch(1 0 0)'],
	} as Record<string, [background: string, color: string]>;

	const represent = $derived(table[tag] || ['#d6d9e0', 'var(--color-base)']);
	const [, root] = $derived(page.url.pathname.split('/'));
</script>

<a href="/{root}?tags={tag}" style:background={represent[0]} style:color={represent[1]}>
	#{tag}
</a>

<style>
	a {
		padding: 0.2rem 0.4rem;
		border-radius: var(--rounding-base);
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}
</style>
