<script lang="ts">
	import type { Items } from '$content/builder';

	type Tier = Items['/reviews'][number]['tier'];
	interface Props {
		tier?: Tier;
	}
	const { tier }: Props = $props();
</script>

<span data-tier={tier}>{tier}</span>

<style>
	span {
		position: relative;
		padding: 0.3rem 0;
		border-top-left-radius: var(--rounding-base);
		/* border-radius: var(--rounding-base); */
	}

	span[data-tier='S'] {
		overflow: hidden;
		/* outline: 1px solid oklch(75% 0.25 100 / 0.8); */
		background: linear-gradient(
			-135deg,
			oklch(92% 0.32 80),
			oklch(85% 0.3 80) 60%,
			oklch(70% 0.25 100)
		);
		/* box-shadow:
			inset 0 1px 1px oklch(1 0 0 / 0.6),
			inset 0 -1px 1px oklch(0 0 0 / 0.2),
			0 0 4px oklch(85% 0.3 80 / 0.8),
			0 0 8px oklch(85% 0.3 80 / 0.6),
			0 0 16px oklch(85% 0.3 80 / 0.4),
			0 0 24px oklch(85% 0.3 80 / 0.3); */
		text-shadow:
			0 0 2px oklch(100% 0.2 85 / 0.7),
			0 0 6px oklch(100% 0.2 85 / 0.5),
			0 0 12px oklch(100% 0.2 85 / 0.4);
		color: var(--color-base);
		font-weight: 600;

		/* animation: pulse 4s infinite ease-in-out; */

		/* &::after {
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
			mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);

			animation: shimmer 4s infinite linear;
			animation-delay: 300ms;
		} */
	}
	@keyframes shimmer {
		0% {
			/* TODO: see if skewing the other way works */
			transform: translateX(-100%) skewX(-20deg);
		}
		70%,
		100% {
			transform: translateX(200%) skewX(-20deg);
		}
	}
	@keyframes pulse {
		0%,
		70%,
		100% {
			box-shadow:
				inset 0 1px 1px oklch(1 0 0 / 0.6),
				inset 0 -1px 1px oklch(0 0 0 / 0.2),
				0 0 4px oklch(85% 0.3 80 / 0.8),
				0 0 8px oklch(85% 0.3 80 / 0.6),
				0 0 16px oklch(85% 0.3 80 / 0.4),
				0 0 24px oklch(85% 0.3 80 / 0.3);
		}
		35% {
			box-shadow:
				inset 0 1px 1px oklch(1 0 0 / 0.6),
				inset 0 -1px 1px oklch(0 0 0 / 0.2),
				0 0 6px oklch(85% 0.3 80 / 1),
				0 0 12px oklch(85% 0.3 80 / 0.8),
				0 0 20px oklch(85% 0.3 80 / 0.6),
				0 0 30px oklch(85% 0.3 80 / 0.4);
		}
	}

	span[data-tier='A'] {
		/* outline: 1px solid oklch(72% 0.2 340 / 0.85); */
		background: oklch(70% 0.23 340);
		color: var(--color-base);
		background: linear-gradient(
			135deg,
			oklch(78% 0.25 320),
			oklch(70% 0.23 340) 60%,
			oklch(58% 0.22 320)
		);
		box-shadow:
			0 0 3px oklch(72% 0.2 340 / 0.5),
			0 0 6px oklch(72% 0.2 340 / 0.3);
		/* text-shadow: 0 0 1px oklch(98% 0.1 340 / 0.4); */

		/* animation: glowPulseA 3.6s infinite alternate ease-in-out; */
	}
	@keyframes glowPulseA {
		from {
			box-shadow:
				0 0 4px oklch(72% 0.2 340 / 0.5),
				0 0 10px oklch(72% 0.2 340 / 0.3);
		}
		to {
			box-shadow:
				0 0 6px oklch(72% 0.2 340 / 0.7),
				0 0 14px oklch(72% 0.2 340 / 0.5);
		}
	}

	span[data-tier='B'] {
		outline: 1px solid oklch(65% 0.18 260 / 0.7);
		background: linear-gradient(135deg, oklch(76% 0.2 250), oklch(66% 0.17 255));
		box-shadow:
			0 0 2px oklch(68% 0.16 255 / 0.3),
			0 0 4px oklch(68% 0.16 255 / 0.2);
		text-shadow: 0 0 1px oklch(100% 0.05 255 / 0.3);
	}

	span[data-tier='C'] {
		outline: 1px solid oklch(60% 0.12 150 / 0.4);
		background: linear-gradient(135deg, oklch(66% 0.12 145), oklch(74% 0.13 140));
		box-shadow: inset 0 1px 2px oklch(50% 0.05 140 / 0.2);
		color: oklch(20% 0.02 140);
	}

	span[data-tier='D'] {
		outline: 1px solid oklch(50% 0.04 120 / 0.3);
		background: oklch(64% 0.04 120);
		box-shadow: none;
		opacity: 0.7;
		color: oklch(25% 0.01 120);
	}

	span[data-tier='?'] {
		background: var(--color-text);
		color: var(--color-base);
	}
</style>
