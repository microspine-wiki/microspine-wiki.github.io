/* Site-wide settings. Everything a fork needs to change lives here. */
export default {
  title: 'Microspine Wiki',
  tagline: 'An open handbook on microspines and spine-based climbing',
  description:
    'Community-maintained notes on how microspines work, how to design, build and test spine arrays, ' +
    'and the robots and human-scale systems that have climbed with them.',
  language: 'en',

  // Set these once the repository exists; "Edit this page" links and the
  // canonical URLs stay hidden while they are empty.
  repository: 'https://github.com/microspine-wiki/microspine-wiki.github.io',
  branch: 'main',
  siteUrl: 'https://microspine-wiki.github.io/',

  license: {
    text: 'CC BY 4.0',
    url: 'https://creativecommons.org/licenses/by/4.0/',
  },

  // Labels shown next to a page title, from the page's `status:` front matter.
  statuses: {
    stub: 'Stub: an outline that needs writing',
    draft: 'Draft: complete enough to use, not yet reviewed',
    reviewed: 'Reviewed against its sources',
  },
};
