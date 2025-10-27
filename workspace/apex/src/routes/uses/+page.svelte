<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
</script>

<header>
	<h1>instruments</h1>
	<small>daily essentials — inspired by <a href="https://wesbos.com/uses">Wes Bos</a>.</small>
</header>

<Piece>
	<h3 id="hardware">
		<i data-icon="devices"></i>
		<span>hardware.</span>
	</h3>
	<table>
		<thead>
			<tr><th>type</th><th>name</th></tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col">PC</th>
				<td>
					<a href="https://www.asus.com/us/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-14-pro">
						ASUS NUC 14 Pro
					</a>
				</td>
			</tr>
			<tr>
				<th scope="col">Display</th>
				<td>
					<a href="https://www.lg.com/us/monitors/lg-27gl83a-b-gaming-monitor">
						LG UltraGear 27GL83A-B 27"
					</a>
				</td>
			</tr>
			<tr>
				<th scope="col">Keyboard</th>
				<td>
					<a href="https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard">
						Keychron K2 - Brown Switch
					</a>
				</td>
			</tr>
			<tr>
				<th scope="col">Audio I/O</th>
				<td>
					<a href="https://focusrite.com/products/scarlett-solo">Focusrite Scarlett Solo 4th Gen</a>
				</td>
			</tr>
			<tr>
				<th scope="col">Phone</th>
				<td>Galaxy S23+</td>
			</tr>
			<tr>
				<th scope="col">Watch</th>
				<td>Venu 2 Plus</td>
			</tr>
			<tr>
				<th scope="col">Earbuds</th>
				<td>Galaxy Buds3 Pro</td>
			</tr>
			<tr>
				<th scope="col">Home Lab</th>
				<td><a href="https://www.geekompc.com/geekom-mini-air12-mini-pc">GEEKOM Mini Air12</a></td>
			</tr>
			<tr>
				<th scope="col">Storage</th>
				<td><a href="https://www.orico.cc/us/product/detail/3617.html">ORICO 4-bay</a></td>
			</tr>
		</tbody>
	</table>

	<h3 id="software">
		<i data-icon="terminal-window"></i>
		<span>software.</span>
	</h3>
	<table>
		<thead>
			<tr><th>type</th><th>name</th></tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col">Launcher</th>
				<td>
					<a href="https://play.google.com/store/apps/details?id=bitpit.launcher">Niagara</a>
				</td>
			</tr>
			<tr>
				<th scope="col">Code</th>
				<td><a href="https://code.visualstudio.com">VS Code</a></td>
			</tr>
			<tr>
				<th scope="col">Music</th>
				<td><a href="https://open.spotify.com">Spotify</a></td>
			</tr>
			<tr>
				<th scope="col">Vault</th>
				<td><a href="https://bitwarden.com">Bitwarden</a></td>
			</tr>
			<tr>
				<th scope="col">Server</th>
				<td><a href="https://dietpi.com">DietPi</a></td>
			</tr>
			<tr>
				<th scope="col">3D + Video</th>
				<td><a href="https://www.blender.org">Blender</a></td>
			</tr>
		</tbody>
	</table>

	<h3 id="wellness">
		<i data-icon="drop-half"></i>
		<span>wellness.</span>
	</h3>
	<table>
		<thead>
			<tr><th>type</th><th>name</th></tr>
		</thead>
		<tbody>
			<tr>
				<th scope="col">Cleanser</th>
				<td>Bioderma Sensibio H<sub>2</sub>O</td>
			</tr>
			<tr>
				<th scope="col">Moisturizer</th>
				<td>Effaclar Duo+M</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts/core-supplements">Vitamin D3</a></th>
				<td>10,000 IU</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts/core-supplements">Vitamin K2</a></th>
				<td>MK7 200 mcg</td>
			</tr>
			<tr>
				<th scope="col"><a href="/posts/core-supplements">Magnesium</a></th>
				<td>Glycinate 500 mg</td>
			</tr>
			<tr>
				<th scope="col">Creatine</th>
				<td>5 g</td>
			</tr>
		</tbody>
	</table>
</Piece>

<style>
	header {
		display: grid;
		gap: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	h3 {
		display: flex;
		align-items: center;

		span {
			margin-left: 0.5rem;
		}
	}

	table {
		table-layout: fixed;

		th:first-child {
			width: 7.8rem;
		}
	}

	i[data-icon] {
		&[data-icon='devices'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="136" y="104" width="128" height="80" rx="16" transform="translate(344 -56) rotate(90)"/><line x1="128" y1="208" x2="88" y2="208"/><path d="M160,176H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H184a16,16,0,0,1,16,16V80"/><line x1="192" y1="112" x2="208" y2="112"/></svg>');
		}
		&[data-icon='drop-half'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z"/><line x1="128" y1="224" x2="128" y2="16"/><line x1="128" y1="128" x2="206.7" y2="128"/><line x1="128" y1="96" x2="196.63" y2="96"/><line x1="128" y1="160" x2="206.4" y2="160"/><line x1="128" y1="192" x2="192" y2="192"/><line x1="128" y1="64" x2="176.98" y2="64"/></svg>');
		}
		&[data-icon='terminal-window'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="80 96 120 128 80 160"/><line x1="136" y1="160" x2="176" y2="160"/><rect x="32" y="48" width="192" height="160" rx="8"/></svg>');
		}
	}
</style>
