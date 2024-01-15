import { Layout, Layouts } from 'react-grid-layout';
import {
  BoxMetadata,
  BoxType,
  BoxTypes,
  createBoxKey,
  getBoxType,
  LayoutData,
  LayoutItem,
} from 'utils/boxTypes';

export const GRID_ROW_HEIGHT = 32;
export const HEIGHT_MODIFIER = 1.8;
export const MULTIPLE_ALLOWED_BOXES = [
  BoxTypes.EMBEDDED_URL,
  BoxTypes.CUSTOM_TEXT,
] as Array<BoxType>;

export const removeBoxFromLayouts = (
  layouts: Layouts,
  boxKey: string,
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.filter((item) => item.i !== boxKey),
    ]),
  );

export const addBoxToLayouts = (
  layouts: Layouts,
  type: BoxType,
  metadata: BoxMetadata = {},
  opts: Partial<Layout> = {},
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => {
      const heroItem = items.find(
        (item) => item.i === createBoxKey(BoxTypes.PLAYER_HERO),
      );
      return [
        key,
        [
          ...items,
          {
            ...getBoxLayoutItemDefaults(type),
            x: 0,
            y: heroItem ? heroItem.y + heroItem.h : 0,
            i: createBoxKey(type, metadata),
            ...opts,
          },
        ],
      ];
    }),
  );

export const updatedLayouts = (
  layouts: Layouts,
  heights: Record<string, number>,
  editing: boolean,
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) => {
        const itemHeight =
          (heights[item.i] ?? 0) / (GRID_ROW_HEIGHT * HEIGHT_MODIFIER);
        const type = getBoxType(item.i);
        return {
          ...item,
          h:
            !isBoxResizable(type) && !isBoxFixedHeight(type)
              ? Math.max(itemHeight, 1)
              : item.h,
          isResizable: editing && isBoxResizable(type),
          isDraggable: editing && isBoxDraggable(type),
        };
      }),
    ]),
  );

export const disableAddBox = ({
  layouts,
  layoutItems,
}: LayoutData): LayoutData => ({
  layouts: removeBoxFromLayouts(layouts, createBoxKey(BoxTypes.ADD_NEW_BOX)),
  layoutItems: layoutItems.filter((item) => item.type !== BoxTypes.ADD_NEW_BOX),
});

export const enableAddBox = ({
  layouts,
  layoutItems,
}: LayoutData): LayoutData => ({
  layouts: addBoxToLayouts(layouts, BoxTypes.ADD_NEW_BOX, {}, { x: 1, y: -1 }),
  layoutItems: [
    ...layoutItems,
    {
      type: BoxTypes.ADD_NEW_BOX,
      key: createBoxKey(BoxTypes.ADD_NEW_BOX),
    },
  ],
});

const layoutItemSorter = (i: LayoutItem, j: LayoutItem) =>
  i.key.localeCompare(j.key);

const layoutSorter = (i: Layout, j: Layout) => {
  let diff = i.x - j.x;
  if (diff === 0) {
    diff = i.y - j.y;
  }
  return diff;
};

export const isSameLayouts = (inputA: LayoutData, inputB: LayoutData) => {
  const a = disableAddBox(inputA);
  const b = disableAddBox(inputB);
  const itemsA = a.layoutItems.sort(layoutItemSorter);
  const itemsB = b.layoutItems.sort(layoutItemSorter);
  const isSameItems = itemsA.reduce(
    (t, item, i) =>
      t && !!item?.key && !!itemsB[i]?.key && item.key === itemsB[i].key,
    true,
  );
  if (isSameItems) {
    return ['sm', 'md', 'lg']
      .map((key) => {
        const layoutA = a.layouts[key].sort(layoutSorter);
        const layoutB = b.layouts[key].sort(layoutSorter);
        return layoutA.reduce(
          (t, item, i) =>
            t &&
            item.x === layoutB[i].x &&
            item.i === layoutB[i].i &&
            (!isBoxResizable(getBoxType(item.i)) || item.h === layoutB[i].h),
          true,
        );
      })
      .reduce((t, item) => t && item, true);
  }
  return false;
};

export const isBoxResizable = (type: BoxType): boolean => {
  switch (type) {
    case BoxTypes.DASHBOARD_LASTEST_CONTENT:
    case BoxTypes.DASHBOARD_CALENDER:
    case BoxTypes.DASHBOARD_COMPLETED_QUESTS:
    case BoxTypes.DASHBOARD_PINNED_QUEST_CHAINS:
    case BoxTypes.DASHBOARD_CREATED_QUESTS:
      return true;
    default:
      return false;
  }
};

export const isBoxFixedHeight = (type: BoxType): boolean => {
  switch (type) {
    case BoxTypes.ADD_NEW_BOX:
      return true;
    default:
      return false;
  }
};

export const isBoxDraggable = (type: BoxType): boolean => {
  switch (type) {
    case BoxTypes.ADD_NEW_BOX:
      return false;
    default:
      return true;
  }
};

const DEFAULT_BOX_HEIGHTS: Partial<Record<BoxType, number>> = {
  // player profile boxes
  [BoxTypes.PLAYER_HERO]: 22,
  [BoxTypes.PLAYER_SKILLS]: 7,
  [BoxTypes.PLAYER_NFT_GALLERY]: 14,
  [BoxTypes.PLAYER_DAO_MEMBERSHIPS]: 9,
  [BoxTypes.PLAYER_ACHIEVEMENTS]: 4,
  [BoxTypes.PLAYER_TYPE]: 7,
  [BoxTypes.PLAYER_COLOR_DISPOSITION]: 5.5,
  [BoxTypes.PLAYER_ROLES]: 3,
  // dashboard boxes
  [BoxTypes.DASHBOARD_LASTEST_CONTENT]: 12,
  [BoxTypes.DASHBOARD_XP_INFO]: 6,
  [BoxTypes.DASHBOARD_SEEDS_INFO]: 4,
  [BoxTypes.DASHBOARD_CALENDER]: 10,
  [BoxTypes.DASHBOARD_LEADERBOARD]: 15,
  [BoxTypes.DASHBOARD_COMPLETED_QUESTS]: 6,
  [BoxTypes.DASHBOARD_PINNED_QUEST_CHAINS]: 2,
  [BoxTypes.DASHBOARD_CREATED_QUESTS]: 6,
  // common boxes
  [BoxTypes.ADD_NEW_BOX]: 3,
  [BoxTypes.EMBEDDED_URL]: 7,
  [BoxTypes.CUSTOM_TEXT]: 7,
};

export const getBoxLayoutItemDefaults = (type: BoxType): Layout => ({
  i: createBoxKey(type, undefined),
  x: 0,
  y: 0,
  w: 1,
  h: DEFAULT_BOX_HEIGHTS[type] ?? 3,
  maxW: 1,
  isResizable: isBoxResizable(type),
  isDraggable: isBoxDraggable(type),
});
