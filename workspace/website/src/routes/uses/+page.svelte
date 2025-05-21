<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();

	const table = [
		{ id: 'hardware', title: 'Hardware', level: 3 },
		{ id: 'apps', title: 'Apps', level: 3 },
		{ id: 'wellness', title: 'Wellness', level: 3 },
	];
</script>

<Article post={{ date: data.updated, title: data.meta.title, table }}>
	{#snippet header()}
		<!-- prettier-ignore -->
		<p>Inspired by <a href="https://wesbos.com/uses" target="_blank">Wes Bos</a> &mdash; All sorts of apps, products, services, and other things that I use. Following the "quality over quantity" as my rule of thumb, it saved me a lot of time, energy, and even health. Without further ado, here's the list of stuff that I use...</p>
	{/snippet}

	<h3 id={table[0].id}>
		<i data-icon="devices"></i>
		<span>{table[0].title}</span>
	</h3>
	<ul>
		<li>
			<strong>PC</strong>
			<span>
				<a
					href="https://www.asus.com/us/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-14-pro/"
					target="_blank"
				>
					ASUS NUC 14 Pro
				</a>
			</span>
		</li>
		<li>
			<strong>Display</strong>
			<span>
				<a href="https://www.lg.com/us/monitors/lg-27gl83a-b-gaming-monitor" target="_blank">
					LG UltraGear 27GL83A-B 27"
				</a>
			</span>
		</li>
		<li>
			<strong>Keyboard</strong>
			<span>
				<a
					href="https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard"
					target="_blank"
				>
					Keychron K2 - Brown Switch
				</a>
			</span>
		</li>

		<li>
			<strong>Home Lab</strong>
			<span>
				<a href="https://www.geekompc.com/geekom-mini-air12-mini-pc/" target="_blank">
					GEEKOM Mini Air12
				</a>
			</span>
		</li>
		<li>
			<strong>Storage</strong>
			<span>
				<a href="https://www.orico.cc/us/product/detail/3617.html" target="_blank">ORICO 4-bay</a>
			</span>
		</li>

		<li>
			<strong>Phone</strong>
			<span>Galaxy S23+</span>
		</li>
		<li>
			<strong>Watch</strong>
			<span>Venu 2 Plus</span>
		</li>
		<li>
			<strong>Earbuds</strong>
			<span>Galaxy Buds3 Pro</span>
		</li>
	</ul>

	<h3 id={table[1].id}>
		<i data-icon="terminal-window"></i>
		<span>{table[1].title}</span>
	</h3>
	<ul>
		<li>
			<strong>Browser</strong>
			<span><a href="https://www.microsoft.com/en-us/edge" target="_blank">Edge</a></span>
		</li>
		<li>
			<strong>Editor</strong>
			<span><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a></span>
		</li>
		<li>
			<strong>Music</strong>
			<span><a href="https://open.spotify.com/" target="_blank">Spotify</a></span>
		</li>
		<li>
			<strong>Vault</strong>
			<span><a href="https://bitwarden.com/" target="_blank">Bitwarden</a></span>
		</li>
	</ul>

	<h3 id={table[2].id}>
		<i data-icon="drop-half"></i>
		<span>{table[2].title}</span>
	</h3>
	<ul>
		<li>
			<strong>Cleanser</strong>
			<span>Bioderma Sensibio</span>
		</li>
		<li>
			<strong>Moisturizer</strong>
			<span>Effaclar Duo+M</span>
		</li>

		<li>
			<strong>Vitamin D3</strong>
			<span>10000 IU</span>
		</li>
		<li>
			<strong>Vitamin K2</strong>
			<span>MK7 200 mcg</span>
		</li>
		<li>
			<strong>Magnesium</strong>
			<span>Glycinate 500 mg</span>
		</li>
		<li>
			<strong>Creatine</strong>
			<span>5 g</span>
		</li>
	</ul>
</Article>

<style>
	h3 {
		display: flex;
		align-items: center;

		span {
			margin-left: 0.5rem;
		}
	}
	li > strong {
		font-weight: 500;

		& + span::before {
			content: '| ';
		}
	}
</style>
