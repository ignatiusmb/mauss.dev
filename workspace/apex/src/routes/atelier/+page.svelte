<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Project from './Project.svelte';

	const alkamauss = $state({
		atelier: true,
		aubade: true,
		favicon: true,
	});
	const modules = $state({
		mauss: true,
		syv: true,
		'prettier-plugin-sort-package-json': true,
		'@ignatiusmb/styles': true,
	});
	const blueprints = $state({
		starter: true,
	});

	const balance = $derived({
		alkamauss: Object.values(alkamauss).reduce((a, c) => a + (c ? 1 : -1), 0),
		modules: Object.values(modules).reduce((a, c) => a + (c ? 1 : -1), 0),
		blueprints: Object.values(blueprints).reduce((a, c) => a + (c ? 1 : -1), 0),
	});

	function toggle(state: Record<string, boolean>, key: keyof typeof balance) {
		const opposite = balance[key] <= 0;
		return () => {
			for (const key in state) state[key] = opposite;
		};
	}
</script>

<header>
	<h1>manifestations</h1>
	<small>the exhibition wing.</small>
</header>

<div id="layout">
	<h3>
		<div>
			<i data-icon="potted-plant"></i>
			<span>alkamauss</span>
		</div>
		<button aria-label="toggle notes" onclick={toggle(alkamauss, 'alkamauss')}>
			<i data-icon="arrows-{balance.alkamauss <= 0 ? 'out' : 'in'}-line-vertical"></i>
		</button>
	</h3>

	<Project link="/atelier" name="Alkamauss" est="2017" bind:open={alkamauss['atelier']}>
		{@const ongoing = new Date().getFullYear() - 2017}

		{#snippet logo()}
			<Logo animate />
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>the digital atelier — where it all starts</strong>. a personal workspace and reference, the ideas that grew with my needs, the dumps from my mind, the curated content i wished i had, the list of things that i care about, everything i cherished in one place. a living archive.</p>
		<ul>
			<!-- prettier-ignore -->
			<li>kept the <a href="https://github.com/ignatiusmb/mauss.dev">codebase</a> lean and current for around <em>{ongoing} years</em> now</li>
			<li>developed a personal design system, with responsive and native css workflows</li>
			<li>hand-crafted svg logos and favicons, every path and shape written from scratch</li>
			<!-- @TODO: see /help#colophon -->
			<!-- prettier-ignore -->
			<!-- <li>integrated <a href="https://svelte.dev">sveltekit</a> with <a href="https://pocketbase.io">pocketbase</a> for full-stack, server-side workflows</li> -->
			<li>experimented with git submodules — not the way to go</li>
			<li>maintained a monorepo with clean internal tooling and streamlined workflows</li>
			<!-- prettier-ignore -->
			<li>evolved best practices for javascript and ts — later distilled into <a href="#mauss">mauss</a></li>
			<!-- prettier-ignore -->
			<li>evolved best practices for svelte and kit — later distilled into <a href="#syv">syv</a></li>
		</ul>
	</Project>

	<Project
		link="https://aubade.mauss.dev"
		name="Aubade"
		est="2019-11"
		bind:open={alkamauss['aubade']}
	>
		{#snippet logo()}
			<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M480 94.641C517.128 73.2051 562.872 73.2051 600 94.641L895.692 265.359C932.82 286.795 955.692 326.41 955.692 369.282V710.718C955.692 753.59 932.82 793.205 895.692 814.641L600 985.359C562.872 1006.79 517.128 1006.79 480 985.359L184.308 814.641C147.18 793.205 124.308 753.59 124.308 710.718V369.282C124.308 326.41 147.18 286.795 184.308 265.359L480 94.641Z"
					fill="#0070BB"
				/>
				<path
					d="M393.865 377C409.942 349.154 439.654 332 471.808 332L607.885 332C640.038 332 669.75 349.154 685.827 377L753.865 494.846C769.942 522.692 769.942 557 753.865 584.846L685.827 702.692C669.75 730.538 640.038 747.692 607.885 747.692L471.808 747.692C439.654 747.692 409.942 730.538 393.865 702.692L325.827 584.846C309.75 557 309.75 522.692 325.827 494.846L393.865 377Z"
					fill="white"
				/>
			</svg>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>filesystem-based content processor</strong>. shaped by a long-standing need to fully own and preserve my content, <em>aubade</em> treats your filesystem as a database. it recursively processes directories containing at least one markdown file, turning it and its sibling files into structured data.</p>
		<ul>
			<li>built a recursive file reader that transforms directories into structured JSON</li>
			<li>wrote a minimal, dependency-free YAML-like parser from scratch</li>
			<li>implemented safe, static metadata injection directly into markdown content</li>
			<li>designed a table of contents generator with nested, stable heading anchors</li>
			<li>wrote a transformer that links sibling entries in a sorted list</li>
			<li>explored static code highlighting with zero runtime cost</li>
			<li>no-build native JS with JSDoc is nice, but writing TS with strict inference is better</li>
		</ul>
	</Project>

	<Project
		link="https://favicon.mauss.dev"
		name="SVG to Favicon"
		est="2025-07"
		bind:open={alkamauss['favicon']}
	>
		{#snippet logo()}
			<Logo />
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>minimal SVG to favicon generator</strong>. generates a complete favicon set from a single SVG, <a href="/posts/svg-to-favicon">read more</a>.</p>
		<ul>
			<li>explored SVG-to-raster conversion using canvas</li>
			<li>wrote a pure JavaScript ICO encoder that embeds a PNG file</li>
			<li>built a minimal interface for uploading and downloading assets</li>
			<li>wrote a pure JavaScript ZIP archiver to bundle the generated files</li>
			<li>
				explored SvelteKit's <code>bundleStrategy: 'inline'</code> for a self-contained HTML file
			</li>
		</ul>
	</Project>

	<h3>
		<div>
			<i data-icon="package"></i>
			<span>modules</span>
		</div>
		<button aria-label="toggle notes" onclick={toggle(modules, 'modules')}>
			<i data-icon="arrows-{balance.modules <= 0 ? 'out' : 'in'}-line-vertical"></i>
		</button>
	</h3>

	<Project
		link="https://www.npmjs.com/package/mauss"
		name="mauss"
		est="2020-12"
		bind:open={modules['mauss']}
	>
		{#snippet logo()}
			<i data-image="npm"></i>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>practical functions and reusable configurations</strong>. lightweight utilities for modern JavaScript and TypeScript with zero dependencies, designed for clarity and composability with minimal runtime footprint.</p>
		<ul>
			<li>finally cracked shared config: one install, one link, and it's good to go</li>
			<li>learned how to design functional utilities that stay pure and composable</li>
			<li>figured out clean patterns for making utilities SSR-safe by default</li>
			<li>explored tree-shakeability and how to enforce it through structure</li>
			<li>organized modules by concern, not by type — clarity over convention</li>
			<li>refined my taste for naming, defaults, and safe fallback behaviors</li>
		</ul>
	</Project>
	<Project
		link="https://www.npmjs.com/package/syv"
		name="syv"
		est="2021-06"
		bind:open={modules['syv']}
	>
		{#snippet logo()}
			<i data-image="npm"></i>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>practical svelte components and utilities</strong>. lightweight, idiomatic building blocks with thoughtful APIs: not just reusable, but adaptable. each piece shaped by real needs and refined until it disappears into the flow of the app.</p>
		<ul>
			<li>designed intuitive submodules to keep the scope focused and scalable</li>
			<li>prioritized SSR-first and progressive enhancement from the start</li>
			<li>learned how to build components that feel native to Svelte, not bolted on</li>
			<li>built single-purpose drop-ins that quietly do everything they should</li>
			<li>shaped APIs to balance clean abstraction with hands-on control</li>
		</ul>
	</Project>
	<Project
		link="https://www.npmjs.com/package/prettier-plugin-sort-package-json"
		name="prettier-plugin-sort-package-json"
		est="2023-07"
		bind:open={modules['prettier-plugin-sort-package-json']}
	>
		{#snippet logo()}
			<i data-image="npm"></i>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>opinionated formatting powered by Prettier</strong>. made to keep <code>package.json</code> files clean and consistent, it sorts top-level keys in the order that i think makes sense, and exposes a parser for package-like files with different names.</p>
		<ul>
			<li>learned how Prettier's plugin system works under the hood</li>
			<li>figured out how to support custom files without muddying user config</li>
			<li>felt the quiet joy of something that just works — and never thinking about it again</li>
		</ul>
		<!-- prettier-ignore -->
		<p>part of <a href="https://github.com/ignatiusmb/prettier-plugin-suite" target="_blank">ignatiusmb/prettier-plugin-suite</a></p>
	</Project>
	<Project
		link="https://www.npmjs.com/package/@ignatiusmb/styles"
		name="@ignatiusmb/styles"
		est="2022-12"
		bind:open={modules['@ignatiusmb/styles']}
	>
		{#snippet logo()}
			<i data-image="npm"></i>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>my base stylesheet — a minimal, opinionated layer of typographic and layout defaults</strong>. a tiny css file that i reach for in every project for a clean and consistent styling. it's my reset and my design sense in single file.</p>
		<ul>
			<li>refined my baseline styles into something i could reuse everywhere</li>
			<li>learned how little css you actually need to feel at home in a new project</li>
		</ul>
	</Project>

	<h3>
		<div>
			<i data-icon="blueprint"></i>
			<span>blueprints</span>
		</div>
		<button aria-label="toggle notes" onclick={toggle(blueprints, 'blueprints')}>
			<i data-icon="arrows-{balance.blueprints <= 0 ? 'out' : 'in'}-line-vertical"></i>
		</button>
	</h3>

	<Project
		link="https://github.com/ignatiusmb/starter"
		name="ignatiusmb/starter"
		est="2023-06"
		bind:open={blueprints['starter']}
	>
		{#snippet logo()}
			<i data-image="github"></i>
		{/snippet}

		<!-- prettier-ignore -->
		<p><strong>a personal starter template — download, unzip, and start building</strong>. it's the setup i reach for every time. it's got everything i need, and nothing i don't.</p>
		<ul>
			<li>trimmed setup scripts, config files, and folder structure down to the essentials</li>
		</ul>
	</Project>
</div>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	#layout {
		max-width: 80ch;
		width: 100%;
		display: grid;
		gap: 1rem;
		justify-self: center;

		h3 {
			scroll-margin-top: 4rem;
			display: flex;
			justify-content: space-between;
			margin: 1.5rem 0 -0.25rem;
			color: oklch(1 0 0 / 80%);

			div {
				display: grid;
				gap: 0.5rem;
				align-items: center;
				grid-template-columns: auto auto;
			}

			button {
				display: inline-flex;
				align-items: center;
				padding: 0.25rem;
				border-radius: var(--rounding-base);
				color: currentColor;

				&:hover {
					background: var(--color-overlay);
				}

				&:focus {
					outline: 2px solid var(--color-border);
				}
			}
		}

		ul {
			padding-left: 1.25rem;
		}
	}

	i[data-image] {
		width: calc(var(--size, 1.875rem) * 0.8);
		height: calc(var(--size, 1.875rem) * 0.8);
		background: currentColor var(--svg) no-repeat center / contain;

		&[data-image='github'] {
			background-color: inherit;
			--svg: url('data:image/svg+xml,<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>');
		}
		&[data-image='npm'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="%23c12127" d="M0,16V0H16V16ZM3,3V13H8V5h3v8h2V3Z"/><path fill="white" d="M3,3H13V13H11V5H8v8H3Z"/></svg>');
		}
	}

	i[data-icon] {
		&[data-icon='arrows-in-line-vertical'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="216" y1="128" x2="40" y2="128"/><line x1="128" y1="16" x2="128" y2="96"/><polyline points="160 64 128 96 96 64"/><line x1="128" y1="240" x2="128" y2="160"/><polyline points="96 192 128 160 160 192"/></svg>');
		}
		&[data-icon='arrows-out-line-vertical'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="216" y1="128" x2="40" y2="128"/><line x1="128" y1="96" x2="128" y2="16"/><polyline points="96 48 128 16 160 48"/><line x1="128" y1="160" x2="128" y2="240"/><polyline points="160 208 128 240 96 208"/></svg>');
		}
		&[data-icon='blueprint'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M24,176V64A24,24,0,0,1,48,40H64V152H48a24,24,0,0,0,0,48H232V64H64"/><line x1="128" y1="96" x2="128" y2="160"/><line x1="168" y1="96" x2="168" y2="160"/><line x1="104" y1="112" x2="192" y2="112"/><line x1="104" y1="144" x2="192" y2="144"/></svg>');
		}
		&[data-icon='package'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="128" y1="129.09" x2="128" y2="231.97"/><polyline points="32.7 76.92 128 129.08 223.3 76.92"/><path d="M219.84,182.84l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18a8,8,0,0,1,4.16,7v95.64A8,8,0,0,1,219.84,182.84Z"/><polyline points="81.56 48.31 176 100 176 152"/></svg>');
		}
		&[data-icon='potted-plant'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M144.28,111.72c-25.08-41.81,8.36-83.61,79.43-79.43C227.89,103.36,186.09,136.8,144.28,111.72Z"/><path d="M98,114c18.24-30.41-6.08-60.81-57.77-57.77C37.17,107.9,67.57,132.22,98,114Z"/><line x1="56" y1="152" x2="200" y2="152"/><path d="M184,152l-14.61,65.74a8,8,0,0,1-7.81,6.26H94.42a8,8,0,0,1-7.81-6.26L72,152"/><line x1="144.28" y1="111.72" x2="104" y2="152"/><line x1="97.98" y1="113.98" x2="120" y2="136"/></svg>');
		}
	}
</style>
