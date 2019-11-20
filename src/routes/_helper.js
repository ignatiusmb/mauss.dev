export const scramble = require('@ignatiusmb/scramble');

export const capitalize = (text, lower) => {
  return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
