<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	import WeavedImage from './WeavedImage.svelte';
</script>

<Piece>
	<header>
		<WeavedImage src="/assets/profile/mauss.jpg" alt="at the summit of mt. Unzen" />

		<div>
			<h1>Ignatius Bagus.</h1>
			<span>code and prose, distilled</span>

			<!-- prettier-ignore -->
			<p>i'm Igna — i like to build <a href="/atelier">things</a> (mostly <a href="https://github.com/ignatiusmb">in public</a>) and write freely about what i'm exploring or learning. if you're new here, start with the <a href="/help">help page</a>.</p>
		</div>
	</header>

	<h3 id="background">
		<i data-icon="footprints"></i>
		<span>background.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i studied Computer Science at the University of Indonesia and earned my bachelor's degree in 2021 — though in practice, having the degree hasn't mattered much. i started coding when i entered university and i fell for it fast. the idea of creating something out of <em>nothing</em>, bringing a thought to life through logic and lines of code — it still feels <em>magical</em>.</p>
	<!-- prettier-ignore -->
	<p>i mostly work with web technologies, mainly <a href="https://svelte.dev">Svelte</a> and <a href="https://www.typescriptlang.org">TypeScript</a> (and by extension, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a>). other languages i've explored include <a href="https://en.wikipedia.org/wiki/Assembly_language">Assembly</a>, <a href="https://www.gnu.org/software/bash/">Bash</a>, <a href="https://en.wikipedia.org/wiki/C_(programming_language)">C</a>, <a href="https://en.wikipedia.org/wiki/C++">C++</a>, <a href="https://dart.dev">Dart</a> (with <a href="https://flutter.dev">Flutter</a>), <a href="https://godotengine.org">GDScript</a>, <a href="https://www.haskell.org">Haskell</a>, <a href="https://en.wikipedia.org/wiki/Java_%28programming_language%29">Java</a>, <a href="https://www.python.org">Python</a>, <a href="https://en.wikipedia.org/wiki/SQL">SQL</a>, and a few others i've forgotten. regardless of language or stack, it's all about solving the right problems. once you get the fundamentals, the rest follows naturally. that said, i'll always pick the ones i enjoy working with most.</p>
	<!-- prettier-ignore -->
	<p>whether starting fresh or refining existing code, i focus on designing and writing thoughtfully crafted solutions. by prioritizing the longevity of the codebase, i help ensure future iterations run smoother, debugging becomes faster and easier, and revisiting old features doesn't feel as dreadful. most of this work happens behind the scenes, but it pays off down the line — just like any long-term investment.</p>
	<!-- prettier-ignore -->
	<p>i work full-stack out of necessity, but gravitate toward the frontend above all else. i believe it deserves the same level of expertise, yet it's too often neglected or treated as an afterthought, even though UI and UX are often what make or break a product for the end-user. with that in mind, i occasionally take on consulting and freelance work — reach out <a href="#elsewhere">elsewhere</a> if you need guidance or a solution tailored to your needs.</p>

	<h3 id="now">
		<i data-icon="calendar-dots"></i>
		<span>now.</span>
	</h3>
	<div class="location">
		<i data-icon="map-pin" style:color="inherit"></i>
		<span>Southeast Asia (GMT+7&ndash;8)</span>
	</div>
	<!-- prettier-ignore -->
	<p>i'm currently clearing my notes and backlog of to-dos — a never-ending task, but i try to keep it manageable. most of it is a dump of my mind that i'm shaping into personal projects; finished MVPs and ongoing projects can be found in <a href="/atelier">/atelier</a>.</p>
	<!-- prettier-ignore -->
	<p>my most daunting task right now is building a spec-compliant markdown parser for <a href="https://github.com/ignatiusmb/aubade">Aubade</a>, which is <em>deceptively simple</em> on the surface. under the hood, it's a nasty beast of a text format to parse cleanly. i probably should've started with something simpler like JSON or YAML, but i'm already halfway through, so i might as well finish it. the goal is to have a solid foundation for future projects and make it easier to write and share content across my sites (could also be sunk cost fallacy at play, but oh well).</p>
	<!-- prettier-ignore -->
	<p>introspectively, i'm trying to write more often. i'm working on series and collections for <a href="/curated">/curated</a> while also dumping thoughts into <a href="/posts">/posts</a>. i still love immersing myself in another world through many mediums. it's pretty hard to pour my thoughts and feelings coherently, so there are more drafts in <a href="/reviews">/reviews</a> than published ones, but i try to keep it up.</p>
	<!-- prettier-ignore -->
	<p>aside from all that, i'm making time to <a href="#movement">stay active</a> and keep up the bulk. i'm also diving deeper into linguistics and cultures, mostly Japanese right now.</p>

	<h3 id="elsewhere">
		<i data-icon="share-network"></i>
		<span>elsewhere.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i may not check every platform often, but i'll reply when i can. if you feel like saying hi, email (<a href="mailto:ignatius.mbs@gmail.com">ignatius.mbs@gmail.com</a>) is the most direct route. i spend most of my time writing <em>code and prose</em> on <a href="https://github.com/ignatiusmb">github</a>, though it's hardly a social space, so don't expect lively conversations there.</p>
	<!-- prettier-ignore -->
	<p><a href="https://www.instagram.com/ignatiusmb">instagram</a> used to steal most of my time daily — that is, until i borrowed my cousin's trick and deleted the app from my phone. now, i only check it from a private browser window, maybe once a month or less, and it logs me out as soon as i close the tab. making it as inconvenient as possible to keep myself from "accidentally" wasting hours on end. over time, i've come to realize that i don't miss it at all and actually found it liberating.</p>
	<!-- prettier-ignore -->
	<p><a href="https://discord.com/users/231822751504138240">discord</a> used to be a regular haunt, back when it was simple and reliable. these days, it feels bloated with features i don't use, cluttering the experience. the patchy notifications and constant updates haven't helped, making it harder to stay engaged.</p>
	<!-- prettier-ignore -->
	<p><a href="https://www.youtube.com/@ignatiusmb">youtube</a> is where i listen to music and watch videos. i'll occasionally upload something, someday. new finds get added to my <a href="https://open.spotify.com/user/ignatiusmb">spotify</a> playlists for listening on the go, which resets every month.</p>
	<!-- prettier-ignore -->
	<p>beyond the linkable platforms above, i also use <strong>whatsapp</strong>, <strong>telegram</strong>, and <strong>signal</strong>. i reserve these mostly for conversations with people i've met in person or known long enough to share my number. if you have my details, you can find me there. some accounts still exist purely for archival purposes: <a href="https://www.facebook.com/ignatiusmb">facebook</a>, <a href="https://gitlab.com/ignatiusmb">gitlab</a>, <a href="https://www.linkedin.com/in/ignatiusmb">linkedin</a>, <a href="https://twitter.com/alkamauss">twitter (x)</a>, and <a href="https://keybase.io/mauss">keybase</a>. i barely ever look at these accounts anymore, so don't count on a reply if you message me there.</p>

	<h3 id="movement">
		<i data-icon="pulse"></i>
		<span>movement.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>the human body is anatomically and physiologically designed for sustained aerobic activity. we're built for endurance, though staying active is harder than ever in a world full of conveniences. fortunately, i enjoy moving. i listen to my body and embrace the process, so movement remains a natural part of my life.</p>
	<!-- prettier-ignore -->
	<p><em>the basics</em> — <strong>running</strong> builds the endurance and resilience that carry into <strong>hiking</strong> and <strong>trekking</strong>. <strong>swimming</strong> is equally vital; we should move in water as naturally as we do on land. these essential foundations form the core of my physical capabilities.</p>
	<!-- prettier-ignore -->
	<p><em>the specialized pursuits</em> — <strong>bouldering</strong> tests both body and mind through problem-solving on the wall. <strong>calisthenics</strong> builds relative strength and full body control. <strong>parkour</strong> turns the world into a playground. <strong>tricking</strong> and <strong>gymnastics</strong> expand what my body can do.</p>
	<!-- prettier-ignore -->
	<p><em>the racket-based sports</em> — <strong>table tennis</strong>, <strong>badminton</strong>, and <strong>tennis</strong>. they sharpen hand&ndash;eye coordination, agility, reflexes, and strategic thinking. they're also a good way to spend time with friends.</p>
	<!-- prettier-ignore -->
	<p><em>the assorted leisures</em> — <strong>cycling</strong>, <strong>ice skating</strong>, <strong>rollerblading</strong>, <strong>billiards</strong>, <strong>longboard</strong>, and <strong>caster board</strong>. they're "hard" to do often, so i enjoy them when mood or opportunity allows.</p>
	<!-- prettier-ignore -->
	<p><em>in the past</em> — i dabbled in <strong>futsal</strong>, <strong>soccer</strong>, and <strong>basketball</strong>, but none of them stuck. <strong>volleyball</strong> was fun but too tedious to arrange casually, and i found that i prefer watching it. <strong>field hockey</strong> was an interesting phase, but too niche to pursue.</p>

	<h3 id="trivia">
		<i data-icon="sparkle"></i>
		<span>trivia.</span>
	</h3>
	<ul>
		<li>
			<a href="https://www.16personalities.com/intj-personality">INTJ</a>
			<span>— allegedly, according to an online test.</span>
		</li>
		<li>
			<strong>scorpio</strong>
			<span>— if that sort of thing matters to you.</span>
		</li>
		<li>i can hold my breath for roughly two minutes.</li>
		<li>i swim faster in breaststroke than in front crawl.</li>
	</ul>
