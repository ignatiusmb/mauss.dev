export interface I18nData {
	short?: string;
	en: string;
	jp?: string;
}

export interface PageMeta {
	title: string;
	content: string;
}

export interface Sibling {
	slug: string;
	title: string | I18nData;
}

export interface SiblingPair {
	prev?: Sibling;
	next?: Sibling;
}

export interface Child {
	draft?: boolean;
	author?: { name?: string; img?: string; link?: string };

	/** Main Properties */
	slug?: string;
	title: string | I18nData;
	description?: string;
	date: {
		updated?: string;
		published?: string;
	};
	siblings: SiblingPair;
	content?: string;
	read_time: number;
}

export interface Curated extends Child {
	title: string;
	category: string;
	toc: Array<{ id: string; cleaned: string }>;
	date: {
		updated: string;
		published?: string;
	};
	tags?: string[];
}

export interface Post extends Child {
	title: string;
	tags: string[];
	category: string;
	description?: string;

	date: {
		published: string;
		updated?: string;
	};
	image?: { en: string };
}

export interface RawReview extends Child {
	released: string;
	title: I18nData;
	genres: string[];
	rating: string[];
	verdict: typeof import('$lib/constants')['VERDICTS'][number];

	completed: string;
	seen: {
		first: string | string[];
		last?: string | string[];
	};
	date: {
		published: string;
		updated?: string;
	};
	image: Omit<I18nData, 'short'>;

	link: {
		mal?: string;
	};

	composed?: number;
}
export interface Review extends Child {
	category: string;
	released: string;
	title: I18nData;
	genres: string[];
	rating?: number;
	verdict: typeof import('$lib/constants')['VERDICTS'][number];

	completed: string | string[];
	seen: {
		first: string;
		last?: string;
	};
	date: {
		published: string;
		updated?: string;
	};
	image: {
		en: string;
		jp?: string;
	};
	backdrop?: string;

	link?: {
		mal?: string;
	};

	composed: number;
	spoilers?: string;
	closing?: string;
}

export interface SieveDict {
	categories?: string[];
	genres?: string[];
	tags?: string[];
	verdict?: string[];
	sort_by: string;
}

export interface Quote {
	author: string;
	quote: string;
	from: string;
}
