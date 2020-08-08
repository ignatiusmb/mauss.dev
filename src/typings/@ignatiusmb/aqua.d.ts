declare module '@ignatiusmb/aqua' {
	export const code: {
		cbs(name: string): Promise<void>;
		highlightAll(): void;
		highlight(
			source: string,
			dataset?: {
				language?: string;
				title?: string;
				lineStart?: number;
			}
		): string;
		init(container?: HTMLElement | Node): void;
	};
}
