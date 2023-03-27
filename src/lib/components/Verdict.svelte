<script lang="ts">
	export let verdict: import('$lib/content/reviews').Review['verdict'];
	type VerdictRecord = Record<typeof verdict, typeof verdict>;
	const mapper: Partial<VerdictRecord> = {
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
		background: linear-gradient(
			90deg,
			#ce2029,
			#c8460e,
			#be6100,
			#b07700,
			#9f8b00,
			#8c9c12,
			#76ab39,
			#5cb85c
		);
	}
</style>
