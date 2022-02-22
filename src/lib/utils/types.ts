import type { Overwrite, Typify } from 'mauss/typings';

export interface I18nData {
	short?: string;
	en: string;
	jp?: string;
}

export interface Child {
	draft?: boolean;
	author?: { name?: string; img?: string; link?: string };

	/** Main Properties */
	slug?: string;
	title: string | I18nData;
	date: {
		updated?: string;
		published?: string;
	};
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
	toc: Array<{ id: string; cleaned: string }>;
	date: {
		updated: string;
		published?: string;
	};
}

export type Post = Typify<
	Overwrite<
		Child,
		{
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
	>
>;

export type RawReview = Overwrite<
	Child,
	{
		released: string;
		title: I18nData;
		genres: string[];
		rating: string[];
		verdict: typeof import('$lib/constants')['VERDICTS'][number];

		completed: string;
		seen: {
			first: string | Record<string, string>;
			last?: string | Record<string, string>;
		};
		date: {
			published: string;
			updated?: string;
		};
		image: Omit<I18nData, 'short'>;

		link: {
			mal?: string;
		};
	}
>;
export type Review = Typify<
	Overwrite<
		Child,
		{
			category: string;
			released: string;
			title: I18nData;
			genres: string[];
			rating?: string[] | number;
			verdict: typeof import('$lib/constants')['VERDICTS'][number];

			completed: string | string[];
			seen: {
				first: string | Record<string, string>;
				last?: string | Record<string, string>;
			};
			date: {
				published: string;
				updated?: string;
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
	>
>;

export type SieveDict = {
	categories?: string[];
	genres?: string[];
	tags?: string[];
	verdict?: string[];
	sort_by: string;
};
