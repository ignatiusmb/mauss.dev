<script lang="ts">
	import type { Items } from '$content/builder';

	type Tier = Items['/reviews'][number]['tier'];
	interface Props {
		tier?: Tier;
	}
	const { tier = '?' }: Props = $props();
</script>

<span data-tier={tier}>{tier}</span>

<style>
	span {
		position: relative;
		padding: 0.3rem;
		border-radius: var(--rounding-base);
		background: var(--color-base);
	}
	span[data-tier='S'] {
		overflow: hidden;
		outline: 1px solid oklch(75% 0.25 100 / 0.8);
		background: linear-gradient(
			135deg,
			oklch(92% 0.32 80),
			oklch(85% 0.3 80) 60%,
			oklch(70% 0.25 100)
		);
		box-shadow:
			inset 0 1px 1px oklch(1 0 0 / 0.6),
			inset 0 -1px 1px oklch(0 0 0 / 0.1),
			0 0 8px oklch(85% 0.3 80 / 0.6);
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
		color: var(--color-base);
		font-weight: 600;

		&::after {
			content: '';
			pointer-events: none;
			position: absolute;
			top: 0;
			left: -50%;
			width: 200%;
			height: 100%;
			background: linear-gradient(
				120deg,
				transparent 0%,
				oklch(1 0 0 / 40%) 35%,
				oklch(1 0 0 / 50%) 50%,
				oklch(1 0 0 / 40%) 65%,
				transparent 100%
			);
			opacity: 0.8;
			filter: blur(1.2px);
			animation: shimmer 2.5s infinite linear;
			mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) skewX(-20deg);
		}
		100% {
			transform: translateX(200%) skewX(-20deg);
		}
	}
</style>
