import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import { GroupBase, StylesConfig } from 'react-select';

import { isBackdropFilterSupported } from '../compatibilityHelpers';
import { colors } from './colors';
import { menuTheme } from './menu';
import { textStyles } from './texts';

const modalContentStyles = isBackdropFilterSupported()
  ? {
      backgroundColor: 'whiteAlpha.200',
      backdropFilter: 'blur(7px)',
    }
  : {
      backgroundColor: 'dark',
    };

export const theme = extendTheme(
  {
    components: {
      Avatar: {
        sizes: {
          '3xl': {
            container: {
              width: 56,
              height: 56,
              fontSize: 'calc(10rem / 2.5)',
            },
          },
        },
      },
      Button: {
        variants: {
          outline: {
            borderColor: 'blue.300',
            color: 'blue.300',
            _hover: {
              bg: 'rgba(0, 0, 0, 0.24)',
              borderColor: 'blue.200',
              color: 'blue.200',
            },
            _active: {
              bg: 'rgba(0, 0, 0, 0.48)',
              borderColor: 'blue.800',
              color: 'blue.800',
            },
            _disabled: {
              opacity: 0.5,
            },
          },
        },
      },
      Input: {
        variants: {
          outline: {
            field: {
              backgroundColor: 'dark',
            },
          },
        },
      },
      Menu: menuTheme,
      Modal: {
        defaultProps: {
          isCentered: true,
          scrollBehavior: 'inside',
          size: '5xl',
        },
        baseStyle: {
          dialogContainer: {
            alignItems: 'center',
            overflow: 'hidden',
          },
          header: {
            fontSize: ['2rem', '2rem', '2.5rem'],
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: 'body',
          },
          closeButton: {
            fontSize: '1.25rem',
            color: 'pinkShadeOne',
            m: 2,
            _focus: { boxShadow: 'none' },
            _hover: { color: 'white' },
          },
          dialog: {
            color: 'white',
            ml: 4,
            mr: 4,
            maxW: 'xl',
            maxH: 'calc(100% - 10rem)',
            p: [2, 2, 4, 8],
            ...modalContentStyles,
          },
          body: {
            px: 2,
            overflow: 'auto',
          },
        },
      },
    },
    breakpoints: {
      base: '0em',
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
      '3xl': '120em',
      '4xl': '160em',
    },
    styles: {
      global: {
        body: {
          background: colors.dark,
          '&.no-motion': {
            '*': {
              transition: 'none !important',
              animation: 'none !important',
            },
          },
          '&.dashboard-edit': {
            overflow: { base: 'hidden', xl: 'initial' }, // Locks scrolling on the body when resizing or dragging the grid on mobile devices
          },
          '&.landing h1': {},
          '.screen-text': {
            color: 'landing500',
            textShadow: '0 0 5px var(--chakra-colors-landing500)',
          },
          '.gradient-cone': {
            background:
              'conic-gradient(from 92.2deg at 53.45% 74.83%, #8EBBFF 0deg, #DE3FFF 88.12deg, #79F8FB 105deg, #7C56FF 165deg, #FF61E6 251.25deg, #927CFF 286.87deg, #76EBF2 326.25deg, #8EBBFF 360deg)',
            backgroundPosition: '-254%',
            backgroundSize: '133%',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitTextFillColor: 'transparent',
            transition: 'background 0.3s ease',
          },
          '.gradient': {
            background:
              'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          '.gradient-text': {
            background:
              'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          '.border-grad': {
            border: '1px double transparent',
            background: 'transparent',
            backgroundImage:
              'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'padding-box, border-box',
            backgroundOrigin: 'border-box',
            WebkitBackgroundOrigin: 'border-box',
            boxSizing: 'border-box',
            '& > span': {
              background:
                'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
            },
            '&:hover': {
              backgroundImage:
                'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
              backgroundSize: '130%',
              '& > span': {
                background:
                  'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              },
            },
          },

          // 'ubdiv#userback_button_container': {
          //   '.userback-controls[wstyle]': {
          //     background: 'var(--chakra-colors-whiteAlpha-200)',
          //     backdropFilter: 'blur(7px)',
          //     color: 'white !important',

          //     '.userback-controls-step': {

          //       '.userback-controls-options': {
          //         'ubroutemenu.userback-feedback-type-form': {
          //           color: 'white !important',
          //           transition: 'all 0.3s ease',
          //           '&:hover': {
          //             background: 'var(--chakra-colors-whiteAlpha-600) !important',
          //           },
          //           'ubdiv': {
          //             color: 'white !important',
          //           }
          //         },
          //         '.userback-controls-form': {
          //         }
          //       }
          //     }
          //   }
          // }
        },
        '::-webkit-scrollbar': {
          width: { base: '5px', lg: '12px' },
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: colors.dark,
          borderRadius: '2px',
          boxShadow: 'inset 0 0 5px rgb(0 0 0 / 70%)',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: colors.pink[400],
          borderRadius: '2px',
          boxShadow: '0 0 5px rgb(0 0 0 / 70%)',
          transition: 'background 0.3s ease',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: colors.pink[600],
        },
        '#__next': {
          background: colors.dark,
          color: colors.white,
          minHeight: '100vh',
          option: {
            background: colors.dark,
            color: colors.white,
          },
        },
        '#WEB3_CONNECT_MODAL_ID': {
          position: 'relative',
          zIndex: '500',
          '.web3modal-modal-card': {
            position: 'relative',
            background: colors.dark,
            boxShadow: '0 0 20px rgba(0 0 0 / 80%)',
            border: '1px solid var(--chakra-colors-landing600)',
            minHeight: '33vh',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/logo.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '50%',
              backgroundPosition: '-50% 50%',
              backgroundClip: 'border-box',
              opacity: 0.3,
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/octopus.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '66%',
              backgroundPosition: '195% 50%',
              backgroundClip: 'border-box',
              opacity: 0.5,
              zIndex: 0,
            },
          },
          '.web3modal-provider-wrapper': {
            border: 'none',
            padding: 0,
            zIndex: 1,
          },
          '.web3modal-provider-container': {
            background: colors.transparent,
            flexGrow: '1',
            border: '3px solid transparent',
            transition: 'border 0.2s ease',
            '&:hover': {
              border: '3px solid var(--chakra-colors-landing600)',
            },
          },
          '.web3modal-provider-icon': {
            img: {
              filter: 'drop-shadow(0 0 0.5rem var(--chakra-colors-landing600))',
            },
          },
          '.web3modal-provider-name': {
            color: colors.landing600,
            background:
              'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          '.web3modal-provider-description': {
            color: colors.landing600,
          },
        },
        'pre > .chakra-code, code.chakra-code': {
          bg: 'purpleBoxDark',
          color: 'pink.300',
          borderRadius: 'md',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.65) inset',
        },
      },
    },
    sizes: {
      container: {
        xl: '85rem',
      },
    },
    colors,
    textStyles,
    fonts: {
      body: '"Exo 2", sans-serif',
      mono: '"Exo 2", sans-serif',
      heading: '"Press Start 2P", sans-serif',
      exo: '"Exo 2", sans-serif',
      exo2: '"Exo 2", sans-serif',
      landingHeading: '"Poppins", sans-serif',
      onboarding: '"Courier Prime", serif',
    },
    // reference scale
    // https://type-scale.com/?size=16&scale=1.200&text=A%20Visual%20Type%20Scale&font=Exo%202&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.6&backgroundcolor=%23330964&fontcolor=%23ffffff&preview=false
    fontSizes: {
      xs: '0.694rem',
      sm: '0.833rem',
      md: '1rem',
      lg: '1.2rem',
      xl: '1.25rem',
      '2xl': '1.44rem',
      '3xl': '1.728rem',
      '4xl': '2.074rem',
      '5xl': '2.488rem',
      '6xl': '2.986rem',
      '7xl': '3.583rem',
      '8xl': '4.3rem',
      '9xl': '5.16rem',
    },
  },
  withProse({
    baseStyle: {
      fontFamily: 'body',
      h1: {
        fontFamily: 'body',
        fontSize: '3xl',
        fontWeight: 'bold',
      },
      h2: {
        fontFamily: 'body',
        fontSize: '3xl',
        fontWeight: 'bold',
        color: 'white',
      },
      h3: {
        fontFamily: 'body',
        fontSize: '2xl',
        fontWeight: 'bold',
        color: 'white',
      },
      h4: {
        fontFamily: 'body',
        fontSize: 'xl',
        fontWeight: 'bold',
        color: 'white',
      },
      a: {
        color: 'cyanText',
      },
      code: {
        bg: 'purpleBoxDark',
        color: 'pink.300',
        borderRadius: 'md',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.65) inset',
        fontFamily: 'body',
        fontWeight: 'normal',
        fontSize: 'md',
      },
      pre: {
        bg: 'purpleBoxDark',
        color: 'white',
        borderRadius: 'md',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.65) inset',
        fontFamily: 'body',
        code: {
          bg: 'transparent',
          boxShadow: 'none',
          color: 'pink.300',
        },
      },
      details: {
        mt: 4,
        mb: 6,
        summary: {
          fontWeight: 'bold',
          fontSize: 'lg',
        },
      },
    },
  }),
);

