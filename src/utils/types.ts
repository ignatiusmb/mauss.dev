interface Article {
	slug: string;
	title: string | {};
}

interface RSSChannel {
	domain: string;
	image?: string;
	title: string;
	slug: string;
	description: string;
	language?: string;
}

interface RSSItem {
	title: string;
	slug: string;
	description: string;
	date: string;
}

interface Post extends Article {
	slug: string;
	title: string | {};
	tags: Array<string>;
	description: string;
	image: {
		en: string;
	};
}

interface Review extends Article {
	slug: string;
	category: string;
	year: number;
	title: {
		short?: string;
		en: string;
		jp?: string;
	};
	genres: Array<string>;
	rating: any;
	verdict: number;

	last_seen: Date;
	date_published: Date;
	date_updated: Date;
	image: {
		en: string;
		jp?: string;
	};

	link: {
		mal?: string;
	};

	read_time: number;
	content: string;
	seasons?: Array<{ title: string; content: string; spoilers?: string }>;
	spoilers?: string;
	closing?: string;
}
