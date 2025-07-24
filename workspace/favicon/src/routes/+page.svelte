<script lang="ts">
	import FileUpload from './FileUpload.svelte';
	import { zip } from './processor.svelte';

	const outputs: Array<{ name: string; size: number; blob: Blob }> = $state([]);
</script>

<FileUpload
	uploaded={() => (outputs.length = 0)}
	onclick={async ({ raw, sizes }) => {
		for (const { name, image, canvas, convert } of sizes) {
			const blob = await convert(raw, image, canvas);
			outputs.push({ name, size: canvas, blob });
		}
	}}
/>

{#if outputs.length > 0}
	<div class="files">
		<h2>
			<span>Files</span>
			{#await zip(outputs) then zipped}
				<a href={URL.createObjectURL(zipped)} download="favicon.zip">
					<i data-icon="download"></i>
					<span>favicon.zip</span>
					<i data-icon="file-archive"></i>
				</a>
			{/await}
		</h2>
		<div>
			{#each outputs as { name, size, blob }}
				<a href={URL.createObjectURL(blob)} download={name}>
					<i data-icon="download"></i>
					<span>{name}</span>
					<span>({size}x{size})</span>
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	.files {
		display: grid;
		gap: 1rem;

		h2 {
			display: grid;
			gap: 0.5rem;
			align-items: center;
			grid-template-columns: auto 1fr;

			a {
				font-size: 1rem;
				background: var(--color-surface);
				&:hover {
					background: var(--color-overlay);
				}
			}
		}

		> div {
			display: grid;
			gap: 0.5rem;
			padding: 0.5rem;
			border: 1px solid var(--color-text);
			border-radius: var(--rounding-box);
		}

		a {
			display: grid;
			gap: 0.5rem;
			align-items: center;
			grid-template-columns: auto 1fr auto;
			padding: 0.5rem;
			border-radius: var(--rounding-base);
			text-decoration: none;

			&:hover {
				background: var(--color-surface);
			}
		}
	}

	i[data-icon] {
		&[data-icon='download'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M184,128h40a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H72"/><line x1="128" y1="24" x2="128" y2="128"/><polyline points="80 80 128 128 176 80"/><circle cx="188" cy="168" r="12"/></svg>');
		}
		&[data-icon='file-archive'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="152 32 152 88 208 88"/><path d="M200,224a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8Z"/><line x1="104" y1="224" x2="104" y2="112"/><line x1="88" y1="160" x2="120" y2="160"/><line x1="88" y1="128" x2="120" y2="128"/><line x1="88" y1="192" x2="120" y2="192"/></svg>');
		}
	}
</style>