type LabeledValue<T> = Required<{ label?: string; value?: T }>;
type Styles = StylesConfig<
  LabeledValue<string>,
  boolean,
  GroupBase<LabeledValue<string>>
>;

export const selectStyles: Styles = {
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    background: (() => {
      if (isSelected) {
        return theme.colors.blueLight;
      }
      if (isFocused) {
        return theme.colors.purpleTag;
      }
      return theme.colors.dark;
    })(),
    color:
      isSelected || isFocused
        ? theme.colors.white
        : theme.colors.whiteAlpha[700],
    '&:hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    border: `1px solid ${theme.colors.white}`,
    padding: '0.25em 0.5em',
    borderRadius: 10,
    minWidth: '17em',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.blueLight,
    },
  }),
};

export const multiSelectStyles: Styles = {
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  menuList: (styles) => ({
    ...styles,
    paddingTop: 0,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  group: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  groupHeading: (styles) => ({
    ...styles,
    color: theme.colors.white,
    background: theme.colors.purple[400],
    paddingTop: theme.space['3'],
    paddingBottom: theme.space['3'],
    position: 'sticky',
    top: 0,
    borderRadius: theme.radii.md,
  }),
  option: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    ':hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    border: theme.colors.dark,
  }),
  multiValue: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
  }),
};

