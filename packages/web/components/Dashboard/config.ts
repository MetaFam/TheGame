export const tokenId = 'metagame';
export const apiUrl = 'https://api.coingecko.com/api/v3/';
export const tokenQuery = '?localization=false&tickers=true&market_data=true';
export const chartQuery =
  '/market_chart?vs_currency=usd&days=30&interval=daily';
export const podcastRSSURL = 'https://anchor.fm/s/57a641c/podcast/rss';

export const gridData = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 6, minW: 3 },
  { i: 'xp', x: 6, y: 0, w: 3, h: 2, minH: 2, minW: 3 },
  { i: 'seed', x: 9, y: 0, w: 3, h: 2, minH: 2, minW: 3 },
  { i: 'calendar', x: 6, y: 2, w: 3, h: 4, minW: 3 },
  { i: 'leaderboard', x: 9, y: 2, w: 3, h: 4, minW: 3 },
];

export const gridDataMd = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 4, minW: 3 },
  { i: 'xp', x: 6, y: 0, w: 6, h: 2, minH: 2, minW: 3 },
  { i: 'seed', x: 6, y: 2, w: 6, h: 2, minH: 2, minW: 3 },
  { i: 'calendar', x: 0, y: 4, w: 6, h: 4, minW: 3 },
  { i: 'leaderboard', x: 6, y: 4, w: 6, h: 4, minW: 3 },
];

export const gridDataSm = [
  { i: 'latest', x: 0, y: 4, w: 4, h: 3, minW: 3 },
  { i: 'xp', x: 0, y: 0, w: 4, h: 2, minW: 3 },
  { i: 'seed', x: 0, y: 2, w: 4, h: 2, minW: 3 },
  { i: 'calendar', x: 0, y: 7, w: 4, h: 4, minW: 3 },
  { i: 'leaderboard', x: 0, y: 11, w: 4, h: 4, minW: 3 },
];

export const initLayouts = {
  lg: gridData,
  md: gridDataMd,
  sm: gridDataSm,
};

export const gridSX = {
  '.react-grid-placeholder': {
    bg: 'purple',
    boxShadow: '0 0 0 solid rgba(0, 0, 0, 0.8)',
    borderRadius: 'lg',
  },
  '.react-resizable-handle': {
    width: '1rem',
    height: '1rem',
    background: 'none',
    borderStyle: 'solid',
    borderColor: 'pinkShadeOne',
    borderWidth: '0 2px 2px 0',
    borderRadius: '0 0 6px 0',
    margin: '2px',
    zIndex: 11,
  },
  '.react-resizable-handle::after': {
    border: 'none',
  },
};

export const SEEDChartWrapperStyles = {
  '.seed-chart': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxW: '100%',
    '.seed-chart-path': {
      bottom: 0,
      strokeWidth: 2,
      fillOpacity: 0,
      '&--fill': {
        fillOpacity: 0.5,
        strokeWidth: 0,
      },
    },
  },
};

export const XPChartWrapperStyles = {
  '.xp-chart': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxW: '100%',
    '.xp-chart-path': {
      bottom: 0,
      strokeWidth: 2,
      fillOpacity: 0,
      '&--fill': {
        fillOpacity: 0.5,
        strokeWidth: 0,
      },
    },
  },
};
