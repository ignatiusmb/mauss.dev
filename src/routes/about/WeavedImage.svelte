<script>
	import Image from 'syv/core/Image.svelte';
	export let src = '';
	export let alt = '';
</script>

<div class="weaved-image">
	<Image {src} {alt} absolute />
	<div class="absolute border" />

	<div class="absolute grid">
		<div class="empty" />
		<div />
		<div />
		<div class="empty" />
	</div>

	<div class="absolute blend">
		<Image {src} {alt} absolute />
		<div class="absolute grid">
			<div />
			<div class="empty" />
			<div class="empty" />
			<div />
		</div>
	</div>
</div>

<style>
	.weaved-image {
		width: 12rem;
		height: 12rem;
		position: relative;
		margin: 3rem auto 5rem;
	}
	.weaved-image :global(img) {
		border: none;
		border-radius: 0;
		box-shadow: 0 0 1rem rgba(255, 255, 255, 0.7);
	}

	div.absolute {
		width: 100%;
		height: 100%;
		position: absolute;
	}
	div.border {
		border: 0.75rem solid crimson;
		border-radius: 0.5rem;
		box-shadow:
			0 0 0.5rem crimson,
			inset 0 0 1rem crimson;
		transform: rotate(45deg);
	}
	div.grid {
		position: absolute;
		display: grid;
		grid: 1fr 1fr / 1fr 1fr;
	}
	div.blend {
		mix-blend-mode: multiply;
	}
	div.empty {
		background-color: #ffffff;
	}

	@media only screen and (min-width: 500px) {
		.weaved-image {
			float: left;
			margin: 3rem;
		}
	}
</style>
