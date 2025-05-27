<script>
	const { type = 'dashed' } = $props();
</script>

<div style:border-style={type}></div>

<style>
	div {
		width: 100%;
		height: 100%;
		position: absolute;
		border-width: 0.25rem;
		border-radius: inherit;
		border-color: var(--theme-primary);
		animation: rotate 42s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
