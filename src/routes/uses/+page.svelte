<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	export let data;

	const table = [
		{ id: 'personal-computer', title: 'Personal Computer', level: 2 },
		{ id: 'personal-computer-desktop-workstation', title: 'Desktop Workstation', level: 3 },
		{ id: 'personal-computer-remote-workstation', title: 'Remote Workstation', level: 3 },
		{ id: 'personal-computer-everyday-applications', title: 'Everyday Applications', level: 3 },
		{ id: 'private-home-lab', title: 'Private Home Lab', level: 2 },
		{ id: 'private-home-lab-dhcp-server', title: 'DHCP Server', level: 3 },
		{ id: 'private-home-lab-media-server', title: 'Media Server', level: 3 },
		{ id: 'personal-skincare', title: 'Personal Skincare', level: 2 },
		{ id: 'personal-skincare-cleansing-routine', title: 'Cleansing Routine', level: 3 },
		{ id: 'personal-skincare-daytime-routine', title: 'Daytime Routine', level: 3 },
		{ id: 'personal-skincare-nighttime-routine', title: 'Nighttime Routine', level: 3 },
		{ id: 'personal-skincare-situational', title: 'Situational', level: 3 },
		{ id: 'daily-supplements', title: 'Daily Supplements', level: 2 },
	];
</script>

