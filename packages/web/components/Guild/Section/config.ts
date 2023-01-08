import { Layouts } from 'react-grid-layout';
import {
  BoxType,
  BoxTypes,
  ChakraSize,
  createBoxKey,
  Positions,
} from 'utils/boxTypes';
import { getBoxLayoutItemDefaults } from 'utils/layoutHelpers';

export const ALL_BOXES = [
  BoxTypes.GUILD_HERO,
  BoxTypes.GUILD_LINKS,
  BoxTypes.GUILD_ANNOUNCEMENTS,
  BoxTypes.GUILD_PLAYERS,
  BoxTypes.EMBEDDED_URL,
  // BoxTypes.GUILD_SKILLS,
  // TODO: Add more types of sections
];

export const DEFAULT_BOXES = [
  BoxTypes.GUILD_HERO,
  BoxTypes.GUILD_LINKS,
  BoxTypes.GUILD_ANNOUNCEMENTS,
  BoxTypes.GUILD_PLAYERS,
  // Adding default boxes MUST be accompanied by adding default box positions as well
];

const DEFAULT_BOX_POSITIONS: Record<ChakraSize, Positions> = {
  lg: {
    [BoxTypes.GUILD_HERO]: { x: 0, y: 0 },
    [BoxTypes.GUILD_PLAYERS]: { x: 1, y: 0 },
    [BoxTypes.GUILD_ANNOUNCEMENTS]: { x: 2, y: 0 },
    [BoxTypes.GUILD_LINKS]: { x: 1, y: 2 },
  },
  md: {
    [BoxTypes.GUILD_HERO]: { x: 0, y: 0 },
    [BoxTypes.GUILD_PLAYERS]: { x: 1, y: 0 },
    [BoxTypes.GUILD_ANNOUNCEMENTS]: { x: 0, y: 2 },
    [BoxTypes.GUILD_LINKS]: { x: 1, y: 2 },
  },
  sm: {
    [BoxTypes.GUILD_HERO]: { x: 0, y: 0 },
    [BoxTypes.GUILD_PLAYERS]: { x: 0, y: 2 },
    [BoxTypes.GUILD_ANNOUNCEMENTS]: { x: 0, y: 4 },
    [BoxTypes.GUILD_LINKS]: { x: 0, y: 6 },
  },
};

const DEFAULT_GUILD_LAYOUTS: Layouts = Object.fromEntries(
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

export const DEFAULT_GUILD_LAYOUT_DATA = {
  layouts: DEFAULT_GUILD_LAYOUTS,
  layoutItems: DEFAULT_LAYOUT_ITEMS,
};
