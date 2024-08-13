import { Layouts } from 'react-grid-layout';

import {
  BoxType,
  BoxTypes,
  ChakraSize,
  createBoxKey,
  Positions,
} from '#utils/boxTypes';
import { getBoxLayoutItemDefaults } from '#utils/layoutHelpers';

export const ALL_BOXES = [
  BoxTypes.PLAYER_HERO,
  BoxTypes.PLAYER_SKILLS,
  BoxTypes.PLAYER_COLOR_DISPOSITION,
  BoxTypes.PLAYER_TYPE,
  BoxTypes.PLAYER_NFT_GALLERY,
  BoxTypes.PLAYER_DAO_MEMBERSHIPS,
  BoxTypes.PLAYER_ROLES,
  BoxTypes.EMBEDDED_URL,
  BoxTypes.PLAYER_LINKS,
  BoxTypes.PLAYER_COMPLETED_QUESTS,
  BoxTypes.CUSTOM_TEXT,
  BoxTypes.DEWORK,
  BoxTypes.PLAYER_ATTESTATIONS,
  // BoxTypes.PLAYER_ACHIEVEMENTS,
  // TODO: Add more types of sections
];

export const DEFAULT_BOXES = [
  BoxTypes.PLAYER_HERO,
  BoxTypes.PLAYER_SKILLS,
  BoxTypes.PLAYER_NFT_GALLERY,
  BoxTypes.PLAYER_DAO_MEMBERSHIPS,
  BoxTypes.PLAYER_COLOR_DISPOSITION,
  BoxTypes.PLAYER_ATTESTATIONS,
  // Adding default boxes MUST be accompanied by adding default box positions as well
];

const DEFAULT_BOX_POSITIONS: Record<ChakraSize, Positions> = {
  lg: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 0, y: 2 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 1, y: 0 },
    [BoxTypes.PLAYER_SKILLS]: { x: 1, y: 2 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 2, y: 0 },
    [BoxTypes.PLAYER_ATTESTATIONS]: { x: 2, y: 2 },
  },
  md: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 0, y: 2 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 1, y: 0 },
    [BoxTypes.PLAYER_SKILLS]: { x: 1, y: 2 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 1, y: 4 },
    [BoxTypes.PLAYER_ATTESTATIONS]: { x: 1, y: 6 },
  },
  sm: {
    [BoxTypes.PLAYER_HERO]: { x: 0, y: 0 },
    [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: { x: 0, y: 2 },
    [BoxTypes.PLAYER_COLOR_DISPOSITION]: { x: 0, y: 4 },
    [BoxTypes.PLAYER_SKILLS]: { x: 0, y: 6 },
    [BoxTypes.PLAYER_NFT_GALLERY]: { x: 0, y: 8 },
    [BoxTypes.PLAYER_ATTESTATIONS]: { x: 0, y: 10 },
  },
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
