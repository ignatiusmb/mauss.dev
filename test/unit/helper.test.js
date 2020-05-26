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
  it('convert YYYY-MM-DD to a prettier format', () => {
    expect(helper.createPrettyDate('2020-05-25')).toBe('Monday, 25 May 2020');
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

describe('splitAt', () => {
  it('split word at specified index', () => {
    expect(helper.splitAt(3, 'one:two')).toEqual(['one', 'two']);
  });
});
