export const prerender = true;
export async function load() {
	return {
		meta: {
			canonical: '/help',
			title: 'Help & Guide',
			description:
				"an overview and a good sense of the kind of work i do. start here for a walkthrough of this site's purpose, writing style, pages, and how to navigate through it all.",
		},
	};
}
