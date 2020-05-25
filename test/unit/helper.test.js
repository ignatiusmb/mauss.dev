import * as helper from '../../src/utils/helper';

describe('capitalize', () => {
  it('convert first character to uppercase', () => {
    expect(helper.capitalize('hello')).toBe('Hello');
  });
});

describe('createPrettyDate', () => {
  it('convert YYYY-MM-DD to a prettier format', () => {
    expect(helper.createPrettyDate('2020-05-25')).toBe('Monday, 25 May 2020');
  });
});