</Piece>

<style>
	header {
		display: grid;
		gap: 1rem;
		grid-template-columns: auto;

		@media (min-width: 600px) {
			grid-template-columns: auto 1fr;
		}

		h1 {
			margin-top: 2rem;
			margin-bottom: 0.6rem;
			text-align: left;
			font-size: var(--size-h2);
		}
		span {
			color: var(--color-text-muted);
		}
	}

	/* add specificity */
	header ~ h3[id] {
		display: flex;
		align-items: center;
		margin-top: 2rem;

		span {
			margin-left: 0.5rem;
		}
	}

	.location {
		display: flex;
		gap: 0.25rem;
		margin-top: 0.5rem;
		font-size: var(--size-small);

		i[data-icon] {
			--size: var(--size-base);
			color: var(--color-text-muted);
		}
	}

	i[data-icon] {
		&[data-icon='calendar-dots'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="40" y="40" width="176" height="176" rx="8"/><line x1="176" y1="24" x2="176" y2="56"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="40" y1="88" x2="216" y2="88"/><circle cx="128" cy="132" r="12"/><circle cx="172" cy="132" r="12"/><circle cx="84" cy="172" r="12"/><circle cx="128" cy="172" r="12"/><circle cx="172" cy="172" r="12"/></svg>');
		}
		&[data-icon='footprints'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M152,192h56v12a28,28,0,0,1-56,0Z"/><path d="M48,168h56v12a28,28,0,0,1-56,0Z"/><path d="M50.74,136C24.54,104,51.48,24,76,24s51.46,80,25.26,112Z"/><path d="M154.74,160c-26.2-32,.74-112,25.26-112s51.46,80,25.26,112Z"/></svg>');
		}
		&[data-icon='map-pin'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="128" cy="104" r="32"/><path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z"/></svg>');
		}
		&[data-icon='pulse'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><polyline points="24 128 56 128 96 40 160 208 200 128 232 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
		}
		&[data-icon='share-network'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="64" cy="128" r="32"/><circle cx="176" cy="200" r="32"/><circle cx="176" cy="56" r="32"/><line x1="149.09" y1="73.3" x2="90.91" y2="110.7"/><line x1="90.91" y1="145.3" x2="149.09" y2="182.7"/></svg>');
		}
		&[data-icon='sparkle'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M84.27,171.73l-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3a7.92,7.92,0,0,1,0,14.86l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0Z"/><line x1="176" y1="16" x2="176" y2="64"/><line x1="224" y1="72" x2="224" y2="104"/><line x1="152" y1="40" x2="200" y2="40"/><line x1="208" y1="88" x2="240" y2="88"/></svg>');
		}
	}
</style>
