export function capitalize(text, lower) {
  return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}

export function splitAt(index, text) {
  return [text.slice(0, index), text.slice(index + 1)];
}
