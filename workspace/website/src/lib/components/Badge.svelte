<script lang="ts">
	interface Props {
		tag: string;
	}
	const { tag }: Props = $props();

	const table = {
		accessibility: ['#4285f4', '#ffffff'],
		android: ['#56a036', '#ffffff'],
		computing: ['#007acc', '#000000'],
		concert: ['#ff6f00', '#ffffff'],
		firebase: ['#ffca28', '#757575'],
		flutter: ['#54c5f8', '#003b6c'],
		git: ['#f54d27', '#413932'],
		github: ['#24292e', '#ffffff'],
		html: ['#e34c26', '#ffffff'],
		javascript: ['#f7df1e', '#000000'],
		life: ['#4caf50', '#ffffff'],
		lighthouse: ['#304ffe', '#ffffff'],
		music: ['#1e88e5', '#ffffff'],
		nodejs: ['#90c53f', '#46483d'],
		ppl2020: ['#feb229', '#000000'],
		productivity: ['#ff9900', '#000000'],
		python: ['#3879ab', '#ffda5d'],
		reflection: ['#708090', '#000000'],
		sapper: ['#159794', '#ffffff'],
		stoicism: ['#789488', '#ffffff'],
		svelte: ['#ff3e00', '#ffffff'],
		tutorial: ['#feffa5', '#b30047'],
		typescript: ['#2775c3', '#ffffff'],
	} as Record<string, [string, string]>;

	// tuple -> [background: string, color: string]
	const represent = $derived(table[tag] || ['#d6d9e0', '#606570']);
</script>

<span style:background={represent[0]} style:color={represent[1]}>#{tag}</span>

<style>
	span {
		padding: 0.2rem 0.4rem;
		border-radius: var(--b-radius);
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}
</style>
