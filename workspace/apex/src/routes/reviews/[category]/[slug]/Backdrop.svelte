<script lang="ts">
	import type { Items } from '$content/builder';

	interface Props {
		review: Omit<Items['/reviews'][number], 'branches' | 'flank'>;
	}
	const { review }: Props = $props();

	const prefix = review.backdrop.source === 'tmdb' && 'https://image.tmdb.org/t/p/w780/';
</script>

<div data-tier={review.tier} class="banner">
	<img src="{prefix || ''}{review.backdrop.path}" alt="{review.title} backdrop" />
	<a href="/reviews?tier={review.tier}">{review.tier}-Tier</a>

	<!-- TODO: figure out the UI
	<small class="composed">
		<span>Last seen on</span>
		<span>{dt.format(post.seen.first)('DD/MM/YYYY')} ({post.composed} days ago)</span>
	</small>
	-->
</div>

<style>
	div.banner {
		z-index: -1;
		opacity: 80%;
		width: 100%;
		inset: 0;
		position: absolute;

		margin: -1rem 0;
		border: none;
		border-radius: var(--rounding-box);

		&::after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			background: oklch(0 0 0 / 80%);
		}

		img {
			inset: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			object-fit: cover;
			border-radius: inherit;
		}

		a {
			z-index: 1;
			top: 0.5rem;
			left: 0.5rem;
			position: absolute;
			padding: 0.325rem 0.5rem;
			border-radius: var(--rounding-base);
			background: oklch(0 0 0 / 80%);
			font-family: var(--font-sans);
			font-size: var(--size-small);
		}
	}

	[data-tier] {
		&[data-tier='S'] {
			img {
				overflow: hidden;
				box-shadow:
					inset 0 1px 1px oklch(1 0 0 / 0.6),
					inset 0 -1px 1px oklch(0 0 0 / 0.2),
					0 0 4px oklch(85% 0.3 80 / 0.8),
					0 0 8px oklch(85% 0.3 80 / 0.6),
					0 0 16px oklch(85% 0.3 80 / 0.4),
					0 0 24px oklch(85% 0.3 80 / 0.3);

				animation: pulse 4s infinite ease-in-out;
			}
			a {
				background: oklch(85% 0.3 80);
				color: var(--color-base);
			}
		}
		&[data-tier='A'] {
			img {
				box-shadow:
					0 0 6px oklch(72% 0.2 340 / 0.7),
					0 0 14px oklch(72% 0.2 340 / 0.5);
			}
			a {
				background: oklch(70% 0.23 340);
				color: var(--color-base);
			}
		}
		&[data-tier='B'] {
			img {
				box-shadow:
					0 0 4px oklch(66% 0.17 255 / 0.3),
					0 0 8px oklch(66% 0.17 255 / 0.2);
			}
			a {
				background: oklch(66% 0.17 255);
				color: var(--color-base);
			}
		}

		&[data-tier='C'] {
			img {
				box-shadow:
					0 0 3px oklch(55% 0.18 145 / 0.3),
					0 0 6px oklch(55% 0.18 145 / 0.15);
			}
			a {
				background: oklch(72% 0.24 145);
				color: var(--color-base);
			}
		}

		&[data-tier='D'] {
			img {
				box-shadow:
					0 0 2px oklch(50% 0.08 60 / 0.15),
					0 0 4px oklch(50% 0.08 60 / 0.08);
			}
			a {
				background: oklch(40% 0.08 60);
			}
		}
	}

	/* .composed {
		z-index: 1;
		right: 0;
		top: calc(100% + 0.25rem);
		position: absolute;
		padding: 0.25rem;
		border-radius: var(--rounding-base);
		background: oklch(0 0 0 / 80%);
		transition-duration: var(--transition-base);
	} */

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) skewX(30deg);
		}
		70%,
		100% {
			transform: translateX(200%) skewX(30deg);
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
</style>
