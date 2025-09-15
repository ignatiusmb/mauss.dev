<script>
	function draw(radius = 96, segments = 20) {
		const step = (2 * Math.PI) / segments;
		const offset = -Math.PI / 2;
		let d = '';
		for (let i = 0; i <= segments; i++) {
			const angle = i * step + offset;
			const x = (Math.cos(angle) * radius).toFixed(2);
			const y = (Math.sin(angle) * radius).toFixed(2);
			d += i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
		}
		return d + ' Z';
	}
</script>

<svg
	aria-label="Alkamauss"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-128 -128 256 256"
	fill="var(--color-accent-primary)"
	stroke="var(--color-base)"
	stroke-width="32"
>
	<circle r="96" />
	<path
		fill="var(--color-base)"
		stroke-width="16"
		d="M 0 -96 A 1 1 0 0 0 96 0 C 96 -54 54 -96 0 -96"
	/>
	<path
		d={draw(24, 5)}
		fill="var(--color-accent-secondary)"
		stroke-width="4"
		transform="translate(30, -30) rotate(45)"
	/>
</svg>
