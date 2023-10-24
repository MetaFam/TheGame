import { Layouts } from 'react-grid-layout';
import {
  BoxType,
  BoxTypes,
  ChakraSize,
  createBoxKey,
  Positions,
} from 'utils/boxTypes';
import { getBoxLayoutItemDefaults } from 'utils/layoutHelpers';

export const podcastRSSURL = 'https://anchor.fm/s/57a641c/podcast/rss';

const DEFAULT_BOX_POSITIONS: Record<ChakraSize, Positions> = {
  lg: {
    [BoxTypes.DASHBOARD_LASTEST_CONTENT]: { x: 1, y: 0 },
    [BoxTypes.DASHBOARD_XP_INFO]: { x: 2, y: 0 },
    [BoxTypes.DASHBOARD_SEEDS_INFO]: { x: 0, y: 0 },
    [BoxTypes.DASHBOARD_CALENDER]: { x: 0, y: 2 },
    [BoxTypes.DASHBOARD_LEADERBOARD]: { x: 2, y: 2 },
  },
  md: {
    [BoxTypes.DASHBOARD_LASTEST_CONTENT]: { x: 0, y: 0 },
    [BoxTypes.DASHBOARD_XP_INFO]: { x: 1, y: 2 },
    [BoxTypes.DASHBOARD_SEEDS_INFO]: { x: 1, y: 0 },
    [BoxTypes.DASHBOARD_CALENDER]: { x: 1, y: 4 },
    [BoxTypes.DASHBOARD_LEADERBOARD]: { x: 0, y: 4 },
  },
  sm: {
    [BoxTypes.DASHBOARD_LASTEST_CONTENT]: { x: 0, y: 4 },
    [BoxTypes.DASHBOARD_XP_INFO]: { x: 0, y: 0 },
    [BoxTypes.DASHBOARD_SEEDS_INFO]: { x: 0, y: 2 },
    [BoxTypes.DASHBOARD_CALENDER]: { x: 0, y: 7 },
    [BoxTypes.DASHBOARD_LEADERBOARD]: { x: 0, y: 11 },
  },
};

export const ALL_BOXES = [
  BoxTypes.DASHBOARD_LASTEST_CONTENT,
  BoxTypes.DASHBOARD_XP_INFO,
  BoxTypes.DASHBOARD_SEEDS_INFO,
  BoxTypes.DASHBOARD_CALENDER,
  BoxTypes.DASHBOARD_LEADERBOARD,
  BoxTypes.DASHBOARD_COMPLETED_QUESTS,
  BoxTypes.DASHBOARD_CREATED_QUESTS,
  BoxTypes.EMBEDDED_URL,
  BoxTypes.CUSTOM_TEXT,
  // TODO: Add more types of sections
];

export const DEFAULT_BOXES = [
  BoxTypes.DASHBOARD_LASTEST_CONTENT,
  BoxTypes.DASHBOARD_XP_INFO,
  BoxTypes.DASHBOARD_SEEDS_INFO,
  BoxTypes.DASHBOARD_CALENDER,
  BoxTypes.DASHBOARD_LEADERBOARD,
  // Adding default boxes MUST be accompanied by adding default box positions as well
];

const DEFAULT_DASHBOARD_LAYOUTS: Layouts = Object.fromEntries(
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

export const DEFAULT_DASHBOARD_LAYOUT_DATA = {
  layouts: DEFAULT_DASHBOARD_LAYOUTS,
  layoutItems: DEFAULT_LAYOUT_ITEMS,
};
