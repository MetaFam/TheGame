import {
  getBoxLayoutItemDefaults,
  GRID_ROW_HEIGHT,
  LayoutItem,
  ProfileLayoutData,
} from 'components/Player/Section/config';
import { Layout, Layouts } from 'react-grid-layout';
import {
  BoxMetadata,
  BoxType,
  getBoxKey,
  getBoxTypeFromKey,
} from 'utils/boxTypes';

export const makeLayouts = (canEdit: boolean, layouts: Layouts): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) =>
        item.i === 'hero' ? { ...item, isResizable: canEdit } : item,
      ),
    ]),
  );

export const onRemoveBoxFromLayouts = (
  boxKey: string,
  layouts: Layouts,
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.filter((item) => item.i !== boxKey),
    ]),
  );

export const addBoxToLayouts = (
  boxType: BoxType,
  boxMetadata: BoxMetadata,
  layouts: Layouts,
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => {
      const heroItem = items.find(
        (item) => item.i === getBoxKey(BoxType.PLAYER_HERO, {}),
      );
      return [
        key,
        [
          ...items,
          {
            ...getBoxLayoutItemDefaults(boxType),
            x: 0,
            y: heroItem ? heroItem.y + heroItem.h : 0,
            i: getBoxKey(boxType, boxMetadata),
          },
        ],
      ];
    }),
  );

const HEIGHT_MODIFIER = 0.57; // not sure why 0.57 but for some reason it works!

export const updateHeightsInLayouts = (
  layouts: Layouts,
  heights: { [boxKey: string]: number },
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) => {
        const itemHeight =
          (HEIGHT_MODIFIER * (heights[item.i] || 0)) / GRID_ROW_HEIGHT;
        const boxType = getBoxTypeFromKey(item.i);
        return boxType === BoxType.PLAYER_ADD_BOX
          ? item
          : {
              ...item,
              h: itemHeight >= 1 ? itemHeight : 1,
            };
      }),
    ]),
  );

export const disableAddBoxInLayoutData = ({
  layouts,
  layoutItems,
}: ProfileLayoutData): ProfileLayoutData => ({
  layouts: onRemoveBoxFromLayouts(
    getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
    layouts,
  ),
  layoutItems: layoutItems.filter(
    (item) => item.boxType !== BoxType.PLAYER_ADD_BOX,
  ),
});

export const enableAddBoxInLayoutData = ({
  layouts,
  layoutItems,
}: ProfileLayoutData): ProfileLayoutData => ({
  layouts: addBoxToLayouts(BoxType.PLAYER_ADD_BOX, {}, layouts),
  layoutItems: [
    ...layoutItems,
    {
      boxType: BoxType.PLAYER_ADD_BOX,
      boxMetadata: {},
      boxKey: getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
    },
  ],
});

const layoutItemSorter = (i: LayoutItem, j: LayoutItem) =>
  i.boxKey > j.boxKey ? 1 : -1;

const layoutSorter = (i: Layout, j: Layout) => {
  if (i.x > j.x) {
    return 1;
  }
  if (i.x === j.x) {
    if (i.y > j.y) {
      return 1;
    }
    if (i.y === j.y) {
      return 0;
    }
    return -1;
  }
  return -1;
};

export const isSameLayouts = (
  inputA: ProfileLayoutData,
  inputB: ProfileLayoutData,
) => {
  const a = disableAddBoxInLayoutData(inputA);
  const b = disableAddBoxInLayoutData(inputB);
  const itemsA = a.layoutItems.sort(layoutItemSorter);
  const itemsB = b.layoutItems.sort(layoutItemSorter);
  const isSameItems = itemsA.reduce(
    (t, item, i) => t && item.boxKey === itemsB[i].boxKey,
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
