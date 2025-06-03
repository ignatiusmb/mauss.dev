<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import WeavedImage from './WeavedImage.svelte';
</script>

<Article>
	<header>
		<WeavedImage src="/assets/profile/mauss.jpg" alt="Igna's profile picture" />

		<h1>
			<i data-icon="hand-waving" style:width="2rem" style:height="2rem"></i>
			<span style:margin-left="0.5rem">hello.</span>
		</h1>

		<!-- prettier-ignore -->
		<p>I'm Igna. I think best in quiet spaces and I tend to keep to them. Most of my time goes into building—clean code, tight interfaces, and systems that make sense. When I'm not at the desk, I train for discipline: calisthenics, bouldering, tennis, and long runs. Movement clears the noise.</p>
	</header>

	<h3 id="expertise">
		<i data-icon="flask"></i>
		<span>expertise.</span>
	</h3>
	<!-- prettier-ignore -->
	<p>I'm a software engineer by trade, but I like to think of myself more as a <em>software alchemist</em>. It's a kind of art—taking something complex, messy, or inefficient, and refining it into something simple, elegant, and fast.</p>
	<!-- prettier-ignore -->
	<p>My strength lies in restructuring systems and streamlining logic—shaving off the unnecessary until what's left just works. The payoff? Easier debugging, quicker iteration, and codebases you don't dread revisiting.</p>
	<!-- prettier-ignore -->
	<p>These days, I build mostly for the web, working with <a href="https://svelte.dev" target="_blank">Svelte</a> and <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>. I've explored a wide spectrum of languages: <a href="https://en.wikipedia.org/wiki/Assembly_language" target="_blank">Assembly</a>, <a href="https://www.gnu.org/software/bash/" target="_blank">Bash</a>, <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank">C</a>, <a href="https://en.wikipedia.org/wiki/C++" target="_blank">C++</a>, <a href="https://dart.dev/" target="_blank">Dart</a> (<a href="https://flutter.dev/" target="_blank">Flutter</a>), <a href="https://godotengine.org/" target="_blank">GDScript</a>, <a href="https://www.haskell.org/" target="_blank">Haskell</a>, <a href="https://en.wikipedia.org/wiki/Java_%28programming_language%29" target="_blank">Java</a>, <a href="https://www.python.org/" target="_blank">Python</a>, and a few others I've probably forgotten. I don't mind the language. Once you understand the fundamentals, the rest follows.</p>
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
			<a href="https://github.com/ignatiusmb" target="_blank">github</a>
			<span>where i spend most of my time</span>
		</li>
		<li>
			<a href="https://www.instagram.com/ignatiusmb" target="_blank">instagram</a>
			<span>come say hi</span>
		</li>
		<li>
			<a href="https://discord.com/users/231822751504138240" target="_blank">discord</a>
			<span>patchy notifications</span>
		</li>
		<li>
			<a href="https://www.youtube.com/@ignatiusmb" target="_blank">youtube</a>
			<span>occasional uploads</span>
		</li>
		<li>
			<a href="https://open.spotify.com/user/ignatiusmb" target="_blank">spotify</a>
			<span>monthly music picks</span>
		</li>
		<li>
			<strong>whatsapp</strong>
			<span>only for direct contact</span>
		</li>
		<li>
			<strong>telegram</strong>
			<span>only news channels</span>
		</li>
		<li>
			<strong>signal</strong>
			<span>private communication</span>
		</li>
	</ul>
	<p style:margin-top="1.5rem">archived</p>
	<ul style:margin-top="0">
		<li>
			<a href="https://www.facebook.com/ignatiusmb" target="_blank">facebook</a>
			<span>relic from childhood</span>
		</li>
		<li>
			<a href="https://gitlab.com/ignatiusmb" target="_blank">gitlab</a>
			<span>university-era keepsake</span>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/ignatiusmb" target="_blank">linkedin</a>
			<span>for professional things</span>
		</li>
		<li>
			<a href="https://twitter.com/alchemauss" target="_blank">twitter (x)</a>
			<span>not sure why i still have this</span>
		</li>
		<li>
			<a href="https://keybase.io/mauss" target="_blank">keybase</a>
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
			<a href="https://www.16personalities.com/intj-personality" target="_blank">INTJ</a>
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

	i[data-icon] {
		&[data-icon='calendar-dots'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="40" y="40" width="176" height="176" rx="8"/><line x1="176" y1="24" x2="176" y2="56"/><line x1="80" y1="24" x2="80" y2="56"/><line x1="40" y1="88" x2="216" y2="88"/><circle cx="128" cy="132" r="12"/><circle cx="172" cy="132" r="12"/><circle cx="84" cy="172" r="12"/><circle cx="128" cy="172" r="12"/><circle cx="172" cy="172" r="12"/></svg>');
		}
		&[data-icon='hand-waving'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M96.65,62a20,20,0,0,1,34.64-20l30,52"/><path d="M69.32,94.67,55.08,70A20,20,0,0,1,89.73,50l31.17,54"/><path d="M158.87,160A40,40,0,0,1,168,105.58L161.32,94A20,20,0,0,1,196,74l17.31,30A80,80,0,0,1,74.7,184l-40-69.32a20,20,0,0,1,34.64-20L88.57,128"/><path d="M192,33.78A51.84,51.84,0,0,1,223.67,58l.33.57"/><path d="M74.62,232A111.88,111.88,0,0,1,47,200"/></svg>');
		}
		&[data-icon='pulse'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><polyline points="24 128 56 128 96 40 160 208 200 128 232 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>');
		}
		&[data-icon='share-network'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="64" cy="128" r="32"/><circle cx="176" cy="200" r="32"/><circle cx="176" cy="56" r="32"/><line x1="149.09" y1="73.3" x2="90.91" y2="110.7"/><line x1="90.91" y1="145.3" x2="149.09" y2="182.7"/></svg>');
		}
		&[data-icon='sparkle'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M84.27,171.73l-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3a7.92,7.92,0,0,1,0,14.86l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0Z"/><line x1="176" y1="16" x2="176" y2="64"/><line x1="224" y1="72" x2="224" y2="104"/><line x1="152" y1="40" x2="200" y2="40"/><line x1="208" y1="88" x2="240" y2="88"/></svg>');
		}
	}
</style>
