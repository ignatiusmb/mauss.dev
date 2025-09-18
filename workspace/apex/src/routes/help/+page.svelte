<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Piece from '$lib/components/Piece.svelte';
	import { page } from '$app/state';
</script>

<header>
	<h1>safe harbor</h1>
	<small>calm shores, charted for you.</small>
</header>

<Piece>
	<!-- prettier-ignore -->
	<p><strong>welcome</strong> — you've made port at the harbor of my digital garden, a kind of virtual abode nestled in a quiet corner of the internet. i hope this page can be your guiding compass, should you lose your bearings or wonder where to go next.</p>
	<!-- prettier-ignore -->
	<p>the garden is always <em>under construction</em>, slowly taking shape as i plant new seeds and tend old growth. in time, whether wandered by many or none, it may become a garden worth returning to.</p>

	<hr />

	<!-- prettier-ignore -->
	<p>the index is a <em>collapsible</em> overview of the page and a way to jump between sections or sub-sections. you'll mostly see this in articles with headings, so you can navigate with ease.</p>
	<Index
		summary="Dockside Chart"
		items={[
			{ id: 'atelier', title: '/atelier' },
			{ id: 'curated', title: '/curated' },
			{ id: 'curated-essence', title: 'essence', level: 3 },
			{ id: 'curated-harvest', title: 'harvest', level: 3 },
			{ id: 'posts', title: '/posts' },
			{ id: 'posts-themes', title: 'themes', level: 3 },
			{ id: 'reviews', title: '/reviews' },
			{ id: 'reviews-how-i-review', title: 'how i review', level: 3 },
			{ id: 'reviews-tiers', title: 'tiers', level: 3 },
			{ id: 'reviews-attributions', title: 'attributions', level: 3 },
			{ id: 'other-paths', title: 'other paths' },
			{ id: 'other-paths-help', title: '/help', level: 3 },
			{ id: 'other-paths-about', title: '/about', level: 3 },
			{ id: 'other-paths-uses', title: '/uses', level: 3 },
			{ id: 'other-paths-fine-print', title: '/fine-print', level: 3 },
			{ id: 'other-paths-sponsor', title: '/sponsor', level: 3 },
			{ id: 'other-paths-rss', title: '/rss.xml', level: 3 },
			{ id: 'newsletter', title: 'newsletter' },
			{ id: 'colophon', title: 'colophon' },
		]}
	/>

	<h2 id="atelier">
		<i data-icon="flask"></i>
		<a href="/atelier">/atelier</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the gallery for my digital garden. it's still sparse at the moment — there are seedlings i'm still tending to behind the scenes; some are just beginning to root, and a few shy ones are waiting for their time to open. for now, these are the ones that have bloomed.</p>

	<h2 id="curated">
		<i data-icon="bookmarks"></i>
		<a href="/curated">/curated</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this index is where i keep recurring series and entries that aren't bound to the time they were written — pieces that hold up no matter when they're read. marked by lasting relevance, not by urgency, each one is meant to hold meaning long after the moment has passed.</p>

	<h3 id="curated-essence">
		<i data-icon="drop"></i>
		<a href="/curated?series=the-essence">essence</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a collection of distilled articles on the essence of a topic — clear, concise guides to core concepts, in a nutshell. these are the things i want to keep close. each piece stands on its own, so pick any topic and dive straight in.</p>

	<h3 id="curated-harvest">
		<i data-icon="basket"></i>
		<a href="/curated?series=the-harvest">harvest</a>
	</h3>
	<!-- prettier-ignore -->
	<p>this series is a monthly snapshot of memorable experiences. making this <em>monthly digest</em> at the start of each month helps me reflect on what has passed; to record what i've learned and preserve the moments that stayed with me. it's also a way to share what i found meaningful, in hopes that something here might resonate with you.</p>
	<table>
		<thead>
			<tr>
				<th>section</th>
				<th>description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col">headlines</th>
				<!-- prettier-ignore -->
				<td>personal moments and global happenings; news, milestones, and cultural shifts that stood out and shaped the month</td>
			</tr>
			<tr>
				<th scope="col">stories</th>
				<!-- prettier-ignore -->
				<td>the lives and worlds i stepped into; mostly anime and movies, but open to any medium that tells a compelling story</td>
			</tr>
			<tr>
				<th scope="col">pieces</th>
				<!-- prettier-ignore -->
				<td>articles, essays, and posts; thoughtful writing that lingered in my head or stirred something within me</td>
			</tr>
			<tr>
				<th scope="col">tracks</th>
				<!-- prettier-ignore -->
				<td>music that stayed with me; sounds and songs that guide my mood throughout the month</td>
			</tr>
			<tr>
				<th scope="col">clips</th>
				<!-- prettier-ignore -->
				<td>videos worth remembering; spontaneous finds full of insight, craft, or pure delight</td>
			</tr>
		</tbody>
	</table>

	<h2 id="posts">
		<i data-icon="feather"></i>
		<a href="/posts">/posts</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this index is where i gather passing thoughts and small revelations — a journal of the days as they unfold. some entries are personal reflections, others trace my work and technical curiosities. i write to understand, remember, and leave a trail through the thoughts that shaped me.</p>

	<h3 id="posts-themes">
		<i data-icon="swatches"></i>
		<span>themes</span>
	</h3>
	<!-- prettier-ignore -->
	<p>these are loose trails to help you find the piece you're in the mood for. i keep them broad enough to cover various topics, but specific enough to give you a sense of what to expect.</p>
	<table>
		<thead>
			<tr>
				<th>theme</th>
				<th>description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col"><a href="/posts?theme=reflection">reflection</a></th>
				<!-- prettier-ignore -->
				<td><strong>personal thoughts or reflections</strong>. introspective pieces that explore feelings, experiences, and lessons learned. often more emotional and subjective, capturing a moment in time rather than building a polished argument</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts?theme=essay">essay</a></th>
				<!-- prettier-ignore -->
				<td><strong>opinionated long-form exploration</strong>. well-researched and refined deep dives into a topic, shaped by my own perspective. i aim for accuracy, but i may still get things wrong</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts?theme=guide">guide</a></th>
				<!-- prettier-ignore -->
				<td><strong>practical instructions or behind-the-scenes</strong>. how-to articles or devlogs of my own workflow and problem-solving. follow along, adapt ideas, and apply what you learn</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts?theme=moment">moment</a></th>
				<!-- prettier-ignore -->
				<td><strong>brief observation or thought</strong>. sometimes unrefined, short, spontaneous notes or insights. they may grow into something more substantial over time</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts?theme=archive">archive</a></th>
				<!-- prettier-ignore -->
				<td><strong>republished or preserved</strong>. pieces kept for reference, whether old articles or other material worth keeping. they may be unpolished, but they hold value in their own way</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts?theme=pending">pending</a></th>
				<!-- prettier-ignore -->
				<td><strong>awaiting theme assignment</strong>. temporary placeholder for posts that haven't yet been given a theme. they will eventually be classified under one of the categories above</td>
			</tr>
		</tbody>
	</table>

	<h2 id="reviews">
		<i data-icon="flower-lotus"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this index is where i try to capture my reflections from my own experiences. seeing the world through a kaleidoscope — reflections refracted through a shifting lens. i write not to dictate your view, but to share mine in order to better understand the stories and moments that moved me.</p>

	<h3 id="reviews-how-i-review">
		<i data-icon="strategy"></i>
		<span>how i review</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i believe stories are best experienced blind — you'll find no spoilers here, not even summaries or plot breakdowns. i try to preserve the surprise and emotional weight, so you (or future me) can enter each story with the same excitement i did.</p>
	<!-- prettier-ignore -->
	<p>for anime, i usually give it three or four episodes — just enough for a vibe check before deciding whether to continue or drop it. if you prefer knowing the premise first, i've linked sources like MyAnimeList, <abbr title="The Movie Database">TMDB</abbr>, <abbr title="Internet Movie Database">IMDb</abbr>, and other relevant pages on each review.</p>
	<!-- prettier-ignore -->
	<p>if you've already seen it or are curious about what it reveals, most entries include a <strong>/deep-dive</strong> sub-page where i unpack the story and reflect more freely.</p>

	<h3 id="reviews-tiers">
		<i data-icon="stairs"></i>
		<span>tiers</span>
	</h3>
	<!-- prettier-ignore -->
	<p>these are a rough shape of my feelings toward each of them — i think of them as shelves rather than strict rankings. sometimes it's about how <em>visually</em> stunning they were, other times it's how well they captured a feeling or adapted a story. i try to keep it simple, so you can get a quick sense of what stood out to me.</p>
	<table>
		<thead>
			<tr>
				<th>tier</th>
				<th>description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col"><a href="/reviews?tier=S">S</a></th>
				<!-- prettier-ignore -->
				<td><strong>stellar animation and exceptional adaptation</strong>. the ones that make everything else feel dim by comparison. the direction feels impossibly refined. they come closest to my definition of a masterpiece</td>
			</tr>
			<tr>
				<th scope="col"><a href="/reviews?tier=A">A</a></th>
				<!-- prettier-ignore -->
				<td><strong>highly polished and excellent across the board</strong>. impressive, with many standout moments and a lasting impact. they deliver a cohesive, admirable experience. perhaps given more time, care, or stronger source material, they might've reached S-tier</td>
			</tr>
			<tr>
				<th scope="col"><a href="/reviews?tier=B">B</a></th>
				<!-- prettier-ignore -->
				<td><strong>solid works with occasional highs</strong>. reliable, with great ideas or standout moments, but something doesn't quite click. adaptation is often safe or straightforward. the kind of good average many aim for</td>
			</tr>
			<tr>
				<th scope="col"><a href="/reviews?tier=C">C</a></th>
				<!-- prettier-ignore -->
				<td><strong>watchable but flawed</strong>. had potential, but didn't do justice to it. there might be a few good scenes or ideas, but the issues are hard to ignore, and it ultimately feels like a miss. still interesting, sometimes, for what they <em>tried</em> to do</td>
			</tr>
			<tr>
				<th scope="col"><a href="/reviews?tier=D">D</a></th>
				<!-- prettier-ignore -->
				<td><strong>poor execution, wasted potential</strong>. the ones i struggled to finish, or couldn't. even if the core story is good, the execution actively works against it. often messy, incoherent, or just off in ways i couldn't bear. usually a frustrating or forgettable experience</td>
			</tr>
		</tbody>
	</table>

	<h3 id="reviews-attributions">
		<i data-icon="certificate"></i>
		<span>attributions</span>
	</h3>
	<img
		alt="TMDB logo"
		src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
		style:border-radius="0"
		style:margin-top="1rem"
	/>
	<!-- prettier-ignore -->
	<p>most images are sourced from <a href="https://www.themoviedb.org">TMDB</a>, used under their <a href="https://www.themoviedb.org/about/logos-attribution">attribution terms</a>. i'm not affiliated — they're just excellent and convenient. all reviews are my own; if you have concerns, feel free to reach out.</p>

	<hr />

	<h2 id="other-paths">
		<i data-icon="squares-four"></i>
		<span>other paths</span>
	</h2>
	<!-- prettier-ignore -->
	<p>the cozy corners of the site. not the main plots — more like footpaths and trellises that give the garden its form.</p>

	<h3 id="other-paths-help">
		<i data-icon="lifebuoy"></i>
		<a href="/help">/help</a>
	</h3>
	<!-- prettier-ignore -->
	<p>you're here now — the dedicated guide to what the site offers, how to find your way, and a quiet place for me to remember why it's shaped this way.</p>

	<h3 id="other-paths-about">
		<i data-icon="pen-nib"></i>
		<a href="/about">/about</a>
	</h3>
	<!-- prettier-ignore -->
	<p>who i am, what i do, what i'm <a href="/about#now">currently doing</a> (/now), and where to find me in <a href="/about#elsewhere">other corners of the internet</a>.</p>

	<h3 id="other-paths-uses">
		<i data-icon="suitcase"></i>
		<a href="/uses">/uses</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a snapshot of my setup — <a href="/uses#hardware">hardware</a>, <a href="/uses#software">software</a>, and <a href="/uses#wellness">wellness</a> picks that support my day-to-day. also serves as a reference for myself, a benchmark for what works and what lasts.</p>

	<h3 id="other-paths-fine-print">
		<i data-icon="scroll"></i>
		<a href="/fine-print">/fine-print</a>
	</h3>
	<!-- prettier-ignore -->
	<p>the formalities — disclaimers, affiliate notes, personal views, and disclosures. not exactly fun, but part of keeping things clear and honest.</p>

	<h3 id="other-paths-sponsor">
		<i data-icon="hand-heart"></i>
		<a href="/sponsor">/sponsor</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a redirect to <a href="https://github.com/sponsors/ignatiusmb">GitHub Sponsors</a>. support, whether through funds, feedback, sharing my work, or behind-the-scenes encouragement, means a lot.</p>

	<h3 id="other-paths-rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h3>
	<!-- prettier-ignore -->
	<p>if you're one of the cool kids with your own curated feeds, you can subscribe via the rss icon — or straight from <code>/rss.xml</code> — and get updates the moment they're live.</p>

	<hr />

	<h2 id="singularity">
		<i data-icon="infinity"></i>
		<span>singularity</span>
	</h2>
	<details open={page.url.hash === '#singularity'}>
		<summary>hey, <em>dear</em>.</summary>

		<div style:padding="0" style:margin="0 0.5rem">
			<p>
				how's life been treating you?<br />
				i hope you're not being too hard on yourself,<br />
				you've always carried more than you let on.<br />
				i know it's hard to remember your life,<br />
				so let this be something that stays.
			</p>
			<p>
				remember everything you've done so far,<br />
				the hours poured in when no one's watching,<br />
				the effort it took to keep going behind the scenes,<br />
				all of it a reflection of how much you gave,<br />
				and how deeply you've cared for what you love.
			</p>
			<p>
				at the very least,<br />
				remember that i love you.<br />
				always have, always will.<br />
				<em>— your lifelong partner</em>
			</p>
		</div>
	</details>

	<h2 id="newsletter">
		<i data-icon="envelope-simple"></i>
		<span>newsletter</span>
	</h2>
	<p>there's no email newsletter here (yet), sorry.</p>
	<!-- prettier-ignore -->
	<p>some people swear by them — email clients are powerful these days, with excellent syncing and filtering. there's even an <a href="https://feedmail.org/">RSS-to-email service</a> if you'd rather get updates straight in your inbox. others prefer a clean inbox, keeping email for important messages only. if that's you, <a href="https://kill-the-newsletter.com/">kill-the-newsletter</a> can turn newsletters into feeds you can follow in a reader.</p>
	<!-- prettier-ignore -->
	<p>i see the appeal of both camps. personally, i lean toward <a href="#other-paths-rss">RSS</a> — it's open, flexible, and feed readers tend to do a better job than email clients in their own way, but i'm not militant about 'killing the newsletter' from my inbox.</p>

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	<!-- prettier-ignore -->
	<p>this is the site's technical appendix. it's built with open-source tools and thoughtfully chosen parts; every piece is handpicked or handmade to create a cohesive whole. i'm not a professional designer, but i know what i like and how to make it <em>feel like home</em>. did i mention <a href="https://github.com/ignatiusmb/mauss.dev">the whole thing is open-source</a>?</p>
	<ul>
		<!-- prettier-ignore -->
		<li><strong><a href="https://svelte.dev">sveltekit</a></strong> — the core framework that makes all of this feel effortless. it doesn't feel like overkill nor underpowered, it scales with my needs and keeps things minimal.</li>
		<!-- prettier-ignore -->
		<li><strong><a href="/atelier#aubade">aubade</a></strong> — the content framework that powers the garden. it's handcrafted to fit my needs, with a focus on simplicity and flexibility.</li>
		<!-- prettier-ignore -->
		<li><strong><a href="https://phosphoricons.com">phosphor</a></strong> — clean and beautiful open-source icons, it's got everything i'm looking for and has consistently clean geometry.</li>
		<li>
			<!-- prettier-ignore -->
			<span><strong><a href="https://fontsource.org">fontsource</a></strong> — self-hosted fonts for privacy and performance.</span>
			<ul>
				<!-- prettier-ignore -->
				<li><strong>/<a href="https://fontsource.org/fonts/newsreader">newsreader</a></strong> — the main typeface, a thoughtfully crafted serif.</li>
				<!-- prettier-ignore -->
				<li><strong>/<a href="https://fontsource.org/fonts/recursive">recursive</a></strong> — the supporting sans-serif, a powerful five-axis variable font.</li>
			</ul>
		</li>
		<!-- prettier-ignore -->
		<li><strong><a href="https://github.com">github</a></strong> — version control and source hosting for the entire site.</li>
		<!-- prettier-ignore -->
		<li><strong><a href="https://vercel.com">vercel</a></strong> — deploys from github and hosts the live site.</li>
	</ul>
