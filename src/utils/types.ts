interface I18nData {
	short?: string;
	en: string;
	jp?: string;
}

export interface Child {
	slug?: string;
	title: string | I18nData;
	siblings: {
		prev?: { slug: string; title: string | I18nData };
		next?: { slug: string; title: string | I18nData };
	};
}

export interface Curated extends Child {
	category: string;
	date: {
		updated: string;
		published?: string;
	};
}

export interface Post extends Child {
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

export interface Review extends Child {
	category?: string;
	released: string;
	title: I18nData;
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
