<script lang="ts">
	interface Props {
		type: 'horizontal' | 'vertical';
	}
	const { type }: Props = $props();
</script>

<div class="divider {type}"></div>

<style>
	div {
		padding: 0;
		background: var(--bg-cover);
	}
	.horizontal {
		width: 100%;
		height: 1px;
	}
	.vertical {
		width: 1px;
		height: 100%;
	}
</style>
