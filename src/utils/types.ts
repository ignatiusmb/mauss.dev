interface Article {
	slug: string;
	title: string | {};
}

class Post implements Article {
	slug: string;
	title: string | {};
	tags: Array<string>;
	description: string;
	image: {
		en: string;
	};
}

class Review implements Article {
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
