<script>
	import Image from 'syv/core/Image.svelte';
	const { src = '', alt = '' } = $props();
</script>

<div class="weaved-image">
	<Image {src} {alt} />
	<div class="absolute border"></div>

	<div class="absolute grid">
		<div class="empty"></div>
		<div></div>
		<div></div>
		<div class="empty"></div>
	</div>

	<div class="absolute blend">
		<Image {src} {alt} />
		<div class="absolute grid">
			<div></div>
			<div class="empty"></div>
			<div class="empty"></div>
			<div></div>
		</div>
	</div>
</div>

<style>
	.weaved-image {
		width: 12rem;
		height: 12rem;
		position: relative;
		margin: 2rem auto;

		@media (min-width: 600px) {
			margin: 2rem;
		}

		& :global(img) {
			border: none;
			border-radius: 0;
			box-shadow: 0 0 1rem var(--color-accent-secondary);
		}

		& :global(.syv-core-image) {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		> :global(svg) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	div {
		&.absolute {
			width: 100%;
			height: 100%;
			position: absolute;
		}
		&.border {
			border: 0.75rem solid var(--color-accent-primary);
			border-radius: 2rem;
			box-shadow:
				0 0 0.5rem var(--color-accent-primary),
				inset 0 0 1rem var(--color-accent-primary);
			transform: rotate(45deg);
		}
		&.grid {
			position: absolute;
			display: grid;
			grid: 1fr 1fr / 1fr 1fr;
		}
		&.blend {
			mix-blend-mode: multiply;
		}
		&.empty {
			background-color: oklch(1 0 0);
		}
	}
</style>
