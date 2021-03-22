export interface I18nData {
	short?: string;
	en: string;
	jp?: string;
}

export interface ArticleDate {
	author?: { name?: string; img?: string; link?: string };
	published?: string;
	updated?: string;
}

export interface Child {
	slug?: string;
	title: string | I18nData;
	siblings: {
		prev?: { slug: string; title: string | I18nData };
		next?: { slug: string; title: string | I18nData };
	};
	content?: string;
	read_time: number;
}

export interface Curated extends Child {
	title: string;
	category: string;
	date: {
		updated: string;
		published?: string;
	};
	toc: Array<{ id: string; cleaned: string }>;
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
}

export type SieveDict = {
	categories?: string[];
	genres?: string[];
	tags?: string[];
	verdict?: string[];
	sort_by: string;
};
