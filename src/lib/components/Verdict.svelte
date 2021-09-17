<script>
	export let verdict;
</script>

<div
	class:hot={verdict === 2}
	class:positive={verdict === 1}
	class:neutral={verdict === 0}
	class:negative={verdict === -1}
	class:wip={verdict === -2}
	title={verdict === 2 ? 'Must-watch!' : undefined}
>
	{#if verdict < -1}
		<span>Pending</span>
	{:else if verdict < 0}
		<span>Not recommended</span>
	{:else if verdict === 0}
		<span>Contextual</span>
	{:else if verdict > 0}
		<span>Recommended</span>
	{/if}
	{#if verdict === 2}🔥{/if}
</div>

<style>
	div {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		padding: 0.2em 0;
		border-radius: inherit;
		font-size: 0.8rem;
		color: #fff;
	}
	span:not(:only-child) {
		margin-right: 0.25em;
	}
	.negative {
		background: #d9534f;
	}
	.neutral {
		background: #f0ad4e;
	}
	.positive {
		background: #5cb85c;
	}
	.hot {
		background: linear-gradient(90deg, rgba(92, 184, 92, 1) 0%, rgba(206, 32, 41, 1) 100%);
	}
	.wip {
		background: rgba(0, 0, 0, 0.25);
	}
</style>
