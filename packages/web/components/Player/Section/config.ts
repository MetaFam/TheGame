export const tokenId = 'metagame';
export const apiUrl = 'https://api.coingecko.com/api/v3/';
export const tokenQuery = '?localization=false&tickers=true&market_data=true';
export const chartQuery =
  '/market_chart?vs_currency=usd&days=30&interval=daily';
export const podcastRSSURL = 'https://anchor.fm/s/57a641c/podcast/rss';

export const gridData = [
  { i: 'hero', x: 0, y: 0, w: 4, h: 6, static: true, minW: 4, maxW: 4 },
  { i: 'colors', x: 4, y: 1, w: 4, h: 2, minH: 2, maxH: 2, minW: 4, maxW: 4 },
  { i: 'skills', x: 8, y: 1, w: 4, h: 2.5, minH: 2.5, minW: 4, maxW: 4 },
  { i: 'type', x: 4, y: 3, w: 4, h: 2, minH: 2, minW: 4, maxW: 4 },
  { i: 'memberships', x: 8, y: 4, w: 4, h: 4, minW: 4, maxW: 4 },
];

export const gridDataMd = [
  { i: 'hero', x: 0, y: 0, w: 6, h: 4, static: true },
  { i: 'colors', x: 6, y: 0, w: 6, h: 2, minH: 2 },
  { i: 'skills', x: 6, y: 1, w: 6, h: 2, minH: 2 },
  { i: 'type', x: 0, y: 4, w: 6, h: 4 },
  { i: 'memberships', x: 6, y: 4, w: 6, h: 4 },
];

export const gridDataSm = [
  { i: 'hero', x: 0, y: 4, w: 4, h: 3, static: true },
  { i: 'colors', x: 0, y: 0, w: 4, h: 2 },
  { i: 'skills', x: 0, y: 2, w: 4, h: 2 },
  { i: 'type', x: 0, y: 7, w: 4, h: 4 },
  { i: 'memberships', x: 0, y: 11, w: 4, h: 4 },
];

export const initLayouts = {
  lg: gridData,
  md: gridDataMd,
  sm: gridDataSm,
  xs: gridDataSm,
};

export const gridConfig = {
  wrapper: (editable: boolean): Record<string, unknown> => ({
    '.gridItem': {
      boxShadow: editable
        ? '0 0 10px rgba(0,0,0,0.4)'
        : '0 0 0 rgba(0,0,0,0.4)',
      borderTopRadius: 'lg',
      height: 'unset',
      overflow: 'hidden',
      transition: 'boxShadow 0.2s 0.3s ease',
      p: {
        fontSize: 'md',
        pb: 2,
        mr: 'auto',
      },
      ul: {
        fontSize: 'sm',
        pb: 2,
        pl: 6,
      },
      '& > div': {
        bg: editable ? 'blackAlpha.500' : 'blackAlpha.300',
        backdropFilter: 'blur(10px)',
        borderBottomRadius: 'lg',
        overflow: 'hidden',
        h: '100%',
        transition: 'bg 0.2s 0.3s ease',
      },
      '.container': {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
      },
      h2: {
        fontFamily: 'exo2',
        fontSize: 'lg',
        fontWeight: '700',
        textAlign: 'left',
        textTransform: 'uppercase',
      },
    },
    '.react-grid-placeholder': {
      bg: 'purple',
      boxShadow: '0 0 0 solid rgba(0, 0, 0, 0.8)',
      borderRadius: 'lg',
    },
  }),
  memberships: {
    '.player': {
      transition: 'all 0.3s ease',
      '&__score': {
        fontWeight: '400',
      },
      '&:hover': {
        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      },
    },
    '&.container': {
      '&__xxs': {
        '.player': {
          px: 3,
          py: 2,
          fontSize: 'sm',
          justifyContent: 'center',
          opacity: 1,
          '&__position, &__name, &__score': {
            visibility: 'hidden',
            maxW: 0,
            maxH: 0,
            mr: 0,
          },
          '&__avatar': {
            mr: 0,
          },
        },
      },
      '&__xs': {
        '.player': {
          px: 3,
          fontSize: 'sm',
        },
      },
    },
  },
  skills: {
    '&.container': {
      '&__xxs': {
        '.chakra-stack': {
          flexFlow: 'column',
          alignItems: 'flex-start',
          p: {
            mx: 0,
          },
        },
        '.chakra-stat': {
          '&__group': {
            mt: 3,
            mb: 0,
          },
          '&__label': {
            fontSize: 'xs',
          },
          '&__number': {
            fontSize: 'lg',
          },
          '&:nth-of-type(3n)': {
            display: 'none',
          },
        },
        '.infoLink': {
          display: 'none',
        },
      },
      '&__xs': {
        '.chakra-stat': {
          '&__label': {
            fontSize: 'xs',
          },
        },
      },
    },
  },
  colors: {
    '&.container': {
      '&__xxs': {
        '.chakra-stack': {
          flexFlow: 'column wrap',
          alignItems: 'flex-start',
          p: {
            mx: 0,
          },
        },
        '.chakra-stat': {
          flex: '0 1 100%',
          '&__group': {
            mt: 1,
          },
          '&__label': {
            fontSize: 'xs',
          },
          '&:nth-of-type(3), &:last-of-type': {
            display: 'none',
          },
        },
      },
      '&__xs': {
        '.chakra-stat': {
          '&__label': {
            fontSize: 'xs',
          },
        },
      },
    },
  },
};
