/* Sidebar navigation from wiki/SUMMARY.md (the mdBook / GitBook convention):

     # Contents
     - [Home](README.md)
     ## Fundamentals
     - [What are microspines?](fundamentals/what-are-microspines.md)

   A heading starts a group; list items are pages, in reading order. */

export function parseSummary(source, file = 'SUMMARY.md') {
  const groups = [];
  let group = null;
  let sawTitle = false;
  for (const [index, raw] of source.split('\n').entries()) {
    const line = raw.trimEnd();
    if (!line.trim() || line.trim().startsWith('<!--')) continue;
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      if (heading[1] === '#' && !sawTitle) { sawTitle = true; continue; } // document title
      group = {title: heading[2].trim(), items: []};
      groups.push(group);
      continue;
    }
    const item = /^\s*[-*]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*$/.exec(line);
    if (!item) throw new Error(`${file}:${index + 1}: expected "- [Title](path.md)" or a heading, got: ${line}`);
    if (!group) {
      group = {title: '', items: []};
      groups.push(group);
    }
    group.items.push({title: item[1].trim(), src: item[2]});
  }
  return groups.filter(g => g.items.length);
}

/** Pages in reading order, for previous / next links. */
export function flatten(groups) {
  return groups.flatMap(group => group.items.map(item => ({...item, group: group.title})));
}