<Article post={{ date: data.updated, title: data.meta.title, table }}>
	<svelte:fragment slot="header">
		<!-- prettier-ignore -->
		<p><strong>Disclaimer</strong>: <em>This page contains some affiliate links and I may earn a small commission if you make a purchase through one of these links, without any additional cost to you.</em></p>
	</svelte:fragment>

	<!-- prettier-ignore -->
	<p>Inspired by <a href="https://wesbos.com/uses">Wes Bos</a> &mdash; All sorts of apps, products, services, and other things that I use. Following the "quality over quantity" as my rule of thumb, it saved me a lot of time, energy, and even health. Without further ado, here's the list of stuff that I use...</p>

	<h2 id="personal-computer">Personal Computer</h2>

	<h3 id="personal-computer-desktop-workstation">Desktop Workstation</h3>
	<ul>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Case:</strong>
			<a href="https://shope.ee/7KUnkN8Ijc">Lian Li TU150 Mini ITX</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>PSU:</strong>
			<a href="https://shope.ee/6pYX9WqW8H">Silverstone SX700 SFX 80+ Platinum</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Motherboard:</strong>
			<a href="https://shope.ee/6zrxLtOHUl">Gigabyte B550I AORUS PRO AX</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>CPU:</strong>
			<a href="https://shope.ee/2VPXzrUXb6">AMD Ryzen 9 5900X</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>CPU Cooler:</strong>
			<a href="https://shope.ee/1fqR0MsyNH">be quiet! Dark Rock Pro 4</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>GPU:</strong>
			<a href="https://shope.ee/1fqR0MsyNH">Gigabyte RTX 3060 GAMING OC 2.0 12GB</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Memory:</strong>
			<a href="https://shope.ee/9KFs8n07Jz">G.Skill Trident Z RGB (2x32GB)</a>
		</li>
		<li>
			<code>2021-07</code>
			<span>|</span>
			<strong>Storage-0:</strong>
			<a href="https://shope.ee/6fF6xw4FFS">Samsung 980 Pro 1TB M.2-2280</a>
		</li>
		<li>
			<code>2021-08</code>
			<span>|</span>
			<strong>Storage-1:</strong>
			<a href="https://shope.ee/4fU2aJ1qbQ">WD Black 1TB M.2-SN850</a>
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
			<strong>Mouse Mat:</strong>
			<a href="https://shope.ee/4fU2aJ1qbQ">Razer Strider XXL</a>
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
			<a href="https://shope.ee/9esiXc1unJ">Logitech C922 Pro Stream</a>
		</li>
		<li>
			<code>2021-12</code>
			<span>|</span>
			<strong>Camera:</strong>
			<a href="https://shope.ee/2AmhbsXef6">Sony ZV-1 - Black</a>
		</li>
		<li>
			<code>2022-07</code>
			<span>|</span>
			<strong>Microphone:</strong>
			<a href="https://shope.ee/fxtp9uE0R">Sennheiser MKE 200</a>
		</li>
		<li>
			<code>2018-12</code>
			<span>|</span>
			<strong>Drawing Tablet:</strong>
			<a href="https://shope.ee/3puvazqygB">One by Wacom CTL-472/K0-CX</a>
		</li>

		<hr style:margin="0.5rem 0" />

		<li>
			<code>2023-11</code>
			<span>|</span>
			<strong>Desk:</strong>
			<a href="https://shope.ee/99yAr8OaBi">Fantech GD914 - Black</a>
		</li>
		<li>
			<code>2020-06</code>
			<span>|</span>
			<strong>Chair:</strong>
			<a href="https://shope.ee/iD20LXsJ">Secretlab TITAN 2020 - Stealth</a>
		</li>
		<li>
			<code>2019-03</code>
			<span>|</span>
			<strong>Lamp:</strong>
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
			(<a href="https://shope.ee/4VAcOLkj7w">Rugged Case</a>)
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
			<a href="https://shope.ee/5zzQBURKnh">Anker 737 GaNPrime 120W</a>
		</li>
		<li>
			<code>2022-09</code>
			<span>|</span>
			<strong>Power Bank:</strong>
			<a href="https://shope.ee/3AfEoJ66PQ">Baseus Blade 100W 20000mAh</a>
		</li>
		<li>
			<code>2018-10</code>
			<span>|</span>
			<strong>Mouse:</strong>
			<a href="https://shope.ee/AURpXpqeaI">Logitech Silent Plus M331</a>
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
			<span>for the code editor</span>
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
			<a href="https://shope.ee/99wRxTFhyN">ORICO NS400U3 4-Bay</a>
		</li>
		<li>
			<code>2020-01</code>
			<span>|</span>
			<strong>HDD-0:</strong>
			<a href="https://shope.ee/1AuARpAdQY">WD Red 4TB HDD 3.5"</a>
		</li>
	</ul>

	<h2 id="personal-skincare">Personal Skincare</h2>

	<p>Tailored for oily and sensitive skin</p>

	<h3 id="personal-skincare-cleansing-routine">Cleansing Routine</h3>
	<ol>
		<li>
			<strong>Micellar-0:</strong>
			<a href="https://shope.ee/fzcky6ukp">Bioderma Sensibio H2O</a>
		</li>
		<li>
			<strong>Micellar-1:</strong>
			<a href="https://shope.ee/A9qi4JVB0S">Garnier Micellar Cleansing Water Pink</a>
		</li>
		<li>
			<strong>Cleanser:</strong>
			<a href="https://shope.ee/9Ub1HTb9N9">Cerave Foaming Facial Cleanser</a>
		</li>
	</ol>

	<h3 id="personal-skincare-daytime-routine">Daytime Routine</h3>
	<ol>
		<li>
			<strong>Toner:</strong>
			<a href="https://shope.ee/8KNKzWs1Jo">SKINTIFIC Pure Centella Toner</a>
		</li>
		<li>
			<strong>Serum:</strong>
			<a href="https://shope.ee/6fF70Txxel">SKINTIFIC 10% Vitamin C</a>
		</li>
		<li>
			<strong>Moisturizer:</strong>
			<a href="https://shope.ee/4Ksv79BHsI">SKINTIFIC 5% Panthenol</a>
		</li>
		<li>
			<strong>Sunscreen:</strong>
			<a href="https://shope.ee/3VJo8bcUV0">EltaMD - UV Clear Broad-Spectrum SPF 46</a>
		</li>
	</ol>

	<h3 id="personal-skincare-nighttime-routine">Nighttime Routine</h3>
	<ol>
		<li>
			<strong>Toner:</strong>
			<a href="https://shope.ee/8KNKzWs1Jo">SKINTIFIC Pure Centella Toner</a>
		</li>
		<li>
			<strong>Serum-0:</strong>
			<a href="https://shope.ee/6fGpufkdZA">SKINTIFIC 2% Salicylic Acid</a>
		</li>
		<li>
			<strong>Serum-1:</strong>
			<a href="https://shope.ee/506sxM0ADu">SKINTIFIC SymWhite 377</a>
		</li>
		<li>
			<strong>Moisturizer:</strong>
			<a href="https://shope.ee/4Ksv79BHsI">SKINTIFIC 5% Panthenol</a>
		</li>
	</ol>

	<h3 id="personal-skincare-situational">Situational</h3>
	<ul>
		<li>
			<strong>Adapalene:</strong>
			<a href="https://differin.com/shop/differin-gel">Differin&reg; Gel</a>
		</li>
		<li>
			<strong>Retinol:</strong>
			<a href="https://shope.ee/1qBa9eSjxC">Cerave Resurfacing Retinol Serum</a>
		</li>
		<li>
			<strong>Soothing Cream:</strong>
			<a href="https://shope.ee/1AuASJBiQi">La Roche Posay - Cicaplast Baume B5+</a>
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
			<span>| {200 + 600} IU</span>
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
	li strong {
		font-weight: 500;
	}
</style>
