<script lang="ts">
	interface Props {
		animate?: boolean;
	}
	const { animate }: Props = $props();
</script>

<svg
	aria-label="Alkamauss"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-128 -128 256 256"
	fill="none"
	stroke="#c49e45"
	stroke-width="8"
	stroke-linecap="round"
	stroke-linejoin="round"
	class:animate
>
	<circle r="92" fill="none" stroke-width="16" />
	<polygon points="20,12 0,-22 -20,12" fill="#e1e0e4" stroke="#e1e0e4" />

	<g fill="#c49e45">
		<defs><path id="leaf" d="M 32 0 Q 72 24 14 64 Q 42 4 0 0 Z" /></defs>

		<use href="#leaf" transform="rotate(30) translate(0, -88)" />
		<use href="#leaf" transform="rotate(150) translate(0, -88)" />
		<use href="#leaf" transform="rotate(270) translate(0, -88)" />
	</g>

	<g fill="#e1e0e4" stroke="#e1e0e4" stroke-width="6">
		<circle r="16" transform="translate(0, -90)" />
		<circle r="16" transform="rotate(120) translate(0, -90)" />
		<circle r="16" transform="rotate(-120) translate(0, -90)" />
	</g>
</svg>

<style>
	svg {
		&.animate {
			animation: rotate 42s linear infinite;
		}
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
