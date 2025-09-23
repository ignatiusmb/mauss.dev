import { CardImage } from '$lib/server/og';

export async function GET() {
	return CardImage({
		title: '· Alkamauss ·',
		blurb: 'a digital atelier',
	});
}
