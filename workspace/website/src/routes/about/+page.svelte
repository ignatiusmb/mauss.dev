<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import WeavedImage from './WeavedImage.svelte';
</script>

<Article>
	<header>
		<WeavedImage src="/assets/profile/mauss.jpg" alt="Mauss Profile" />

		<h1>
			<i data-icon="hand-waving" style:width="2rem" style:height="2rem"></i>
			<span style:margin-left="0.5rem">hello.</span>
		</h1>

		<!-- prettier-ignore -->
		<p>I'm Igna. I think best in quiet spaces and I tend to keep to them. Most of my time goes into building—clean code, tight interfaces, and systems that make sense. When I'm not at the desk, I train for discipline: calisthenics, bouldering, tennis, and long runs. Movement clears the noise.</p>
	</header>

	<h3 id="expertise">
		<i data-icon="flask"> </i>
		<span>expertise.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>I'm a software engineer by trade, but I like to think of myself more as a <em>software alchemist</em>. It's a kind of art—taking something complex, messy, or inefficient, and refining it into something simple, elegant, and fast.</p>
	<!-- prettier-ignore -->
	<p>My strength lies in restructuring systems and streamlining logic—shaving off the unnecessary until what's left just works. The payoff? Easier debugging, quicker iteration, and codebases you don't dread revisiting.</p>
	<!-- prettier-ignore -->
	<p>These days, I build mostly for the web, working with <a href="https://svelte.dev">Svelte</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>. I've explored a wide spectrum of languages: <a href="https://en.wikipedia.org/wiki/Assembly_language">Assembly</a>, <a href="https://www.gnu.org/software/bash/">Bash</a>, <a href="https://en.wikipedia.org/wiki/C_(programming_language)">C</a>, <a href="https://en.wikipedia.org/wiki/C++">C++</a>, <a href="https://dart.dev/">Dart</a> (<a href="https://flutter.dev/">Flutter</a>), <a href="https://godotengine.org/">GDScript</a>, <a href="https://www.haskell.org/">Haskell</a>, <a href="https://en.wikipedia.org/wiki/Java_%28programming_language%29">Java</a>, <a href="https://www.python.org/">Python</a>, and a few others I've probably forgotten. I don't mind the language. Once you understand the fundamentals, the rest follows.</p>
	<!-- prettier-ignore -->
	<p>Though I can go full-stack when needed, my focus is frontend. I care about interfaces—how they feel, how they guide, how they stay out of the way.</p>

	<h3 id="now">
		<i data-icon="calendar-dots"></i>
		<span>now.</span>
	</h3>
	<ul>
		<li>bulking up</li>
		<li>learning japanese</li>
		<li>learning finance</li>
		<li>building with sveltekit + pocketbase</li>
		<li>rethinking my design system</li>
		<li>refreshing my <a href="/uses">/uses</a> page</li>
	</ul>

	<h3 id="movement">
		<i data-icon="pulse"></i>
		<span>movement.</span>
	</h3>
	<p><em>currently active</em></p>
	<ul style:margin-top="0">
		<li>
			<strong>running</strong>
			<span>the foundation</span>
		</li>
		<li>
			<strong>cycling</strong>
			<span>would do more if the air was cleaner</span>
		</li>
		<li>
			<strong>swimming</strong>
			<span>closest thing to zero-gravity</span>
		</li>
		<li>
			<strong>badminton</strong>
			<span>sharp, fast-paced action</span>
		</li>
		<li>
			<strong>table tennis</strong>
			<span>perfect for indoor days</span>
		</li>
		<li>
			<strong>tricking / gymnastics</strong>
			<span>control meets flow</span>
		</li>
		<li>
			<strong>tennis</strong>
			<span>clean, satisfying hits</span>
		</li>
		<li>
			<strong>bouldering</strong>
			<span>problem-solving in motion</span>
		</li>
		<li>
			<strong>hiking x trekking</strong>
			<span>self-reflection through altitude</span>
		</li>
	</ul>
	<p style:margin-top="1.5rem"><em>retired / explored</em></p>
	<ul style:margin-top="0">
		<li>
			<strong>futsal</strong>
			<span>too cramped</span>
		</li>
		<li>
			<strong>soccer</strong>
			<span>too much space</span>
		</li>
		<li>
			<strong>basketball</strong>
			<span>i need my fingers</span>
		</li>
		<li>
			<strong>volleyball</strong>
			<span>fun to watch</span>
		</li>
		<li>
			<strong>field hockey</strong>
			<span>too niche</span>
		</li>
	</ul>

	<h3 id="elsewhere">
		<i data-icon="share-network"></i>
		<span>elsewhere.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>if you feel like saying hi, here are a few places where you might find me. i may not check them all the time, but i'll respond when i can.</p>
	<ul style:margin-top="0">
		<li>
			<a href="mailto:ignatius.mbs@gmail.com">email</a>
			<span>ignatius.mbs@gmail.com</span>
		</li>
		<li>
			<a href="https://github.com/ignatiusmb">github</a>
			<span>where i spend most of my time</span>
		</li>
		<li>
			<a href="https://www.instagram.com/ignatiusmb">instagram</a>
			<span>come say hi</span>
		</li>
		<li>
			<a href="https://discord.com/users/231822751504138240">discord</a>
			<span>patchy notifications</span>
		</li>
		<li>
			<a href="https://www.youtube.com/@ignatiusmb">youtube</a>
			<span>occasional uploads</span>
		</li>
		<li>
			<a href="https://open.spotify.com/user/ignatiusmb">spotify</a>
			<span>monthly music picks</span>
		</li>
		<li>
			<strong>whatsapp</strong>
			<span>only for direct contact</span>
		</li>
		<li>
			<a href="https://t.me/ignatiusmb">telegram</a>
			<span>quick and convenient</span>
		</li>
		<li>
			<strong>signal</strong>
			<span>private communication</span>
		</li>
	</ul>
	<p style:margin-top="1.5rem">semi-active / archival</p>
	<ul style:margin-top="0">
		<li>
			<a href="https://www.facebook.com/ignatiusmb">facebook</a>
			<span>relic from childhood</span>
		</li>
		<li>
			<a href="https://gitlab.com/ignatiusmb">gitlab</a>
			<span>university-era keepsake</span>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/ignatiusmb">linkedin</a>
			<span>for professional things</span>
		</li>
		<li>
			<a href="https://twitter.com/alchemauss">twitter (x)</a>
			<span>not sure why i still have this</span>
		</li>
		<li>
			<a href="https://keybase.io/mauss">keybase</a>
			<span>probably gathering dust</span>
		</li>
	</ul>
	<!-- prettier-ignore -->
	<p>not everything needs to be loud. these platforms are tools, not identities. some stuck, some didn't—but they've all held fragments of me at some point.</p>

	<h3 id="trivia">
		<i data-icon="sparkle"></i>
		<span>trivia.</span>
	</h3>
	<ul>
		<li>
			<a href="https://www.16personalities.com/intj-personality">INTJ</a>
			<span>or so the test claims, take it as you will</span>
		</li>
		<li>
			<strong>scorpio</strong>
			<span>if that means anything to you</span>
		</li>
		<li>can hold my breath for around 2 minutes</li>
	</ul>
</Article>

<style>
	h1 {
		display: flex;
		align-items: center;
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: rgba(255, 255, 255, 0.9);
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

	strong + span:last-child:nth-child(2)::before,
	a + span:last-child:nth-child(2)::before {
		content: '— ';
	}
</style>
