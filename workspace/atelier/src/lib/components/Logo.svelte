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
	stroke="#b8b8b8"
	class:animate
>
	<defs>
		<filter id="wobble" x="-140" y="-140" width="110%" height="110%" filterUnits="userSpaceOnUse">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.03 0.04"
				numOctaves="1"
				seed="4"
				result="noise"
			/>

			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale="8"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>

		<g
			id="light"
			stroke-width="8"
			stroke-linecap="round"
			stroke-linejoin="round"
			filter="url(#wobble)"
		>
			<rect x="-32" y="-32" width="64" height="64" />
			<polygon points="0,-32 32,0 0,32 -32,0" />
			<path d="M 0 -32 l 0 -24 M 32 0 l 24 0 M 0 32 l 0 24 M -32 0 l -24 0" />
		</g>
		<g id="repetition" stroke-width="8" stroke-linecap="round" filter="url(#wobble)">
			<circle r="2" />
			<circle r="56" />
			<path
				d="M -56 -12 l -28 +28 M -56 -12 l +40 +28 A +28 +36 +340 0 0 +20 +6 M +56 +12 l +28 -28 M +56 +12 l -40 -28 A +28 +36 +340 0 0 -20 -6"
			/>
		</g>

		<g id="column" stroke-width="8" stroke-linecap="round" filter="url(#wobble)">
			<line x1="-24" y1="16" x2="24" y2="16" />
			<line x1="0" y1="16" x2="0" y2="-28" />
		</g>
		<g id="convergence" stroke-width="8" stroke-linejoin="round" filter="url(#wobble)">
			<polygon points="0,32 32,-20 -32,-20" />
		</g>
		<g
			id="bend"
			stroke-width="8"
			stroke-linecap="round"
			stroke-linejoin="round"
			filter="url(#wobble)"
		>
			<path d="M 0 0 l 0 32 l -16 -16 M 0 0 l 0 -32 l 16 16" />
		</g>
		<g
			id="purify"
			stroke-width="8"
			stroke-linecap="round"
			stroke-linejoin="round"
			filter="url(#wobble)"
		>
			<path d="M 0 10 C -16 -12 -48 40 4 36 C 40 20 20 -40 0 -40" />
		</g>
	</defs>

	<use href="#light" transform="scale(0.36)" />
	<use href="#purify" transform="rotate(22.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(67.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(112.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(157.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(-22.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(-67.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(-112.5) translate(0, -42) scale(0.3)" />
	<use href="#purify" transform="rotate(-157.5) translate(0, -42) scale(0.3)" />

	<circle r="64" stroke-width="2" filter="url(#wobble)" />

	<use href="#column" transform="rotate(24) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(66) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(114) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(156) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(-24) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(-66) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(-114) translate(0, 82) scale(0.3)" />
	<use href="#column" transform="rotate(-156) translate(0, 82) scale(0.3)" />

	<use href="#convergence" transform="rotate(45) translate(0, -82) scale(0.3)" />
	<use href="#convergence" transform="rotate(135) translate(0, -82) scale(0.3)" />
	<use href="#convergence" transform="rotate(-135) translate(0, -82) scale(0.3)" />
	<use href="#convergence" transform="rotate(-45) translate(0, -82) scale(0.3)" />

	<use href="#repetition" transform="rotate(0) translate(0, 82) scale(0.2)" />
	<use href="#repetition" transform="rotate(0) translate(0, -82) scale(0.2)" />
	<use href="#repetition" transform="rotate(90) translate(0, 82) scale(0.2)" />
	<use href="#repetition" transform="rotate(90) translate(0, -82) scale(0.2)" />

	<circle r="100" stroke-width="2" filter="url(#wobble)" />
</svg>

<style>
	svg.animate {
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
