export async function handle({ event, resolve }) {
	return await resolve(event, {
		transformPageChunk({ html }) {
			const pattern = /(<style data-sveltekit>)([\s\S]*)(<\/style>)/g;
			return html.replace(pattern, (match) => {
				let css = match.replace(/\/\*[\s\S]*?\*\//g, ''); // comments
				css = css.replace(/\r?\n\s*/g, ''); // newlines and spaces
				css = css.replace(/\s+{/g, '{'); // spaces before start
				// spaces after commas x colons x semicolons
				return css.replace(/([,:;])\s+/g, (_, t) => t) + '\n\t';
			});
		},
	});
}