export const searchSelectStyles: Styles = {
  menuPortal: (styles) => ({
    ...styles,
    borderRadius: theme.radii.md,
  }),
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    minWidth: '15rem',
    border: `2px solid ${theme.colors.borderPurple}`,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  group: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  groupHeading: (styles) => ({
    ...styles,
    color: theme.colors.white,
    background: theme.colors.purple[400],
    paddingTop: theme.space['3'],
    paddingBottom: theme.space['3'],
    position: 'sticky',
    top: 0,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: theme.colors.whiteAlpha[100],
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    minWidth: '6rem',
    color: theme.colors.white,
    background: theme.colors.dark,
    border: `2px solid ${theme.colors.borderPurple}`,
    '&:hover': {
      borderColor: theme.colors.white,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.blueLight,
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.blueLight,
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.blueLight,
    },
  }),
};

export const dropdownStyles: Styles = {
  ...searchSelectStyles,
  multiValue: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  multiValueLabel: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  groupHeading: (s) => ({
    ...s,
    color: theme.colors.white,
    background: theme.colors.purple[400],
    paddingTop: theme.space['3'],
    paddingBottom: theme.space['3'],
    position: 'sticky',
    top: 0,
    borderTop: `1px solid ${theme.colors.borderPurple}`,
    margin: 0,
  }),
  option: (s, { isSelected, isFocused }) => ({
    ...s,
    backgroundColor: 'transparent',
    fontWeight: isSelected || isFocused ? 'bold' : 'normal',
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.colors.white,
    },
    '&:focus': {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
  }),
  menu: () => ({
    minWidth: '100%',
    border: `1px solid ${theme.colors.white}`,
  }),
  group: () => ({
    minWidth: '100%',
  }),
  control: (s) => ({
    ...s,
    background: theme.colors.dark,
    border: 'none',
    width: '100%',
    '&:hover': {},
  }),
};

export const chakraesqueStyles: Styles = {
  ...searchSelectStyles,
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    background: (() => {
      if (isFocused) {
        return theme.colors.green[100];
      }
      if (isSelected) {
        return theme.colors.blueLight;
      }
      return theme.colors.dark;
    })(),
    color: (() => {
      if (isFocused) {
        return theme.colors.black;
      }
      if (isSelected) {
        return theme.colors.white;
      }
      return theme.colors.whiteAlpha[700];
    })(),
    '&:hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: (styles, props) => ({
    ...styles,
    ...searchSelectStyles.control?.(styles, props),
    background: theme.colors.dark,
    border: `1px soild ${theme.colors.white}`,
    padding: '0.25em 0.5em',
    borderRadius: 10,
  }),
  singleValue: (style) => ({
    ...style,
    color: theme.colors.white,
  }),
};
