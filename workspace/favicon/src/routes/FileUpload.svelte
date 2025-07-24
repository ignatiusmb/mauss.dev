<script lang="ts">
	import { on } from 'svelte/events';
	import { draw } from 'svelte/transition';
	import { sizes } from './processor.svelte';

	interface Props {
		onclick(data: { raw: string; sizes: typeof sizes }): Promise<void>;
		uploaded?(): void;
	}
	const { onclick, uploaded }: Props = $props();

	let files: FileList | undefined = $state();
	let dragging = $state(0);
</script>

<form enctype="multipart/form-data" onsubmit={(e) => e.preventDefault()}>
	<details>
		<summary>sizes to convert</summary>
		<div>
			{#each sizes as { name, canvas }, idx}
				<button
					class:selected={sizes[idx].selected}
					onclick={() => {
						sizes[idx].selected = !sizes[idx].selected;
					}}
				>
					<svg
						viewBox="0 0 256 256"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					>
						{#if sizes[idx].selected}
							<polyline points="88 136 112 160 168 104" transition:draw={{ duration: 150 }} />
						{/if}
						<rect x="40" y="40" width="176" height="176" rx="8" />
					</svg>
					<span>{name}</span>
					<small>({canvas}x{canvas})</small>
				</button>
			{/each}
		</div>
	</details>

	<button
		disabled={!files?.length || !sizes.filter((s) => s.selected).length}
		onclick={async () => {
			if (!files || files.length === 0) return;
			const svg = await files[0].text();
			const selected = sizes.filter((s) => s.selected);
			await onclick({ raw: svg, sizes: selected });
			files = undefined;
		}}
	>
		{sizes.some((s) => s.selected) ? 'convert and clear input' : 'select a size to convert'}
	</button>

	{#key files}
		{@const hover = (count: number) => (event: Event) => {
			event.preventDefault();
			console.log({ dragging });
			dragging += count;
		}}

		<label
			class:hovered={dragging !== 0}
			style:padding="{!files || files.length === 0 ? 4 : 2}rem 2rem"
			ondragenter={hover(1)}
			ondragover={hover(0)}
			ondragleave={hover(-1)}
			{@attach (zone) => {
				return on(zone, 'drop', (e) => {
					e.preventDefault();
					if (!e.dataTransfer) return;
					if (e.dataTransfer.files.length > 1) {
						alert('Please drop only one file.');
						return;
					}
					files = e.dataTransfer.files;
					dragging = 0;
					uploaded?.();
				});
			}}
		>
			<input type="file" accept=".svg" onchange={uploaded} bind:files />

			{#if !files || files.length === 0}
				<i data-icon="upload"></i>
				<span>drop a file or click to upload</span>
				<small>SVG <s>only</s> recommended</small>
			{:else}
				<img src={URL.createObjectURL(files[0])} alt="" />
			{/if}
		</label>
	{/key}
</form>

<style>
	form {
		display: grid;
		gap: 1rem;
		grid-template-columns: min(60ch, 100%);
		justify-content: center;

		> label {
			cursor: pointer;
			display: grid;
			gap: 0.5rem;
			justify-items: center;
			outline: 2px dashed var(--color-text);
			border-radius: var(--rounding-box);
			transition: var(--transition-base);

			&.hovered {
				outline-style: dotted;
				outline-offset: 0.25rem;
				background: var(--color-overlay);
			}

			img {
				user-select: none;
			}
		}
	}
	details {
		user-select: none;

		summary {
			padding: 0.5rem;
			border-radius: var(--rounding-base);

			&:hover,
			&:focus-within {
				background: var(--color-overlay);
			}
		}
		> div {
			display: grid;
			gap: 0.5rem;
			margin-top: 0.75rem;

			button {
				display: grid;
				gap: 0.5rem;
				align-items: center;
				grid-template-columns: auto 1fr auto;
				padding: 0.5rem;
				border-radius: var(--rounding-base);
				background: var(--color-base);

				&.selected {
					background: var(--color-surface);
				}

				&:hover,
				&:focus-within {
					background: var(--color-overlay);
				}

				svg {
					width: 1.5rem;
					height: 1.5rem;
				}
				span {
					text-align: left;
				}
			}
		}
	}

	button {
		padding: 0.5rem;
		border-radius: var(--rounding-base);
		color: var(--color-text);
		border: none;
		cursor: pointer;
		background: var(--color-surface);

		&:disabled {
			pointer-events: none;
			cursor: not-allowed;
			opacity: 0.5;
			color: var(--color-text-muted);
		}

		&:hover:not(:disabled) {
			background: var(--color-overlay);
		}
	}

	input[type='file'] {
		display: none;
	}

	form label i[data-icon] {
		width: 3rem;
		height: 3rem;

		&[data-icon='upload'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80"/><line x1="128" y1="128" x2="128" y2="24"/><polyline points="80 72 128 24 176 72"/><circle cx="188" cy="168" r="12"/></svg>');
		}
	}
</style>
