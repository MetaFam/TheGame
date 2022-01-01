import { Layout, Layouts } from 'react-grid-layout';
import { BoxType } from 'utils/boxTypes';

export const getBoxLayoutItemDefaults = (boxId: BoxType): Layout => {
  switch (boxId) {
    case BoxType.PLAYER_HERO:
      return {
        i: BoxType.PLAYER_HERO,
        x: 0,
        y: 0,
        w: 1,
        h: 14,
        static: true,
        maxW: 1,
      };
    case BoxType.PLAYER_SKILLS:
      return { i: BoxType.PLAYER_SKILLS, x: 0, y: 0, w: 1, h: 7, maxW: 1 };
    case BoxType.PLAYER_NFT_GALLERY:
      return {
        i: BoxType.PLAYER_NFT_GALLERY,
        x: 0,
        y: 0,
        w: 1,
        h: 10,
        maxW: 1,
      };
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return {
        i: BoxType.PLAYER_DAO_MEMBERSHIPS,
        x: 0,
        y: 0,
        w: 1,
        h: 9,
        maxW: 1,
      };
    case BoxType.PLAYER_ACHIEVEMENTS:
      return {
        i: BoxType.PLAYER_ACHIEVEMENTS,
        x: 0,
        y: 0,
        w: 1,
        h: 4,
        maxW: 1,
      };
    case BoxType.PLAYER_TYPE:
      return { i: BoxType.PLAYER_TYPE, x: 0, y: 0, w: 1, h: 6, maxW: 1 };
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return {
        i: BoxType.PLAYER_COLOR_DISPOSITION,
        x: 0,
        y: 0,
        w: 1,
        h: 5,
        maxW: 1,
      };
    case BoxType.PLAYER_ROLES:
      return { i: BoxType.PLAYER_ROLES, x: 0, y: 0, w: 1, h: 3, maxW: 1 };
    case BoxType.PLAYER_ADD_BOX:
      return {
        i: BoxType.PLAYER_ADD_BOX,
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        maxW: 1,
        isResizable: false,
        isDraggable: false,
      };
    default:
      return { i: '', x: 0, y: 0, w: 1, h: 1, maxW: 1 };
  }
};

const gridDataLg: Layout[] = [
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_HERO), x: 0, y: -3 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_SKILLS), x: 1, y: 0 },
  {
    ...getBoxLayoutItemDefaults(BoxType.PLAYER_COLOR_DISPOSITION),
    x: 1,
    y: 7,
  },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_TYPE), x: 1, y: 12 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_NFT_GALLERY), x: 2, y: 0 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_DAO_MEMBERSHIPS), x: 2, y: 10 },
];

const gridDataMd: Layout[] = [
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_HERO), x: 0, y: -3 },
  {
    ...getBoxLayoutItemDefaults(BoxType.PLAYER_COLOR_DISPOSITION),
    x: 1,
    y: 0,
  },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_SKILLS), x: 1, y: 5 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_TYPE), x: 1, y: 6 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_NFT_GALLERY), x: 0, y: 7 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_DAO_MEMBERSHIPS), x: 0, y: 16 },
];

const gridDataSm: Layout[] = [
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_HERO), x: 0, y: 0 },
  {
    ...getBoxLayoutItemDefaults(BoxType.PLAYER_COLOR_DISPOSITION),
    x: 0,
    y: 10,
  },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_SKILLS), x: 0, y: 15 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_TYPE), x: 0, y: 19 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_NFT_GALLERY), x: 0, y: 7 },
  { ...getBoxLayoutItemDefaults(BoxType.PLAYER_DAO_MEMBERSHIPS), x: 0, y: 16 },
];

export const initLayouts: Layouts = {
  lg: gridDataLg,
  md: gridDataMd,
  sm: gridDataSm,
};

export const gridConfig = {
  wrapper: (editable: boolean): Record<string, unknown> => ({
    '.gridItem': {
      boxShadow: editable
        ? '0 0 10px rgba(0,0,0,0.6)'
        : '0 0 0 rgba(0,0,0,0.4)',
      bg: editable ? 'blackAlpha.600' : 'blackAlpha.300',
      overflow: 'hidden',
      borderRadius: 'lg',
      transition: 'boxShadow 0.2s 0.3s ease',
      '& > div': {
        overflow: 'hidden',
        h: '100%',
      },
      '.container': {
        h: '100%',
        overflow: 'hidden',
      },
    },
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
    },
    '.react-resizable-handle::after': {
      border: 'none',
    },
  }),
};
