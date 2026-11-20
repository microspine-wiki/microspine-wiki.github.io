/* Heading anchors that match GitHub's, so `page.md#some-heading` links work in
   the GitHub file viewer and on the built site alike. */

// GitHub lowercases, drops everything except letters, marks, numbers,
// connector punctuation (underscore), hyphens and spaces, then turns each
// space into a hyphen. It does not collapse or trim hyphens.
const DROP = /[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu;

export function slugify(text) {
  return text.trim().toLowerCase().replace(DROP, '').replace(/ /g, '-');
}

/** Per-page slugger: repeated headings get -1, -2 … like GitHub. */
export function createSlugger() {
  const seen = new Map();
  return text => {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}
