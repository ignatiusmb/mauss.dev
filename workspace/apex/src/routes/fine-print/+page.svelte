<script>
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<h1>fine print</h1>

	<h2>
		<i data-icon="user-focus"></i>
		<span>personal views</span>
	</h2>
	<!-- prettier-ignore -->
	<p>everything written here reflects my own opinions and experiences. they do not represent any past, present, or future affiliations or organizations i'm connected to.</p>

	<h2>
		<i data-icon="handshake"></i>
		<span>affiliate discretion</span>
	</h2>
	<!-- prettier-ignore -->
	<p>i don't accept compensation to promote products or services. any recommendations are based on personal use or extensive research — shared because i believe they might be genuinely useful to you. editorial choices are never influenced by advertisers or affiliate links.</p>

	<h2>
		<i data-icon="notepad"></i>
		<span>content reviews</span>
	</h2>
	<!-- prettier-ignore -->
	<p>my reviews are done in spare time, mostly as an outlet of appreciation — a way to support the creators behind the work. they're not definitive verdicts, but reflections that might help you decide whether the content resonates with you.</p>

	<h2>
		<i data-icon="chats"></i>
		<span>open to discourse</span>
	</h2>
	<!-- prettier-ignore -->
	<p>if you disagree with anything i've shared, i welcome discussion. it's always insightful to understand different perspectives and how we arrive at our conclusions.</p>
</Article>

<style>
	h2 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;

			&[data-icon='chats'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M71.58,144,32,176V48a8,8,0,0,1,8-8H168a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z"/><path d="M80,144v40a8,8,0,0,0,8,8h96.42L224,224V96a8,8,0,0,0-8-8H176"/></svg>');
			}
			&[data-icon='handshake'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="200 152 160 192 96 176 40 136"/><polyline points="72.68 70.63 128 56 183.32 70.63"/><path d="M34.37,60.42,8.85,111.48a8,8,0,0,0,3.57,10.73L40,136,72.68,70.63,45.11,56.85A8,8,0,0,0,34.37,60.42Z"/><path d="M216,136l27.58-13.79a8,8,0,0,0,3.57-10.73L221.63,60.42a8,8,0,0,0-10.74-3.57L183.32,70.63Z"/><path d="M184,72H144L98.34,116.29a8,8,0,0,0,1.38,12.42C117.23,139.9,141,139.13,160,120l40,32,16-16"/><polyline points="124.06 216 82.34 205.57 56 186.75"/></svg>');
			}
			&[data-icon='notepad'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="96" y1="128" x2="160" y2="128"/><line x1="96" y1="160" x2="160" y2="160"/><path d="M48,40H208a0,0,0,0,1,0,0V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24V40A0,0,0,0,1,48,40Z"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="128" y1="24" x2="128" y2="56"/><line x1="176" y1="24" x2="176" y2="56"/></svg>');
			}
			&[data-icon='user-focus'] {
				--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="180 40 216 40 216 76"/><polyline points="180 216 216 216 216 180"/><polyline points="76 216 40 216 40 180"/><polyline points="76 40 40 40 40 76"/><circle cx="128" cy="112" r="32"/><path d="M80,168a60,60,0,0,1,96,0"/></svg>');
			}
		}
	}
</style>
