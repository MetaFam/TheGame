export const gridData = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 6 },
  { i: 'xp', x: 6, y: 0, w: 3, h: 2 },
  { i: 'seed', x: 9, y: 0, w: 3, h: 2 },
  { i: 'calendar', x: 6, y: 2, w: 3, h: 4 },
  { i: 'leaderboard', x: 9, y: 2, w: 3, h: 4 },
];

export const gridDataMd = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 4 },
  { i: 'xp', x: 6, y: 0, w: 6, h: 2 },
  { i: 'seed', x: 6, y: 2, w: 6, h: 2 },
  { i: 'calendar', x: 0, y: 4, w: 6, h: 4 },
  { i: 'leaderboard', x: 6, y: 4, w: 6, h: 4 },
];

export const gridDataSm = [
  { i: 'latest', x: 0, y: 3, w: 4, h: 3 },
  { i: 'xp', x: 0, y: 0, w: 2, h: 2 },
  { i: 'seed', x: 2, y: 0, w: 2, h: 2 },
  { i: 'calendar', x: 0, y: 5, w: 2, h: 4 },
  { i: 'leaderboard', x: 2, y: 5, w: 2, h: 4 },
];

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
        fontFamily: 'mono',
        fontSize: 'sm',
        fontWeight: 'bold',
        color: 'blueLight',
        mr: 'auto',
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
        height: '100%',
      },
      h2: {
        fontFamily: 'exo',
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
  calendar: {
    '.calendar': {
      '&__day': {
        '&--title': {
          transition: 'all 0.3s ease',
        },
        '&--event': {
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 8px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          },
          h4: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    '&.container': {
      '&__xxs': {
        '.calendar': {
          '&__day': {
            '&--title': {
              fontSize: 'xs',
              px: 1,
            },
            '&--event': {
              py: 1,
              px: 2,
              h4: {
                visibility: 'hidden',
                maxH: 0,
              },
              span: {
                fontSize: '12px',
                fontWeight: '700',
              },
              _hover: {},
            },
          },
        },
      },
      '&__xs': {
        '.calendar': {
          '&__day': {
            '&--title': {
              fontSize: 'xs',
              px: 3,
            },
            '&--event': {
              py: 2,
              px: 3,
              h4: {
                fontSize: 'sm',
              },
              span: {
                fontSize: '12px',
              },
              _hover: {},
            },
          },
        },
      },
    },
  },
  latest: {
    '&.container': {
      '&__xs': {
        '.chakra-tabs': {
          '&__tab-panel': {
            p: {
              color: 'purple.50',
            },
            // '&--read': {
            //   p: {
            //     color: 'purple.50',
            //   },
            // },
            // '&--listen': {
            //   p: {
            //     color: 'purple.200',
            //   },
            // },
            // '&--watch': {
            //   p: {
            //     color: 'purple.300',
            //   },
            // },
          },
        },
      },
      '&__sm': {
        '.chakra-tabs': {
          '&__tab-panel': {
            p: {
              color: 'purple.200',
            },
          },
        },
      },
      '&__md': {
        '.chakra-tabs': {
          '&__tab-panel': {
            p: {
              color: 'purple.300',
            },
          },
        },
      },
      '&__lg': {
        '.chakra-tabs': {
          '&__tab-panel': {
            p: {
              color: 'pink.400',
            },
          },
        },
      },
    },
  },
  leaderboard: {
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
  seed: {
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
            mt: 1,
          },
          '&__label': {
            fontSize: 'xs',
          },
          '&:last-of-type': {
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
  xp: {
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
