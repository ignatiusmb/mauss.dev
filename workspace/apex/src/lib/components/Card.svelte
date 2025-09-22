<svelte:options css="injected" />

<script lang="ts">
	interface Props {
		title: string;
		blurb: string;
		date?: string;
		footer?: string;
	}
	let { title, blurb, date, footer }: Props = $props();
</script>

<div>
	<section>
		<h1>{title}</h1>
		<p>{blurb}</p>
		{#if footer}
			<footer>{footer}</footer>
		{:else if date}
			<footer>
				<span>Alkamauss</span>
				<span style:color="#d79628">❃</span>
				<span>{date}</span>
			</footer>
		{/if}
	</section>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 3rem;
		background: #050609;
		color: #dee0e5;
		font-family: 'Newsreader';
	}

	section {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 3rem;
		border: 0.4rem solid #30323d;
		border-radius: 1rem;
		text-align: center;
	}

	h1 {
		margin-top: auto;
		font-size: 6rem;
		text-wrap: balance;
	}

	p {
		margin: 0.5rem 0 auto 0;
		font-size: 2rem;
		text-wrap: balance;
	}

	footer {
		position: absolute;
		bottom: -0.2rem;
		display: flex;
		gap: 0.5rem;
		padding: 0 1rem;
		align-items: center;
		background: #050609;
		color: #c2c4cb;
		font-size: 1.8rem;
		transform: translateY(50%);
	}
</style>
