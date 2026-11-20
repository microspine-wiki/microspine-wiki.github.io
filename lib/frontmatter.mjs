/* Minimal YAML front matter: flat `key: value` pairs, enough for page metadata.
   Supported values: plain or quoted strings, numbers, true/false, and inline
   lists `[a, b]`. Anything fancier is a build error rather than a silent guess. */

function scalar(raw, where) {
  const value = raw.trim();
  if (value === '') return '';
  if (/^(['"]).*\1$/.test(value)) return value.slice(1, -1);
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[')) {
    if (!value.endsWith(']')) throw new Error(`${where}: unterminated list "${value}"`);
    return value.slice(1, -1).split(',').map(item => scalar(item, where)).filter(item => item !== '');
  }
  return value;
}

export function parseFrontMatter(source, file) {
  if (!source.startsWith('---\n') && !source.startsWith('---\r\n')) return {data: {}, body: source, offset: 0};
  const end = source.indexOf('\n---', 3);
  if (end === -1) throw new Error(`${file}: front matter is not closed with ---`);
  const block = source.slice(source.indexOf('\n') + 1, end);
  const rest = source.slice(end + 4);
  const body = rest.replace(/^[^\n]*\n?/, '');
  const data = {};
  for (const [index, line] of block.split(/\r?\n/).entries()) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const match = /^([A-Za-z][\w-]*):(.*)$/.exec(line);
    if (!match) throw new Error(`${file}: front matter line ${index + 2} is not "key: value": ${line}`);
    data[match[1]] = scalar(match[2], `${file} front matter "${match[1]}"`);
  }
  // Keep line numbers in error messages aligned with the original file.
  const offset = source.length - body.length;
  return {data, body, offset: source.slice(0, offset).split('\n').length - 1};
}
