<script lang="ts">
	interface Props {
		verdict: import('./$types').PageData['list'][number]['verdict'];
	}
	const { verdict }: Props = $props();

	const mapper: Partial<Record<Props['verdict'], Props['verdict']>> = {
		'must-watch': 'recommended',
	};
</script>

<div class={verdict}>
	<span>{(mapper[verdict] || verdict).replace(/-/g, ' ')}</span>
	{#if verdict === 'must-watch'}<span>🔥</span>{/if}
</div>

<style>
	div {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		padding: 0.2rem 0;
		border-radius: var(--rounding-base);

		background: var(--color-base);
		text-transform: capitalize;
		font-size: 0.8rem;
		color: oklch(1 0 0);
	}
	.not-recommended {
		/* burgundy */
		background: oklch(0.38 0.1523 18.62);
	}
	.contextual {
		/* ochre */
		background: oklch(0.6496 0.1404 59.61);
	}
	.recommended,
	.must-watch {
		/* cadmium green */
		background: oklch(0.4638 0.1137 155.41);
	}
</style>
