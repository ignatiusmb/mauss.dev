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
		margin: 3rem auto 5rem;

		@media (min-width: 500px) {
			float: left;
			margin: 3rem;
		}

		& :global(img) {
			border: none;
			border-radius: 0;
			box-shadow: 0 0 1rem rgba(255, 255, 255, 0.7);
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
			border: 0.75rem solid crimson;
			border-radius: 2rem;
			box-shadow:
				0 0 0.5rem crimson,
				inset 0 0 1rem crimson;
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
			background-color: #ffffff;
		}
	}
</style>
