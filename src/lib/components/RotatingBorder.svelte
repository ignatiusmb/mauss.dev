<script>
	export let type = 'dashed';
</script>

<div style="border: 0.25em {type} var(--theme-primary);" />

<style>
	div {
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: inherit;
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
