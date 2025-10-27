<svelte:options css="injected" />

<script lang="ts">
	interface Props {
		title: string;
		blurb: string;
		date?: string;
		footer?: string;
		series?: {
			title: string;
			chapter?: string;
		};
	}
	const { title, blurb, date, footer = '« mauss.dev »', series }: Props = $props();
	const count = (text: string) => text.split(' ').length;
</script>

<div>
	<section>
		{#if series}
			<header>
				<span>{series.title}</span>
				{#if series.chapter}
					<span style:color="#d79628">❃</span>
					<span>Chapter {series.chapter}</span>
				{/if}
			</header>
		{/if}

		<h1 class:balance={count(title) > 1}>{title}</h1>
		<p class:balance={count(blurb) > 1}>{blurb}</p>

		{#if date}
			<footer>
				<span>Alkamauss</span>
				<span style:color="#d79628">❃</span>
				<span>{date}</span>
			</footer>
		{:else if footer}
			<footer>{footer}</footer>
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
		gap: 0.5rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 3rem;
		border: 0.4rem solid #30323d;
		border-radius: 1rem;
		text-align: center;
	}

	h1 {
		font-size: 6rem;
	}

	p {
		line-height: 1.25;
		font-size: 2.1rem;
	}

	header,
	footer {
		position: absolute;
		display: flex;
		gap: 0.8rem;
		padding: 0 1.6rem;
		align-items: center;
		background: #050609;
		color: #c2c4cb;
	}
	header {
		top: -0.2rem;
		transform: translateY(-50%);
		font-size: 2.4rem;
	}
	footer {
		bottom: -0.2rem;
		transform: translateY(50%);
		font-size: 1.8rem;
	}

	.balance {
		text-wrap: balance;
	}
</style>
