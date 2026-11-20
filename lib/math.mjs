/* LaTeX → MathML at build time. Readers download no math scripts or fonts;
   browsers typeset MathML natively. Authors write $inline$ and $$display$$,
   which GitHub and Obsidian also render. */
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const katex = require('../vendor/katex/katex.cjs');

// Shorthands used across the wiki. Keep this list short: every macro here is
// one more thing that will not render in GitHub's Markdown preview.
const macros = {};

export function renderMath(tex, {display, where}) {
  try {
    const html = katex.renderToString(tex, {
      output: 'mathml',
      displayMode: display,
      throwOnError: true,
      strict: 'error',
      trust: false,
      macros: {...macros},
    });
    // KaTeX wraps MathML in <span class="katex">; the wrapper carries no
    // styling without katex.css, so expose a class of our own instead.
    return html.replace('<span class="katex">', `<span class="math${display ? ' math-display' : ''}">`);
  } catch (error) {
    throw new Error(`${where}: LaTeX error in "${tex.trim().slice(0, 80)}": ${error.message}`);
  }
}

/* ---- markdown-it rules ---------------------------------------------------- */

function delimiter(state, pos) {
  const prev = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const next = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1;
  const space = code => code === 0x20 || code === 0x09 || code === 0x0a;
  return {
    canOpen: !space(next) && next !== -1,
    // "$5 and $6" is money, not math: a closing $ is never followed by a digit.
    canClose: !space(prev) && !(next >= 0x30 && next <= 0x39),
  };
}

function inlineRule(state, silent) {
  if (state.src.charCodeAt(state.pos) !== 0x24 /* $ */) return false;
  if (state.src.charCodeAt(state.pos + 1) === 0x24) return false; // $$ handled by the block rule
  if (!delimiter(state, state.pos).canOpen) {
    if (!silent) state.pending += '$';
    state.pos += 1;
    return true;
  }
  const start = state.pos + 1;
  let match = start;
  while ((match = state.src.indexOf('$', match)) !== -1 && match <= state.posMax) {
    let back = match - 1;
    while (state.src[back] === '\\') back -= 1;
    if ((match - back) % 2 === 1) break; // not escaped
    match += 1;
  }
  if (match === -1 || match > state.posMax || match === start || !delimiter(state, match).canClose) {
    if (!silent) state.pending += '$';
    state.pos = start;
    return true;
  }
  if (!silent) {
    const token = state.push('math_inline', 'math', 0);
    token.markup = '$';
    token.content = state.src.slice(start, match);
  }
  state.pos = match + 1;
  return true;
}

function blockRule(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.src.slice(pos, pos + 2) !== '$$') return false;
  if (silent) return true;

  let first = state.src.slice(pos + 2, max);
  let last = '';
  let line = startLine;
  let closed = false;
  if (first.trim().endsWith('$$')) {
    first = first.trim().slice(0, -2);
    closed = true;
  }
  while (!closed) {
    line += 1;
    if (line >= endLine) break;
    pos = state.bMarks[line] + state.tShift[line];
    max = state.eMarks[line];
    const text = state.src.slice(pos, max);
    if (text.trim().endsWith('$$')) {
      last = text.trim().slice(0, -2);
      closed = true;
    }
  }
  if (!closed) return false;

  const middle = line > startLine + 1 ? state.getLines(startLine + 1, line, state.tShift[startLine], true) : '';
  const token = state.push('math_block', 'math', 0);
  token.block = true;
  token.markup = '$$';
  token.content = [first.trim(), middle.trim(), last.trim()].filter(Boolean).join('\n');
  token.map = [startLine, line + 1];
  state.line = line + 1;
  return true;
}

export function mathPlugin(md) {
  md.inline.ruler.after('escape', 'math_inline', inlineRule);
  md.block.ruler.after('blockquote', 'math_block', blockRule, {alt: ['paragraph', 'reference', 'blockquote', 'list']});
  md.renderer.rules.math_inline = (tokens, index, options, env) =>
    renderMath(tokens[index].content, {display: false, where: env.where});
  md.renderer.rules.math_block = (tokens, index, options, env) =>
    `<div class="math-block">${renderMath(tokens[index].content, {display: true, where: env.where})}</div>\n`;
}
