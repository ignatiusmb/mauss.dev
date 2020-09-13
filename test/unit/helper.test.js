import * as helper from '../../src/utils/helper';

describe('capitalize', () => {
	it('convert first character to uppercase', () => {
		expect(helper.capitalize('hello')).toBe('Hello');
	});
	it('convert first character to uppercase and lowercase the rest', () => {
		expect(helper.capitalize('pAtRiCk', true)).toBe('Patrick');
	});
});

describe('createPrettyDate', () => {
	const result = {
		complete: '25 May 2020',
		day: 25,
		month: 'May',
		weekday: 'Monday',
		year: 2020,
	};

	const date = '2020-05-25';
	it('convert YYYY-MM-DD to formatted object', () => {
		expect(helper.createPrettyDate(date)).toStrictEqual(result);
	});
});

describe('isAbbreviated', () => {
	it('true for word with less than 4 characters', () => {
		expect(helper.isAbbreviated('ppl')).toBeTruthy();
	});
	it('true for word with length > 4 and prefixed with less than 3 chars', () => {
		expect(helper.isAbbreviated('ppl2020')).toBeTruthy();
	});
	it('false for word with length > 4 and not prefixed with less than 3 chars', () => {
		expect(helper.isAbbreviated('svelte')).toBeFalsy();
	});
});

describe('lastWords', () => {
	it('must return last 2 words of text', () => {
		expect(helper.lastWords(2, 'oh hello there')).toBe('hello there');
	});
});

describe('splitAt', () => {
	it('split word at specified index', () => {
		expect(helper.splitAt(3, 'one:two')).toEqual(['one', 'two']);
	});
});
