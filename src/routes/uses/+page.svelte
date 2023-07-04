<script lang="ts">
	import Feather from 'syv/icons/Feather.svelte';
	import Article from '$lib/pages/Article.svelte';
	import { dt } from 'mauss';

	export let data;
</script>

<Article>
	<header>
		<h1>{data.meta.title}</h1>

		<small style="display:flex;gap:0.25rem;align-items:center">
			<Feather icon={import('syv/icons/feather/calendar')} scale="1" />
			<time datetime={data.updated}>{dt.format(data.updated)('DD MMMM YYYY')}</time>
		</small>
	</header>

	<!-- prettier-ignore -->
	<p>Inspired by <a href="https://wesbos.com/uses">Wes Bos</a> &mdash; All sorts of apps, products, services, and other things that I use. Following the "quality over quantity" as my rule of thumb, it saved me a lot of time, energy, and even health. Without further ado, here's the list of stuff that I use...</p>

	<section id="objective" class="info-box">
		<h3>Table of Contents</h3>
		<ul style:color="#f48fb1">
			<li>
				<a href="#personal-computer">Personal Computer</a>
				<ul>
					<li>
						<a href="#personal-computer-desktop-workstation">Desktop Workstation</a>
					</li>
					<li>
						<a href="#personal-computer-remote-workstation">Remote Workstation</a>
					</li>
					<li>
						<a href="#personal-computer-everyday-applications">Everyday Applications</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#private-home-lab">Private Home Lab</a>
				<ul>
					<li>
						<a href="#private-home-lab-dhcp-server">DHCP Server</a>
					</li>
					<li>
						<a href="#private-home-lab-media-server">Media Server</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#personal-skincare">Personal Skincare</a>
				<ul>
					<li>
						<a href="#personal-skincare-daytime-routine">Daytime Routine</a>
					</li>
					<li>
						<a href="#personal-skincare-nighttime-routine">Nighttime Routine</a>
					</li>
					<li>
						<a href="#personal-skincare-situational">Situational</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#daily-supplements">Daily Supplements</a>
			</li>
		</ul>
	</section>

	<h2 id="personal-computer">Personal Computer</h2>

	<h3 id="personal-computer-desktop-workstation">Desktop Workstation</h3>
	<ul>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Case:</strong>
			<a href="https://tokopedia.link/ZVQpu95UKAb">Lian Li TU150 Mini ITX</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>PSU:</strong>
			<span>Silverstone SX700 SFX 80+ Platinum</span>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Motherboard:</strong>
			<a href="https://tokopedia.link/0hLFrQlVKAb">Gigabyte B550I AORUS PRO AX</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>CPU:</strong>
			<a href="https://tokopedia.link/CZkWSWUTKAb">AMD Ryzen 9 5900X</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>CPU Cooler:</strong>
			<span>be quiet! Dark Rock Pro 4</span>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>GPU:</strong>
			<span>Gigabyte RTX 3060 GAMING OC 2.0 12GB</span>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Memory:</strong>
			<span>G.Skill Trident Z RGB (2x32GB)</span>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Storage-0:</strong>
			<span>Samsung 980 Pro 1TB M.2-2280</span>
		</li>
		<li>
			<code>2021-08</code>
			<span>|</span>
			<strong>Storage-1:</strong>
			<span>WD Black 1TB M.2-SN850</span>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Monitor:</strong>
			<span>LG UltraGear 27GL83A-B 27"</span>
		</li>
		<li>
			<code>2022-09</code>
			<span>|</span>
			<strong>Mousemat:</strong>
			<a href="https://tokopedia.link/JXB8U4TZKAb">Razer Strider XXL</a>
		</li>
		<li>
			<code>2022-08</code>
			<span>|</span>
			<strong>Keyboard:</strong>
			<a href="https://tokopedia.link/nZATrvEXKAb">Keychron K2 v2 - Brown Switch</a>
		</li>
		<li>
			<code>2015-02</code>
			<span>|</span>
			<strong>Mouse:</strong>
			<a href="https://tokopedia.link/Wg5eiFQXKAb">Logitech G502 Proteus Core</a>
		</li>
		<li>
			<code>2012-07</code>
			<span>|</span>
			<strong>Speaker:</strong>
			<span>Altec Lansing VS4621</span>
		</li>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<strong>Webcam:</strong>
			<span>Logitech C922 Pro Stream</span>
		</li>
		<li>
			<code>2021-12</code>
			<span>|</span>
			<strong>Camera:</strong>
			<a href="https://tokopedia.link/ghwNgt8XKAb">Sony ZV-1 - Black</a>
		</li>
		<li>
			<code>2022-07</code>
			<span>|</span>
			<strong>Microphone:</strong>
			<a href="https://tokopedia.link/wQdHiHeYKAb">Sennheiser MKE 200</a>
		</li>
		<li>
			<code>2018-12</code>
			<span>|</span>
			<strong>Drawing Tablet:</strong>
			<span>One by Wacom CTL-472/K0-CX</span>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2020-06</code>
			<span>|</span>
			<strong>Chair:</strong>
			<a href="https://tokopedia.link/nTYSTTCZKAb">Secretlab TITAN 2020 - Stealth</a>
		</li>
		<li>
			<code>2019-03</code>
			<span>|</span>
			<strong>Desk Lamp:</strong>
			<span>Xiaomi Yeelight YLTD02YL</span>
		</li>
	</ul>

	<h3 id="personal-computer-remote-workstation">Remote Workstation</h3>
	<ul>
		<li>
			<code>2020-02</code>
			<span>|</span>
			<strong>Work-phone:</strong>
			<span>Samsung Galaxy S10+ (Black 128GB)</span>
		</li>
		<li>
			<code>2023-01</code>
			<span>|</span>
			<strong>Personal-phone:</strong>
			<span>ASUS Zenfone 9 (Red 6/128GB)</span>
		</li>
		<li>
			<code>2022-06</code>
			<span>|</span>
			<strong>Earbud:</strong>
			<a href="https://tokopedia.link/VfQje70gLAb">Sony WF-1000XM4</a>
		</li>
		<li>
			<code>2022-05</code>
			<span>|</span>
			<strong>Smartwatch:</strong>
			<span>Garmin Venu 2 Plus</span>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2018-02</code>
			<span>|</span>
			<strong>Laptop:</strong>
			<a
				href="https://www.dell.com/support/home/en-sg/product-support/product/xps-13-9370-laptop/overview"
			>
				Dell XPS 13 9370 (2018)
			</a>
		</li>
		<li>
			<code>2023-05</code>
			<span>|</span>
			<strong>Power Adapter:</strong>
			<a href="https://tokopedia.link/IsxbIgi0KAb">Anker 737 GaNPrime 120W</a>
		</li>
		<li>
			<code>2022-09</code>
			<span>|</span>
			<strong>Power Bank:</strong>
			<a href="https://tokopedia.link/O91qebsgLAb">Baseus Blade 100W 20000mAh</a>
		</li>
		<li>
			<code>2018-10</code>
			<span>|</span>
			<strong>Mouse:</strong>
			<a href="https://tokopedia.link/MQNsvfw0KAb">Logitech Silent Plus M331</a>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2023-02</code>
			<span>|</span>
			<strong>Backpack:</strong>
			<a href="https://bellroy.com/products/transit-workpack?color=midnight&material=baida_ripstop">
				Bellroy Transit Workpack 20L
			</a>
		</li>
		<li>
			<code>2018-02</code>
			<span>|</span>
			<strong>Sling bag:</strong>
			<a href="https://cycop-life.com/collections/daysling-series">CYCOP DaySling</a>
		</li>
	</ul>

	<h3 id="personal-computer-everyday-applications">Everyday Applications</h3>
	<ul>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<a href="https://www.microsoft.com/en-us/edge">Chromium Edge</a>
			<span>for pretty much everything internet and code related</span>
		</li>
		<li>
			<code>2017-10</code>
			<span>|</span>
			<a href="https://code.visualstudio.com/">Visual Studio Code</a>
			<span>
				<span>for the code editor with the built-in Dark Modern theme,</span>
				<a href="https://github.com/tonsky/FiraCode">Fira Code</a>
				<span>for the font, and the</span>
				<a href="/curated/config/vscode">settings and extensions</a>
			</span>
		</li>
		<li>
			<code>2017-10</code>
			<span>|</span>
			<a href="https://www.sublimetext.com/">Sublime Text</a>
			<span>for quick and convenient text editor</span>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2020-12</code>
			<span>|</span>
			<a href="https://bitwarden.com/">Bitwarden</a>
			<span>for password, card, and secret management</span>
		</li>
		<li>
			<code>2017-12</code>
			<span>|</span>
			<a href="https://open.spotify.com/">Spotify</a>
			<span>for daily music streaming</span>
		</li>
	</ul>

	<h2 id="private-home-lab">Private Home Lab</h2>

	<h3 id="private-home-lab-dhcp-server">DHCP Server</h3>
	<ul>
		<li>
			<code>2018-11</code>
			<span>|</span>
			<strong>SBC:</strong>
			<a href="https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/">
				Raspberry Pi 3 Model B+
			</a>
		</li>
	</ul>

	<h3 id="private-home-lab-media-server">Media Server</h3>
	<ul>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<strong>SBC:</strong>
			<a href="https://www.raspberrypi.com/products/raspberry-pi-4-model-b/">
				Raspberry Pi 4 Model B (4GB)
			</a>
		</li>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<strong>Enclosure:</strong>
			<a href="https://tokopedia.link/idoXibw5KAb">ORICO NS400U3 4-Bay</a>
		</li>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<strong>HDD-0:</strong>
			<span>4TB WD RED WD40EFRX</span>
		</li>
	</ul>

	<h2 id="personal-skincare">Personal Skincare</h2>

	<p>Tailored for oily and sensitive skin</p>

	<ul>
		<li>
			<strong>Toner:</strong>
			<a href="https://www.goodmolecules.com/products/niacinamide-brightening-toner">
				Good Molecules - Niacinamide Brightening Toner
			</a>
		</li>
		<li>
			<strong>Moisturizer:</strong>
			<a href="https://www.cosrx.com/products/advanced-snail-92-all-in-one-cream">
				COSRX - Advanced Snail 92 All in one Cream
			</a>
		</li>
	</ul>

	<h3 id="personal-skincare-daytime-routine">Daytime Routine</h3>
	<ol>
		<li>
			<strong>Toner / Booster:</strong>
			<span>See above</span>
		</li>
		<li>
			<strong>Moisturizer:</strong>
			<span>See above</span>
		</li>
		<li>
			<strong>Sunscreen:</strong>
			<a href="https://eltamd.com/products/uv-clear-broad-spectrum-spf-46">
				EltaMD - UV Clear Broad-Spectrum SPF 46
			</a>
		</li>
	</ol>

	<h3 id="personal-skincare-nighttime-routine">Nighttime Routine</h3>
	<ol>
		<li>
			<strong>Toner / Booster:</strong>
			<span>See above</span>
		</li>
		<li>
			<strong>Adapalene:</strong>
			<a href="https://differin.com/shop/differin-gel">Differin&reg; Gel</a>
		</li>
		<li>
			<strong>Moisturizer:</strong>
			<span>See above</span>
		</li>
	</ol>

	<h3 id="personal-skincare-situational">Situational</h3>
	<ul>
		<li>
			<strong>Soothing Cream:</strong>
			<a href="https://tokopedia.link/2ZZBBYyrRAb">La Roche Posay - Cicaplast Baume B5+</a>
		</li>
		<li>
			<strong>Niacinamide:</strong>
			<a href="https://theordinary.com/en-us/niacinamide-10-zinc-1-serum-100436.html">
				The Ordinary - Niacinamide 10% + Zinc 1%
			</a>
		</li>
		<li>
			<strong>Retinol:</strong>
			<a href="https://www.cerave.com/skincare/serums/resurfacing-retinol-serum">
				CeraVe - Resurfacing Retinol Serum
			</a>
		</li>
		<li>
			<strong>Salicylic Acid:</strong>
			<ul>
				<li>
					<a href="https://tokopedia.link/RCRttMhqRAb">
						La Roche Posay - Effaclar Salicylic Acid Serum 30ml
					</a>
				</li>
				<li>
					<a
						href="https://theordinary.com/en-us/salicylic-acid-2-solution-acne-control-100098.html"
					>
						The Ordinary - Salicylic Acid 2% Solution
					</a>
				</li>
			</ul>
		</li>
	</ul>

	<h2 id="daily-supplements">Daily Supplements</h2>
	<ul>
		<li>
			<strong>Vitamin C</strong>
			<span>| 1000 mg</span>
		</li>
		<li>
			<strong>Vitamin D</strong>
			<span>| 2000 IU</span>
		</li>
		<li>
			<strong>Omega-3</strong>
			<span>| 500 mg</span>
		</li>
		<li>
			<strong>Magnesium</strong>
			<span>| 500 mg</span>
		</li>
		<li>
			<strong>L-Theanine</strong>
			<span>| 200 mg</span>
		</li>
		<li>
			<strong>Creatine</strong>
			<span>| 5 g</span>
		</li>
	</ul>
</Article>

<style>
	h1 {
		margin: 1em 0 0.5em;
		line-height: 1;
		font-size: clamp(2rem, 5vw, 2.75rem);
	}

	li strong {
		font-weight: 500;
	}
</style>
