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
		border-radius: inherit;

		background: var(--bg-base);
		text-transform: capitalize;
		font-size: 0.8rem;
		color: #ffffff;
	}
	.not-recommended {
		/* burgundy */
		background: #800020;
	}
	.contextual {
		/* ochre */
		background: #cc7722;
	}
	.recommended,
	.must-watch {
		/* cadmium green */
		background: #006b3c;
	}
</style>
