export function capitalize(text, lower) {
  return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

export function isAbbreviated(text) {
  if (text.length < 4) return true;
  return isNaN(parseInt(text[3], 10)) ? false : true;
}

export function splitAt(index, text) {
  return [text.slice(0, index), text.slice(index + 1)];
}
