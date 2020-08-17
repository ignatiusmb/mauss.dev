interface RawArticle {
	title: string | {};
}

declare class FinalArticle implements RawArticle {
	title: string | {};

	read_time: number;
	content?: string;
}

// Post
interface RawPost extends RawArticle {
	title: string;
	tags: string[];
	description?: string;

	date?: { updated?: string | Date };
	image?: { en: string };
}
declare class FinalPost implements RawPost {
	slug: string;
	title: string;
	tags: string[];
	category: string;
	description?: string;

	date: {
		published: string | Date;
		updated?: string | Date;
	};
	image?: { en: string };
	content?: string;
}

// Review
interface RawReview extends RawArticle {
	year: string;
	title: {
		short?: string;
		en: string;
		jp?: string;
	};
	genres: string[];
	rating: any;
	verdict: number | undefined;

	last_seen: string | Date;
	date: {
		published: string | Date;
		updated?: string | Date;
	};
	image: {
		en: string;
		jp?: string;
	};

	link?: {
		mal?: string;
	};
}
declare class FinalReview implements RawReview {
	slug: string;
	category: string;
	year: string;
	title: { short?: string; en: string; jp?: string };
	genres: string[];
	rating: number;
	verdict: number | undefined;

	last_seen: string | Date;
	date: {
		published: string | Date;
		updated?: string | Date;
	};
	image: {
		en: string;
		jp?: string;
	};

	link?: {
		mal?: string;
	};

	composed?: number;
	spoilers?: string;
	closing?: string;
	content?: string;
}
