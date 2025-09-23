<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	const instruments: Array<{
		icon: string;
		type: string;
		items: Array<{
			type: string;
			name: string;
			link?: string;
		}>;
	}> = [
		{
			icon: 'devices',
			type: 'hardware',
			items: [
				{
					type: 'PC',
					name: 'ASUS NUC 14 Pro',
					link: 'https://www.asus.com/us/displays-desktops/nucs/nuc-mini-pcs/asus-nuc-14-pro',
				},
				{
					type: 'Display',
					name: 'LG UltraGear 27GL83A-B 27"',
					link: 'https://www.lg.com/us/monitors/lg-27gl83a-b-gaming-monitor',
				},
				{
					type: 'Keyboard',
					name: 'Keychron K2 - Brown Switch',
					link: 'https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard',
				},
				{
					type: 'Audio I/O',
					name: 'Focusrite Scarlett Solo 4th Gen',
					link: 'https://focusrite.com/products/scarlett-solo',
				},
				{ type: 'Phone', name: 'Galaxy S23+' },
				{ type: 'Watch', name: 'Venu 2 Plus' },
				{ type: 'Earbuds', name: 'Galaxy Buds3 Pro' },
				{
					type: 'Home Lab',
					name: 'GEEKOM Mini Air12',
					link: 'https://www.geekompc.com/geekom-mini-air12-mini-pc',
				},
				{
					type: 'Storage',
					name: 'ORICO 4-bay',
					link: 'https://www.orico.cc/us/product/detail/3617.html',
				},
			],
		},
		{
			icon: 'terminal-window',
			type: 'software',
			items: [
				{
					type: 'Launcher',
					name: 'Niagara',
					link: 'https://play.google.com/store/apps/details?id=bitpit.launcher',
				},
				{ type: 'Code', name: 'VS Code', link: 'https://code.visualstudio.com' },
				{ type: 'Music', name: 'Spotify', link: 'https://open.spotify.com' },
				{ type: 'Vault', name: 'Bitwarden', link: 'https://bitwarden.com' },
				{ type: 'Server', name: 'DietPi', link: 'https://dietpi.com' },
				{ type: '3D + Video', name: 'Blender', link: 'https://www.blender.org' },
			],
		},
		{
			icon: 'drop-half',
			type: 'wellness',
			items: [
				{ type: 'Cleanser', name: 'Bioderma Sensibio' },
				{ type: 'Moisturizer', name: 'Effaclar Duo+M' },
				{ type: 'Vitamin D3', name: '10000 IU' },
				{ type: 'Vitamin K2', name: 'MK7 200 mcg' },
				{ type: 'Magnesium', name: 'Glycinate 500 mg' },
				{ type: 'Creatine', name: '5 g' },
			],
		},
	];
</script>

<header>
	<h1>instruments</h1>
	<small>daily essentials — inspired by <a href="https://wesbos.com/uses">Wes Bos</a>.</small>
</header>

<Piece>
	{#each instruments as { icon, type, items }}
		<h3 id={type}>
			<i data-icon={icon}></i>
			<span>{type}.</span>
		</h3>
		<table>
			<thead>
				<tr>
					<th>type</th>
					<th>name</th>
				</tr>
			</thead>
			<tbody>
				{#each items as { type, name, link }}
					<tr>
						<th scope="col">{type}</th>
						{#if link}
							<td><a href={link}>{name}</a></td>
						{:else}
							<td>{name}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
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
