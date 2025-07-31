<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Article from '$lib/pages/Article.svelte';
	const principles: Array<{
		icon: string;
		id: string;
		title: string;
		content: string[];
	}> = [
		{
			icon: 'pen-nib',
			id: 'authorship-intent',
			title: 'authorship & intent',
			content: [
				"everything here is written from a personal lens — shaped by my own thoughts, experiences, and interpretations. unless stated otherwise, it does not represent any group or institution. you're encouraged to read through your own perspective.",
			],
		},
		{
			icon: 'quotes',
			id: 'reviews-perspective',
			title: 'reviews & perspective',
			content: [
				"despite the name, reviews aren't ratings or verdicts — just reflections from my own perspective. i don't write to steer your view, only to offer mine. if something in it helps you decide what resonates, that's enough.",
			],
		},

		{
			icon: 'shield-check',
			id: 'accuracy-limitations',
			title: 'accuracy & limitations',
			content: [
				"i aim for thoughtfulness and factual accuracy, but things may change or become outdated over time. how you interpret or apply what's here is up to you — no guarantees, no liabilities.",
			],
		},
		{
			icon: 'handshake',
			id: 'recommendations',
			title: 'recommendations',
			content: [
				"i don't accept compensation or incentives for mentions. if i include something, it's because i use and believe in it. all links and references reflect independent judgment — the editorial voice is mine alone.",
			],
		},

		{
			icon: 'globe',
			id: 'external-links',
			title: 'external links',
			content: [
				"this site links to external resources i don't control. they're provided for context or exploration — not as endorsements, nor as signs of full agreement with everything found there.",
			],
		},
		{
			icon: 'copyright',
			id: 'media-use',
			title: 'media & fair use',
			content: [
				'quotes, screenshots, and media are used under fair use — for commentary, critique, documentation, or reference. all visual and written works belong to their original creators unless noted otherwise.',
			],
		},

		{
			icon: 'chats',
			id: 'discussion-invitation',
			title: 'discussion welcome',
			content: [
				"if you see things differently, i'm open to hearing your take. good conversations often begin in disagreement and lead to insight.",
			],
		},
		{
			icon: 'cookie',
			id: 'privacy-principles',
			title: 'privacy principles',
			content: [
				"this site doesn't track you or collect personal data — no ad networks, no third-party analytics, no profiling. anonymous and minimal logs may exist to understand basic usage. only essential first-party cookies are used during authentication.",
			],
		},
	];
</script>

<header>
	<h1>underpinnings</h1>
	<small>foundational support.</small>
</header>

<Article>
	<!-- prettier-ignore -->
	<p>this page outlines how this site operates and where it stands. it's not legalese — just a clear statement of the principles beneath it. i believe in transparency, and if you're spending time here, it's only fair you know the ground it's built on.</p>

	<Index summary="Principles" items={principles.map(({ id, title }) => ({ id, title }))} />
	{#each principles as { id, icon, title, content }}
		<h2 {id}>
			<i data-icon={icon}></i>
			<span>{title}</span>
		</h2>
		{#each content as text}
			<p>{text}</p>
		{/each}
	{/each}
</Article>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	h2 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;

			&[data-icon='chats'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M71.58,144,32,176V48a8,8,0,0,1,8-8H168a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z"/><path d="M80,144v40a8,8,0,0,0,8,8h96.42L224,224V96a8,8,0,0,0-8-8H176"/></svg>');
			}
			&[data-icon='cookie'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="156" cy="172" r="10"/><circle cx="92" cy="164" r="10"/><circle cx="84" cy="108" r="10"/><circle cx="132" cy="124" r="10"/><path d="M224,128a48,48,0,0,1-48-48,48,48,0,0,1-48-48,96,96,0,1,0,96,96Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>');
			}
			&[data-icon='copyright'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="128" cy="128" r="96"/><path d="M160,152a40,40,0,1,1,0-48"/></svg>');
			}
			&[data-icon='globe'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="128" cy="128" r="96"/><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z"/><line x1="37.46" y1="96" x2="218.54" y2="96"/><line x1="37.46" y1="160" x2="218.54" y2="160"/></svg>');
			}
			&[data-icon='handshake'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="200 152 160 192 96 176 40 136"/><polyline points="72.68 70.63 128 56 183.32 70.63"/><path d="M34.37,60.42,8.85,111.48a8,8,0,0,0,3.57,10.73L40,136,72.68,70.63,45.11,56.85A8,8,0,0,0,34.37,60.42Z"/><path d="M216,136l27.58-13.79a8,8,0,0,0,3.57-10.73L221.63,60.42a8,8,0,0,0-10.74-3.57L183.32,70.63Z"/><path d="M184,72H144L98.34,116.29a8,8,0,0,0,1.38,12.42C117.23,139.9,141,139.13,160,120l40,32,16-16"/><polyline points="124.06 216 82.34 205.57 56 186.75"/></svg>');
			}
			&[data-icon='quotes'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M108,144H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h60a8,8,0,0,1,8,8v88a40,40,0,0,1-40,40"/><path d="M224,144H156a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h60a8,8,0,0,1,8,8v88a40,40,0,0,1-40,40"/></svg>');
			}
			&[data-icon='shield-check'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z"/><polyline points="88 136 112 160 168 104"/></svg>');
			}
		}
	}
</style>
