export function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}
