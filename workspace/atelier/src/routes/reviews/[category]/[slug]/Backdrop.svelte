<script lang="ts">
	interface Props {
		post: {
			backdrop?: string;
			rating?: number;
			title: string | { short?: string; en?: string; jp?: string };
		};
	}
	const { post }: Props = $props();
</script>

<div class="banner">
	<img
		src={post.backdrop}
		alt="{typeof post.title === 'string' ? post.title : post.title.short || post.title.en} backdrop"
	/>

	<small class="rating">⭐ {post.rating}</small>

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
	}

	.rating {
		z-index: 1;
		top: 0.5rem;
		left: 0.5rem;
		position: absolute;
		padding: 0.25rem 0.5rem 0.25rem 0.25rem;
		border-radius: var(--rounding-base);
		background: oklch(0 0 0 / 80%);
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
</style>
