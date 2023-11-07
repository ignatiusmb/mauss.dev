<script lang="ts">
	export let items: Array<{ id: string; title: string }>;
</script>

<details id="index">
	<summary>Article Index</summary>
	<p>
		{#each items as { id, title }}
			<a href="#{id}">{title}</a>
		{/each}
	</p>
</details>

<style>
	details {
		--radius: calc(var(--b-radius));
		margin-bottom: 1rem;
		border-radius: var(--radius);
		background: rgba(255, 255, 255, 0.1);
	}
	summary {
		padding: 0.5rem 1rem;
		margin: 0;
		border: 1px solid rgba(124, 124, 124, 0.7);
		border-radius: var(--radius);
	}
	summary::marker {
		text-align: right;
	}
	p {
		display: grid;
		margin: 0;
		font-size: 1rem;
	}
	a {
		padding: 0.25rem 1rem;
		color: inherit;
	}
	a:last-child {
		border-bottom-right-radius: var(--radius);
		border-bottom-left-radius: var(--radius);
	}
	a:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	details[open] {
		border: 1px solid rgba(124, 124, 124, 0.7);
	}
	details[open] summary {
		margin-bottom: 0;
		border-width: 0;
		border-bottom-width: 1px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
