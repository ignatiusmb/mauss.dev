<script lang="ts">
	export let verdict: import('$lib/utils/types').Review['verdict'];
	const mapper: Partial<Record<typeof verdict, typeof verdict>> = {
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
		padding: 0.2em 0;
		border-radius: inherit;
		background: rgba(0, 0, 0, 0.25);
		font-size: 0.8rem;
		color: #fff;
	}
	span {
		text-transform: capitalize;
	}
	.not-recommended {
		background: #d9534f;
	}
	.contextual {
		background: #f0ad4e;
	}
	.recommended {
		background: #5cb85c;
	}
	.must-watch {
		background: linear-gradient(90deg, rgba(92, 184, 92, 1) 0%, rgba(206, 32, 41, 1) 100%);
	}
</style>
