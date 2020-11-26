export interface Post {
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
	toc?: string[];
	content?: string;
}

export interface Review {
	slug?: string;
	category?: string;
	released: string;
	title: { short?: string; en: string; jp?: string };
	genres: string[];
	rating: string[] | number;
	verdict: number | string;

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
