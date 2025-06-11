<script lang="ts">
	interface Props {
		tag: string;
	}
	const { tag }: Props = $props();

	const table = {
		accessibility: ['#4285f4', 'var(--color-text)'],
		android: ['#56a036', 'var(--color-text)'],
		computing: ['#007acc', 'var(--color-base)'],
		concert: ['#ff6f00', 'var(--color-text)'],
		firebase: ['#ffca28', '#757575'],
		flutter: ['#54c5f8', '#003b6c'],
		git: ['#f54d27', '#413932'],
		github: ['#24292e', 'var(--color-text)'],
		html: ['#e34c26', 'var(--color-text)'],
		javascript: ['#f7df1e', 'var(--color-base)'],
		life: ['#4caf50', 'var(--color-text)'],
		lighthouse: ['#304ffe', 'var(--color-text)'],
		music: ['#1e88e5', 'var(--color-text)'],
		nodejs: ['#90c53f', '#46483d'],
		ppl2020: ['#feb229', 'var(--color-base)'],
		productivity: ['#ff9900', 'var(--color-base)'],
		python: ['#3879ab', '#ffda5d'],
		reflection: ['#708090', 'var(--color-base)'],
		sapper: ['#159794', 'var(--color-text)'],
		stoicism: ['#789488', 'var(--color-text)'],
		svelte: ['#ff3e00', 'var(--color-text)'],
		tutorial: ['#feffa5', '#b30047'],
		typescript: ['#2775c3', 'var(--color-text)'],
	} as Record<string, [string, string]>;

	// tuple -> [background: string, color: string]
	const represent = $derived(table[tag] || ['#d6d9e0', '#606570']);
</script>

<span style:background={represent[0]} style:color={represent[1]}>#{tag}</span>

<style>
	span {
		padding: 0.2rem 0.4rem;
		border-radius: var(--rounding-base);
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}
</style>