</Piece>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	h2,
	h3 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;
		}
	}

	i[data-icon] {
		&[data-icon='basket'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="128" y1="120" x2="128" y2="176"/><polyline points="184 88 128 24 72 88"/><line x1="180.8" y1="120" x2="175.2" y2="176"/><line x1="75.2" y1="120" x2="80.8" y2="176"/><path d="M24,88H232L216.93,201.06A8,8,0,0,1,209,208H47a8,8,0,0,1-7.93-6.94Z"/></svg>');
		}
		&[data-icon='certificate'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="72" y1="136" x2="120" y2="136"/><line x1="72" y1="104" x2="120" y2="104"/><circle cx="196" cy="124" r="44"/><path d="M168,192H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V90.06"/><polyline points="168 157.94 168 224 196 208 224 224 224 157.94"/></svg>');
		}
		&[data-icon='drop'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z"/><path d="M136,192c20-3.37,36.61-20,40-40"/></svg>');
		}
		&[data-icon='envelope-simple'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z"/><polyline points="224 56 128 144 32 56"/></svg>');
		}
		&[data-icon='infinity'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M106.63,152.13l-8.69,9.81a48,48,0,1,1,0-67.88l60.12,67.88a48,48,0,1,0,0-67.88l-8.69,9.81" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>');
		}
		&[data-icon='scroll'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M200,176V64a24,24,0,0,0-24-24H40"/><line x1="104" y1="104" x2="168" y2="104"/><line x1="104" y1="136" x2="168" y2="136"/><path d="M24,80s-8-6-8-16a24,24,0,0,1,48,0V192a24,24,0,0,0,48,0c0-10-8-16-8-16H216s8,6,8,16a24,24,0,0,1-24,24H88"/></svg>');
		}
		&[data-icon='stack'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="32 176 128 232 224 176"/><polyline points="32 128 128 184 224 128"/><polygon points="32 80 128 136 224 80 128 24 32 80"/></svg>');
		}
		&[data-icon='stairs'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="48 176 104 176 104 136 152 136 152 96 208 96"/><rect x="48" y="32" width="160" height="192" rx="8"/><line x1="104" y1="176" x2="208" y2="176"/><line x1="152" y1="136" x2="208" y2="136"/></svg>');
		}
		&[data-icon='strategy'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="76" cy="188" r="28"/><line x1="48" y1="72" x2="88" y2="112"/><line x1="88" y1="72" x2="48" y2="112"/><line x1="184" y1="168" x2="224" y2="208"/><line x1="224" y1="168" x2="184" y2="208"/><polyline points="144 80 144 40 184 40"/><path d="M144,40l16,16c40,40,8,88-24,96"/></svg>');
		}
		&[data-icon='squares-four'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="48" y="48" width="64" height="64" rx="8"/><rect x="144" y="48" width="64" height="64" rx="8"/><rect x="48" y="144" width="64" height="64" rx="8"/><rect x="144" y="144" width="64" height="64" rx="8"/></svg>');
		}
		&[data-icon='swatches'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="76" cy="180" r="10"/><path d="M110.84,186.25a35.71,35.71,0,0,1-41.34,29.2h0a36,36,0,0,1-28.95-41.71l25-143.13a8,8,0,0,1,9.19-6.49l54.67,9.73a8,8,0,0,1,6.44,9.26Z"/><path d="M232,156.19V208a8,8,0,0,1-8,8H76"/><path d="M121.42,125.76l80.79-29.28a8,8,0,0,1,10.22,4.75l19.09,52.21a7.93,7.93,0,0,1-4.77,10.17L88.16,213.84A35.07,35.07,0,0,1,76,216"/></svg>');
		}
	}
</style>
