<script lang="ts">
	export let type: 'horizontal' | 'vertical';
</script>

<div class="divider {type}" />

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
