export const prerender = true;
export async function load() {
	return {
		meta: {
			canonical: '/uses',
			title: 'Uses',
			description:
				'a focused snapshot of my current setup — hardware, apps, and wellness essentials that support my daily workflow and well-being.',
		},
	};
}
