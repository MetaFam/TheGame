import { Layout, Layouts } from 'react-grid-layout';
import { BoxMetadata, BoxType, getBoxKey } from 'utils/boxTypes';

export const ALL_BOXES = [
  BoxType.PLAYER_HERO,
  BoxType.PLAYER_SKILLS,
  BoxType.PLAYER_COLOR_DISPOSITION,
  BoxType.PLAYER_TYPE,
  BoxType.PLAYER_NFT_GALLERY,
  BoxType.PLAYER_DAO_MEMBERSHIPS,
  BoxType.PLAYER_ACHIEVEMENTS,
  BoxType.PLAYER_ROLES,
  BoxType.EMBEDDED_URL,
];

export const DEFAULT_BOXES = [
  BoxType.PLAYER_HERO,
  BoxType.PLAYER_SKILLS,
  BoxType.PLAYER_COLOR_DISPOSITION,
  BoxType.PLAYER_TYPE,
  BoxType.PLAYER_NFT_GALLERY,
  BoxType.PLAYER_DAO_MEMBERSHIPS,
];

export type LayoutMetadata = {
  [key: string]: {
    boxType: BoxType;
    boxMetadata: BoxMetadata;
  };
};

export const getBoxLayoutItemDefaults = (boxId: BoxType): Layout => {
  switch (boxId) {
    case BoxType.PLAYER_HERO:
      return {
        i: getBoxKey(BoxType.PLAYER_HERO, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 14,
        maxW: 1,
      };
    case BoxType.PLAYER_SKILLS:
      return {
        i: getBoxKey(BoxType.PLAYER_SKILLS, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 7,
        maxW: 1,
      };
    case BoxType.PLAYER_NFT_GALLERY:
      return {
        i: getBoxKey(BoxType.PLAYER_NFT_GALLERY, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 10,
        maxW: 1,
      };
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return {
        i: getBoxKey(BoxType.PLAYER_DAO_MEMBERSHIPS, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 9,
        maxW: 1,
      };
    case BoxType.PLAYER_ACHIEVEMENTS:
      return {
        i: getBoxKey(BoxType.PLAYER_ACHIEVEMENTS, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 4,
        maxW: 1,
      };
    case BoxType.PLAYER_TYPE:
      return {
        i: getBoxKey(BoxType.PLAYER_TYPE, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 6,
        maxW: 1,
      };
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return {
        i: getBoxKey(BoxType.PLAYER_COLOR_DISPOSITION, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 5,
        maxW: 1,
      };
    case BoxType.PLAYER_ROLES:
      return {
        // boxType: BoxType.PLAYER_ROLES,
        // boxMetadata: {},
        i: getBoxKey(BoxType.PLAYER_ROLES, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        maxW: 1,
      };
    case BoxType.PLAYER_ADD_BOX:
      return {
        i: getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        maxW: 1,
        isResizable: false,
        isDraggable: false,
      };
    case BoxType.EMBEDDED_URL:
      return {
        i: getBoxKey(BoxType.EMBEDDED_URL, {
          url: 'https://github.com/MetaFam/TheGame', // TODO: remove tempUrl
        }),
        x: 0,
        y: 0,
        w: 1,
        h: 6,
        maxW: 1,
        isResizable: false,
      };
    default:
      return {
        i: '',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        maxW: 1,
      };
  }
};

const DEFAULT_BOX_POSITIONS_LG: {
  [boxType: string]: { x: number; y: number };
} = {
  [BoxType.PLAYER_HERO]: { x: 0, y: 0 },
  [BoxType.PLAYER_SKILLS]: { x: 1, y: 0 },
  [BoxType.PLAYER_COLOR_DISPOSITION]: {
    x: 1,
    y: 7,
  },
  [BoxType.PLAYER_TYPE]: { x: 1, y: 12 },
  [BoxType.PLAYER_NFT_GALLERY]: { x: 2, y: 0 },
  [BoxType.PLAYER_DAO_MEMBERSHIPS]: { x: 2, y: 10 },
};
const DEFAULT_BOX_POSITIONS_MD: {
  [boxType: string]: { x: number; y: number };
} = {
  [BoxType.PLAYER_HERO]: { x: 0, y: 0 },
  [BoxType.PLAYER_SKILLS]: { x: 1, y: 5 },
  [BoxType.PLAYER_COLOR_DISPOSITION]: {
    x: 1,
    y: 0,
  },
  [BoxType.PLAYER_TYPE]: { x: 1, y: 6 },
  [BoxType.PLAYER_NFT_GALLERY]: { x: 0, y: 7 },
  [BoxType.PLAYER_DAO_MEMBERSHIPS]: { x: 0, y: 16 },
};
const DEFAULT_BOX_POSITIONS_SM: {
  [boxType: string]: { x: number; y: number };
} = {
  [BoxType.PLAYER_HERO]: { x: 0, y: 0 },
  [BoxType.PLAYER_SKILLS]: { x: 0, y: 15 },
  [BoxType.PLAYER_COLOR_DISPOSITION]: {
    x: 0,
    y: 10,
  },
  [BoxType.PLAYER_TYPE]: { x: 0, y: 19 },
  [BoxType.PLAYER_NFT_GALLERY]: { x: 0, y: 7 },
  [BoxType.PLAYER_DAO_MEMBERSHIPS]: { x: 0, y: 16 },
};

export const DEFAULT_PLAYER_LAYOUTS: Layouts = {
  lg: DEFAULT_BOXES.map((boxType) => ({
    ...getBoxLayoutItemDefaults(boxType),
    ...DEFAULT_BOX_POSITIONS_LG[boxType],
  })),
  md: DEFAULT_BOXES.map((boxType) => ({
    ...getBoxLayoutItemDefaults(boxType),
    ...DEFAULT_BOX_POSITIONS_MD[boxType],
  })),
  sm: DEFAULT_BOXES.map((boxType) => ({
    ...getBoxLayoutItemDefaults(boxType),
    ...DEFAULT_BOX_POSITIONS_SM[boxType],
  })),
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
