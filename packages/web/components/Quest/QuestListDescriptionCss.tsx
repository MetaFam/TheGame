/**
 * Quest List Description CSS
 * The descriptions for quests can contain HTML or Markdown
 * These styles strip all the formatting so it will look consistent on
 * all of the tiles in the list.
 *
 * Consistent meaning it looks like body text, and there are no paragraph breaks
 * i.e.
 * no margins
 * font size is all the same
 * font-weight is all the same
 * ...
 *
 * It's done by setting styles on a wrapper, then setting all: inherit on everything inside that wrapper
 * ref: https://developer.mozilla.org/en-US/docs/Web/CSS/all
 */

export const questListDescriptionCss = {
  '.mg-quest-tile-description': {
    // Basic appearance matches body text / Figma design
    color: 'white',
    fontFamily: 'body',
    fontSize: 'var(--chakra-fontSizes-md)',
    fontWeight: '400',
    lineHeight: '1.5',
    margin: '0',
    padding: '0',

    '& *': {
      all: 'inherit', // use the styles above
      display: 'revert', // things that should be display: inline are inlined, and etc
    },
  },
};
