import {
  getBoxLayoutItemDefaults,
  GRID_ROW_HEIGHT,
  HEIGHT_MODIFIER,
  LayoutItem,
  ProfileLayoutData,
} from 'components/Player/Section/config';
import { Layout, Layouts } from 'react-grid-layout';
import {
  BoxMetadata,
  BoxType,
  BoxTypes,
  createBoxKey,
  getBoxType,
} from 'utils/boxTypes';

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
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) => {
        const itemHeight =
          (heights[item.i] ?? 0) / (GRID_ROW_HEIGHT * HEIGHT_MODIFIER);
        const type = getBoxType(item.i);
        return type === BoxTypes.PLAYER_ADD_BOX
          ? item
          : {
              ...item,
              h: Math.max(itemHeight, 1),
            };
      }),
    ]),
  );

export const disableAddBox = ({
  layouts,
  layoutItems,
}: ProfileLayoutData): ProfileLayoutData => ({
  layouts: removeBoxFromLayouts(layouts, createBoxKey(BoxTypes.PLAYER_ADD_BOX)),
  layoutItems: layoutItems.filter(
    (item) => item.type !== BoxTypes.PLAYER_ADD_BOX,
  ),
});

export const enableAddBox = ({
  layouts,
  layoutItems,
}: ProfileLayoutData): ProfileLayoutData => ({
  layouts: addBoxToLayouts(
    layouts,
    BoxTypes.PLAYER_ADD_BOX,
    {},
    { x: 1, y: -1 },
  ),
  layoutItems: [
    ...layoutItems,
    {
      type: BoxTypes.PLAYER_ADD_BOX,
      key: createBoxKey(BoxTypes.PLAYER_ADD_BOX),
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

export const isSameLayouts = (
  inputA: ProfileLayoutData,
  inputB: ProfileLayoutData,
) => {
  const a = disableAddBox(inputA);
  const b = disableAddBox(inputB);
  const itemsA = a.layoutItems.sort(layoutItemSorter);
  const itemsB = b.layoutItems.sort(layoutItemSorter);
  const isSameItems = itemsA.reduce(
    (t, item, i) => t && item.key === itemsB[i].key,
    true,
  );
  if (isSameItems) {
    return ['sm', 'md', 'lg']
      .map((key) => {
        const layoutA = a.layouts[key].sort(layoutSorter);
        const layoutB = b.layouts[key].sort(layoutSorter);
        return layoutA.reduce(
          (t, item, i) =>
            t && item.x === layoutB[i].x && item.i === layoutB[i].i,
          true,
        );
      })
      .reduce((t, item) => t && item, true);
  }
  return false;
};
