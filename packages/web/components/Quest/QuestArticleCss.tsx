/**
 * Quest Article CSS
 * The typography for the quest description is different to the standard withProse/Markdown
 * ref: https://www.figma.com/file/2yEeQUrgPOrLOq6DpC6Mb7/Quests-UI?node-id=519-2199&t=f7ABDY7Dw2Yxtrsc-0
 *
 * Main things
 * - Block elements have bottom margins but no top margin / The margins are tighter
 * - The font sizes are larger
 */

export const questArticleCss = {
  '.mg-article-typography': {
    // Basic coverage
    fontSize: 'var(--chakra-fontSizes-xl)',
    lineHeight: '1.4',

    // Margins/font-size for main block elements that might be in the article
    'address, aside, blockquote, details, dl, figure, form, ol, p, pre, section, table, ul':
      {
        fontSize: 'var(--chakra-fontSizes-xl)',
        lineHeight: '1.4',
        marginBottom: 'var(--chakra-space-8)',
        marginTop: '0',
      },

    summary: {
      fontSize: 'var(--chakra-fontSizes-2xl)',
      cursor: 'pointer',
    },

    // Specific to headings
    // Includes HHH-GH being opinionated with the marginTop
    'h1, h2, h3, h4, h5, h6': {
      marginTop: 'var(--chakra-space-12)', // extra space between heading and preceding content ...
      marginBottom: 'var(--chakra-space-8)',
    },
    'h1:first-of-type, h2:first-of-type, h3:first-of-type, h4:first-of-type, h5:first-of-type, h6:first-of-type':
      {
        marginTop: '0', // ... unless it's the first one
      },

    ':is(h1, h2, h3, h4, h5, h6) + :is(h1, h2, h3, h4, h5, h6)': {
      marginTop: '0', // ... or if two headings are adjacent
    },
    'h1, h2': {
      fontSize: 'var(--chakra-fontSizes-4xl)',
    },
    h3: {
      fontSize: 'var(--chakra-fontSizes-3xl)',
    },
    'h4, h5, h6': {
      fontSize: 'var(--chakra-fontSizes-xl)',
    },
  },
};
