<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Piece from '$lib/components/Piece.svelte';
	import { page } from '$app/state';
	import { write } from '$lib/prose';
</script>

<header>
	<h1>safe harbor</h1>
	<small>calm shores, charted for you.</small>
</header>

<Piece>
	{@html write(
		"**welcome** — you've made port at the harbor of my [digital garden](/posts/digital-garden). may this page be your compass if you lose your bearings or wonder where to go next. in time, whether wandered by many or none, it may yet grow into a garden worth returning to.",
		'***',
		"the index is a *collapsible* overview of the page and a way to jump between sections or sub-sections. you'll mostly see this in articles with headings, so you can navigate with ease.",
	)}

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
			{ id: 'reviews-style', title: 'style', level: 3 },
			{ id: 'reviews-tiers', title: 'tiers', level: 3 },
			{ id: 'reviews-attributions', title: 'attributions', level: 3 },
			{ id: 'others', title: 'other paths' },
			{ id: 'others-help', title: '/help', level: 3 },
			{ id: 'others-about', title: '/about', level: 3 },
			{ id: 'others-uses', title: '/uses', level: 3 },
			{ id: 'others-fine-print', title: '/fine-print', level: 3 },
			{ id: 'others-sponsor', title: '/sponsor', level: 3 },
			{ id: 'others-rss', title: '/rss.xml', level: 3 },
			{ id: 'feedback', title: 'feedback' },
			{ id: 'newsletter', title: 'newsletter' },
			{ id: 'colophon', title: 'colophon' },
		]}
	/>

	<h2 id="atelier">
		<i data-icon="flask"></i>
		<a href="/atelier">/atelier</a>
	</h2>
	{@html write(
		`the "art gallery" section. it's still sparse at the moment — there are seedlings i'm still tending to behind the scenes; some are just beginning to root, and a few shy ones are waiting for their time to open. for now, these are the ones that have bloomed.`,
	)}

	<h2 id="curated">
		<i data-icon="bookmarks"></i>
		<a href="/curated">/curated</a>
	</h2>
	{@html write(
		"this index is where i keep recurring series and entries that aren't bound to the time they were written — pieces that hold up no matter when they're read. marked by lasting relevance, not by urgency, each one is meant to hold meaning long after the moment has passed.",
	)}

	<h3 id="curated-essence">
		<i data-icon="drop"></i>
		<a href="/curated?series=the-essence">essence</a>
	</h3>
	{@html write(
		'a collection of distilled articles on the essence of a topic — clear, concise guides to core concepts, in a nutshell. these are the things i want to keep close. each piece stands on its own, so pick any topic and dive straight in.',
	)}

	<h3 id="curated-harvest">
		<i data-icon="basket"></i>
		<a href="/curated?series=the-harvest">harvest</a>
	</h3>
	{@html write(
		"this series is a monthly snapshot of memorable experiences. making this *monthly digest* at the start of each month helps me reflect on what has passed; to record what i've learned and preserve the moments that stayed with me. it's also a way to share what i found meaningful, in hopes that something here might resonate with you.",
		'',
		'| section | description |',
		'| ------- | ----------- |',
		'| **headlines** | personal moments and global happenings; news, milestones, and cultural shifts that stood out and shaped the month |',
		'| **stories** | the lives and worlds i stepped into; mostly anime and movies, but open to any medium that tells a compelling story |',
		'| **pieces** | articles, essays, and posts; thoughtful writing that lingered in my head or stirred something within me |',
		'| **tracks** | music that stayed with me; sounds and songs that guide my mood throughout the month |',
		'| **clips** | videos worth remembering; spontaneous finds full of insight, craft, or pure delight |',
	)}

	<h2 id="posts">
		<i data-icon="feather"></i>
		<a href="/posts">/posts</a>
	</h2>
	{@html write(
		'this index is where i gather passing thoughts and small revelations — a journal of the days as they unfold. some entries are personal reflections, others trace my work and technical curiosities. i write to understand, remember, and leave a trail through the thoughts that shaped me.',
	)}

	<h3 id="posts-themes">
		<i data-icon="swatches"></i>
		<span>themes</span>
	</h3>
	{@html write(
		"these are loose trails to help you find the piece you're in the mood for. i keep them broad enough to cover various topics, but specific enough to give you a sense of what to expect.",
		'',
		'| theme | description |',
		'| ----- | ----------- |',
		'| [reflection](/posts?theme=reflection) | **personal thoughts or reflections**. introspective pieces that explore feelings, experiences, and lessons learned. often more emotional and subjective, capturing a moment in time rather than building a polished argument |',
		'| [essay](/posts?theme=essay) | **opinionated long-form exploration**. well-researched and refined deep dives into a topic, shaped by my own perspective. i aim for accuracy, but i may still get things wrong |',
		'| [guide](/posts?theme=guide) | **practical instructions or behind-the-scenes**. how-to articles or devlogs of my own workflow and problem-solving. follow along, adapt ideas, and apply what you learn |',
		'| [moment](/posts?theme=moment) | **brief observation or thought**. sometimes unrefined, short, spontaneous notes or insights. they may grow into something more substantial over time |',
		'| [archive](/posts?theme=archive) | **republished or preserved**. pieces kept for reference, whether old articles or other material worth keeping. they may be unpolished, but they hold value in their own way |',
	)}

	<h2 id="reviews">
		<i data-icon="flower-lotus"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	{@html write(
		'this index is where i try to capture my reflections from my own experiences. seeing the world through a kaleidoscope — reflections refracted through a shifting lens. i write not to dictate your view, but to share mine in order to better understand the stories and moments that moved me.',
	)}

	<h3 id="reviews-style">
		<i data-icon="aperture"></i>
		<span>style</span>
	</h3>
	{@html write(
		"i believe stories are best experienced blind — you'll find no spoilers here, not even summaries or plot breakdowns. i try to preserve the surprise and emotional weight, so you (or future me) can enter each story with the same excitement i did.",
		'',
		"for anime, i usually give it three or four episodes — just enough for a vibe check before deciding whether to continue or drop it. if you prefer knowing the premise first, i've linked sources like MyAnimeList, TMDB, IMDb, and other relevant pages on each review.",
		'',
		"if you've already seen it or are curious about what it reveals, most entries include a **/deep-dive** sub-page where i unpack the story and reflect more freely.",
	)}

	<h3 id="reviews-tiers">
		<i data-icon="stairs"></i>
		<span>tiers</span>
	</h3>
	{@html write(
		"these are a rough shape of my feelings toward each of them — i think of them as shelves rather than strict rankings. sometimes it's about how *visually* stunning they were, other times it's how well they captured a feeling or adapted a story. i try to keep it simple, so you can get a quick sense of what stood out to me.",
		'',
		'| tier | description |',
		'| ---- | ----------- |',
		'| [*S](/reviews?tier=S) | **stellar animation and exceptional adaptation**. the ones that make everything else feel dim by comparison. the direction feels impossibly refined. they come closest to my definition of a masterpiece |',
		"| [*A](/reviews?tier=A) | **highly polished and excellent across the board**. impressive, with many standout moments and a lasting impact. they deliver a cohesive, admirable experience. perhaps given more time, care, or stronger source material, they might've reached S-tier |",
		"| [*B](/reviews?tier=B) | **solid works with occasional highs**. reliable, with great ideas or standout moments, but something doesn't quite click. adaptation is often safe or straightforward. the kind of good average many aim for |",
		"| [*C](/reviews?tier=C) | **watchable but flawed**. had potential, but didn't do justice to it. there might be a few good scenes or ideas, but the issues are hard to ignore, and it ultimately feels like a miss. still interesting, sometimes, for what they *tried* to do |",
		"| [*D](/reviews?tier=D) | **poor execution, wasted potential**. the ones i struggled to finish, or couldn't. even if the core story is good, the execution actively works against it. often messy, incoherent, or just off in ways i couldn't bear. usually a frustrating or forgettable experience |",
	)}

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
	{@html write(
		"most images are sourced from [TMDB](https://www.themoviedb.org), used under their [attribution terms](https://www.themoviedb.org/about/logos-attribution). i'm not affiliated — they're just excellent and convenient. all reviews are my own; if you have concerns, feel free to reach out.",
	)}

	<hr />

	<h2 id="others">
		<i data-icon="squares-four"></i>
		<span>other paths</span>
	</h2>
	{@html write(
		'the cozy corners of the site. not the main plots — more like footpaths and trellises that give the garden its form.',
	)}

	<h3 id="others-help">
		<i data-icon="lifebuoy"></i>
		<a href="/help">/help</a>
	</h3>
	{@html write(
		"you're here now — the dedicated guide to what the site offers, how to find your way, and a quiet place for me to remember why it's shaped this way.",
	)}

	<h3 id="others-about">
		<i data-icon="pen-nib"></i>
		<a href="/about">/about</a>
	</h3>
	{@html write(
		"who i am, what i do, what i'm [currently doing](/about#now) (/now), and where to find me in [other corners of the internet](/about#elsewhere).",
	)}

	<h3 id="others-uses">
		<i data-icon="suitcase"></i>
		<a href="/uses">/uses</a>
	</h3>
	{@html write(
		'a snapshot of my setup — [hardware](/uses#hardware), [software](/uses#software), and [wellness](/uses#wellness) picks that support my day-to-day. also serves as a reference for myself, a benchmark for what works and what lasts.',
	)}

	<h3 id="others-fine-print">
		<i data-icon="scroll"></i>
		<a href="/fine-print">/fine-print</a>
	</h3>
	{@html write(
		'the formalities — disclaimers, affiliate notes, personal views, and disclosures. not exactly fun, but part of keeping things clear and honest.',
	)}

	<h3 id="others-sponsor">
		<i data-icon="hand-heart"></i>
		<a href="/sponsor">/sponsor</a>
	</h3>
	{@html write(
		'a redirect to [GitHub Sponsors](https://github.com/sponsors/ignatiusmb). support, whether through funds, feedback, sharing my work, or behind-the-scenes encouragement, means a lot.',
	)}

	<h3 id="others-rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h3>
	{@html write(
		"if you're one of the cool kids with your own curated feeds, you can subscribe via the rss icon — or straight from `/rss.xml` — and get updates the moment they're live.",
	)}

	<hr />

	<h2 id="singularity">
		<i data-icon="infinity"></i>
		<span>singularity</span>
	</h2>
	<details open={page.url.hash === '#singularity'}>
		<summary>hey, <em>dear</em>.</summary>

		<div style:padding="0" style:margin="0 0.5rem">
			{@html write(
				"how's life been treating you? \\",
				"i hope you're not being too hard on yourself, \\",
				"you've always carried more than you let on. \\",
				"i know it's hard to remember your life, \\",
				'so let this be something that stays.',
				'',
				"remember everything you've done so far, \\",
				"the hours poured in when no one's watching, \\",
				'the effort it took to keep going behind the scenes, \\',
				'all of it a reflection of how much you gave, \\',
				"and how deeply you've cared for what you love.",
				'',
				'at the very least, \\',
				'remember that i love you. \\',
				'always have, always will. \\',
				'— *your lifelong partner*',
			)}
		</div>
	</details>

	<h2 id="feedback">
		<i data-icon="chat-text"></i>
		<span>feedback</span>
	</h2>
	{@html write(
		"i appreciate kind words and insightful feedback. however, this blog is an extension of my own thoughts and personality, and having other people's words appear here feels a little off to me. traditional comment sections also require moderation and upkeep that i can't reasonably commit to.",
		'',
		"for those reasons, there's no comment section on this site. still, if something resonates with you, stirs a thought you'd like to share, or you simply enjoy my writing, please send me an email from the [about page](/about#elsewhere) — i'd love to hear from you.",
	)}

	<h2 id="newsletter">
		<i data-icon="envelope-simple"></i>
		<span>newsletter</span>
	</h2>
	{@html write(
		"there's no email newsletter here (yet?), sorry.",
		'',
		"some people swear by them — email clients are powerful these days, with excellent syncing and filtering. there's even an [RSS-to-email service](https://feedmail.org/) if you'd rather get updates straight in your inbox. others prefer a clean inbox, keeping email for important messages only. if that's you, [kill-the-newsletter](https://kill-the-newsletter.com/) can turn newsletters into feeds you can follow in a reader.",
		'',
		"i see the appeal of both camps. personally, i lean toward [RSS](#others-rss) — it's open, flexible, and feed readers tend to do a better job than email clients in their own way, but i'm not militant about 'killing the newsletter' from my inbox.",
	)}

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	{@html write(
		"this is the site's technical appendix. it's built with open-source tools and thoughtfully chosen parts; every piece is handpicked or handmade to create a cohesive whole. i'm not a professional designer, but i know what i like and how to make it *feel like home*. did i mention [the whole thing is open-source](https://github.com/ignatiusmb/mauss.dev)?",
		'',
		'- **[sveltekit](https://svelte.dev)** \\',
		"  the core framework that makes all of this feel effortless. it doesn't feel like overkill nor underpowered, it scales with my needs and keeps things minimal.",
		'- **[aubade](/atelier#aubade)** \\',
		"  the content framework that powers the garden. it's handcrafted to fit my needs, with a focus on simplicity and flexibility.",
		'- **[phosphor](https://phosphoricons.com)** \\',
		"  clean and beautiful open-source icons, it's got everything i'm looking for and has consistently clean geometry.",
		'- **[fontsource](https://fontsource.org)** \\',
		'  self-hosted fonts for privacy and performance.',
		'  - **/[newsreader](https://fontsource.org/fonts/newsreader)** \\',
		'    the main typeface, a thoughtfully crafted serif.',
		'  - **/[recursive](https://fontsource.org/fonts/recursive)** \\',
		'    the supporting sans-serif, a powerful five-axis variable font.',
	)}
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
		&[data-icon='aperture'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="128" cy="128" r="96" fill="none"/><line x1="128" y1="32" x2="164.68" y2="134.7" fill="none"/><line x1="44.86" y1="80" x2="152.14" y2="99.58" fill="none"/><line x1="44.86" y1="176" x2="115.46" y2="92.89" fill="none"/><line x1="128" y1="224" x2="91.32" y2="121.3" fill="none"/><line x1="211.14" y1="176" x2="103.86" y2="156.42" fill="none"/><line x1="211.14" y1="80" x2="140.54" y2="163.11" fill="none"/></svg>');
		}
		&[data-icon='basket'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="128" y1="120" x2="128" y2="176"/><polyline points="184 88 128 24 72 88"/><line x1="180.8" y1="120" x2="175.2" y2="176"/><line x1="75.2" y1="120" x2="80.8" y2="176"/><path d="M24,88H232L216.93,201.06A8,8,0,0,1,209,208H47a8,8,0,0,1-7.93-6.94Z"/></svg>');
		}
		&[data-icon='certificate'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="72" y1="136" x2="120" y2="136"/><line x1="72" y1="104" x2="120" y2="104"/><circle cx="196" cy="124" r="44"/><path d="M168,192H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V90.06"/><polyline points="168 157.94 168 224 196 208 224 224 224 157.94"/></svg>');
		}
		&[data-icon='chat-text'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M45.15,230.11A8,8,0,0,1,32,224V64a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H80Z"/><line x1="96" y1="112" x2="160" y2="112"/><line x1="96" y1="144" x2="160" y2="144"/></svg>');
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
		&[data-icon='squares-four'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="48" y="48" width="64" height="64" rx="8"/><rect x="144" y="48" width="64" height="64" rx="8"/><rect x="48" y="144" width="64" height="64" rx="8"/><rect x="144" y="144" width="64" height="64" rx="8"/></svg>');
		}
		&[data-icon='swatches'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="76" cy="180" r="10"/><path d="M110.84,186.25a35.71,35.71,0,0,1-41.34,29.2h0a36,36,0,0,1-28.95-41.71l25-143.13a8,8,0,0,1,9.19-6.49l54.67,9.73a8,8,0,0,1,6.44,9.26Z"/><path d="M232,156.19V208a8,8,0,0,1-8,8H76"/><path d="M121.42,125.76l80.79-29.28a8,8,0,0,1,10.22,4.75l19.09,52.21a7.93,7.93,0,0,1-4.77,10.17L88.16,213.84A35.07,35.07,0,0,1,76,216"/></svg>');
		}
	}
</style>
