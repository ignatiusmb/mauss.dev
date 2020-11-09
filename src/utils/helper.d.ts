export function capitalize(text: string, lower?: boolean): string;
export function checkNum(str: string | number): number | string;
export function compareDate(x: string, y: string): number;
export function convertCase(style: string, text: string, sep?: string): string;
export function createPrettyDate(
	date: string
): { weekday: string; day: string; month: string; year: string; complete: string };
export function isAbbreviated(text: string): boolean;
export function lastWords(index: number, text: string): string;
export function randomInt(max: number, min: number): number;
export function randomKey(dict: { [key: string]: string }): any;
export function sortCompare(x: any, y: any): number;
export function splitAt(index: number, text: string): [string, string];
