import { Layout, Layouts } from 'react-grid-layout';
import { BoxMetadata, BoxType, BoxTypes, createBoxKey } from 'utils/boxTypes';

export type LayoutItem = {
  key: string;
  type: BoxType;
  metadata?: BoxMetadata;
};

export type ProfileLayoutData = {
  layoutItems: Array<LayoutItem>;
  layouts: Layouts;
};

export const GRID_ROW_HEIGHT = 32;
export const HEIGHT_MODIFIER = 1.8;

export const ALL_BOXES = [
  BoxTypes.PLAYER_HERO,
  BoxTypes.PLAYER_SKILLS,
  BoxTypes.PLAYER_COLOR_DISPOSITION,
  BoxTypes.PLAYER_TYPE,
  BoxTypes.PLAYER_NFT_GALLERY,
  BoxTypes.PLAYER_DAO_MEMBERSHIPS,
  BoxTypes.PLAYER_ROLES,
  BoxTypes.EMBEDDED_URL,
  BoxTypes.PLAYER_COMPLETED_QUESTS,
  // BoxTypes.PLAYER_ACHIEVEMENTS,
  // TODO: Add more types of sections
];

export const MULTIPLE_ALLOWED_BOXES = [BoxTypes.EMBEDDED_URL] as Array<BoxType>;

export type LayoutMetadata = {
  [key: string]: {
    type: BoxType;
    metadata: BoxMetadata;
  };
};

export const getBoxLayoutItemDefaults = (type: BoxType): Layout => {
  const heights = {
    [BoxTypes.PLAYER_HERO]: 22,
    [BoxTypes.PLAYER_SKILLS]: 7,
    [BoxTypes.PLAYER_NFT_GALLERY]: 14,
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: 9,
    [BoxTypes.PLAYER_ACHIEVEMENTS]: 4,
    [BoxTypes.PLAYER_TYPE]: 7,
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: 5.5,
    [BoxTypes.PLAYER_ROLES]: 3,
    [BoxTypes.PLAYER_ADD_BOX]: 3,
    [BoxTypes.EMBEDDED_URL]: 6,
  } as Record<BoxType, number>;

  const ret: Layout = {
    i: createBoxKey(type),
    x: 0,
    y: 0,
    w: 1,
    h: heights[type],
    maxW: 1,
  };

  switch (type) {
    case BoxTypes.PLAYER_ADD_BOX: {
      ret.isResizable = false;
      ret.isDraggable = false;
      break;
    }
    case BoxTypes.EMBEDDED_URL: {
      ret.i = createBoxKey(type, {
        url: 'https://github.com/MetaFam/TheGame', // TODO: remove tempUrl
      });
      ret.isResizable = false;
      break;
    }
    default:
  }

  return ret;
};

export const DEFAULT_BOXES = [
  BoxTypes.PLAYER_HERO,
  BoxTypes.PLAYER_SKILLS,
  BoxTypes.PLAYER_NFT_GALLERY,
  BoxTypes.PLAYER_DAO_MEMBERSHIPS,
  BoxTypes.PLAYER_COLOR_DISPOSITION,
  // Adding default boxes MUST be accompanied by adding default box positions as well
];

export type ChakraSize = 'sm' | 'md' | 'lg';
export type Coordinates = {
  x: number;
  y: number;
};
export type Positions = Record<BoxType, Coordinates>;

const DEFAULT_BOX_POSITIONS: Record<ChakraSize, Positions> = {
  lg: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 1, y: 0 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 2, y: 1 },
    [BoxTypes.PLAYER_SKILLS]: { x: 1, y: 2 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 2, y: 0 },
  } as Positions,
  md: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 1, y: 0 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 1, y: 3 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 1, y: 2 },
    [BoxTypes.PLAYER_SKILLS]: { x: 1, y: 1 },
  } as Positions,
  sm: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 0, y: 3 },
    [BoxTypes.PLAYER_SKILLS]: { x: 0, y: 2 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 0, y: 4 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 0, y: 1 },
  } as Positions,
};

const DEFAULT_PLAYER_LAYOUTS: Layouts = Object.fromEntries(
  ['sm', 'md', 'lg'].map((size) => [
    size,
    DEFAULT_BOXES.map((boxType) => ({
      ...getBoxLayoutItemDefaults(boxType),
      ...DEFAULT_BOX_POSITIONS[size as ChakraSize][boxType],
    })),
  ]),
);

const DEFAULT_LAYOUT_ITEMS = DEFAULT_BOXES.map((type: BoxType) => ({
  type,
  key: createBoxKey(type),
}));

export const DEFAULT_PLAYER_LAYOUT_DATA = {
  layouts: DEFAULT_PLAYER_LAYOUTS,
  layoutItems: DEFAULT_LAYOUT_ITEMS,
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
  },
  '.react-resizable-handle::after': {
    border: 'none',
  },
};
