<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();
</script>

<Article post={{ date: data.updated, title: data.meta.title, table: [] }}>
	<h1>in use</h1>
	<!-- prettier-ignore -->
	<p>inspired by <a href="https://wesbos.com/uses" target="_blank">Wes Bos</a> — a living list of the things i trust and rely on daily.</p>

	<h3 id="hardware">
		<i data-icon="devices"></i>
		<span>hardware.</span>
	</h3>
	<ul>
		<li>
			<strong>PC</strong>
			<span>
				<a
					href="https://www.asus.com/us/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-14-pro"
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
				<a href="https://www.geekompc.com/geekom-mini-air12-mini-pc" target="_blank">
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

	<h3 id="apps">
		<i data-icon="terminal-window"></i>
		<span>software.</span>
	</h3>
	<ul>
		<li>
			<strong>Launcher</strong>
			<span>
				<a href="https://play.google.com/store/apps/details?id=bitpit.launcher" target="_blank">
					Niagara
				</a>
			</span>
		</li>
		<li>
			<strong>Code</strong>
			<span><a href="https://code.visualstudio.com" target="_blank">VS Code</a></span>
		</li>
		<li>
			<strong>Music</strong>
			<span><a href="https://open.spotify.com" target="_blank">Spotify</a></span>
		</li>
		<li>
			<strong>Vault</strong>
			<span><a href="https://bitwarden.com" target="_blank">Bitwarden</a></span>
		</li>
		<li>
			<strong>Server</strong>
			<span><a href="https://dietpi.com" target="_blank">DietPi</a></span>
		</li>
		<li>
			<strong>3D + Video</strong>
			<span><a href="https://www.blender.org" target="_blank">Blender</a></span>
		</li>
	</ul>

	<h3 id="wellness">
		<i data-icon="drop-half"></i>
		<span>wellness.</span>
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

	i[data-icon] {
		&[data-icon='devices'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><rect x="136" y="104" width="128" height="80" rx="16" transform="translate(344 -56) rotate(90)"/><line x1="128" y1="208" x2="88" y2="208"/><path d="M160,176H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H184a16,16,0,0,1,16,16V80"/><line x1="192" y1="112" x2="208" y2="112"/></svg>');
		}
		&[data-icon='drop-half'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z"/><line x1="128" y1="224" x2="128" y2="16"/><line x1="128" y1="128" x2="206.7" y2="128"/><line x1="128" y1="96" x2="196.63" y2="96"/><line x1="128" y1="160" x2="206.4" y2="160"/><line x1="128" y1="192" x2="192" y2="192"/><line x1="128" y1="64" x2="176.98" y2="64"/></svg>');
		}
		&[data-icon='terminal-window'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="80 96 120 128 80 160"/><line x1="136" y1="160" x2="176" y2="160"/><rect x="32" y="48" width="192" height="160" rx="8"/></svg>');
		}
	}
</style>
