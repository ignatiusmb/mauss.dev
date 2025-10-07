import { engrave } from 'aubade/artisan';

export function write(...texts: string[]): string {
	return engrave(texts.join('\n')).html();
}
