<script lang="ts">
	interface Props {
		from: number;
		items: {
			href: string;
			label: string;
			icon: string;
		}[];
	}
	const { from, items }: Props = $props();
	const range = $derived.by(() => {
		const current = new Date().getFullYear();
		if (from === current) return from;
		return `${from}&ndash;${current}`;
	});
</script>

<footer>
	<section>
		<span>«</span>
		{#each items as { href, label, icon }}
			<a {href} aria-label={label}>
				<i data-icon={icon}></i>
			</a>
		{/each}
		<span>»</span>
	</section>

	<p>© {@html range} Ignatius Bagus.</p>
</footer>

<style>
	footer {
		grid-column: content;
		width: 100%;

		position: relative;
		display: grid;
		gap: 1rem;
		text-align: center;
		line-height: 1.5;
		font-size: var(--size-small);
	}
	section {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;

		span {
			width: 2rem;
			font-size: calc(var(--size-small) * 1.5);
		}

		a {
			flex: 0 1 4rem;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--color-text);
			outline: none;

			> i {
				transition-duration: var(--transition-base);
				transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}

			&:hover > i,
			&:focus > i {
				color: var(--color-accent-secondary);
				transform: scale(1.5) translateY(-25%);
			}
		}
	}
</style>
