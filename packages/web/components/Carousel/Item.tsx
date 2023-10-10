import { Flex } from '@metafam/ds';
import type { PropsWithChildren } from 'react';
import React, { KeyboardEventHandler, useState } from 'react';

import { useCarouselContext } from './CarouselContext';

type ItemProps = PropsWithChildren<{ index: number }>;

export const Item: React.FC<ItemProps> = ({ children, index }) => {
  const {
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
    shrinkItems,
  } = useCarouselContext();
  const [userDidTab, setUserDidTab] = useState(false);
  // console.log("ItemProps", { index, activeItem, constraint, itemWidth, positions, gap, shrinkItems });

  const handleFocus = () => setTrackIsActive(true);

  const handleBlur = () => {
    if (userDidTab && index + 1 === positions.length) {
      setTrackIsActive(false);
    }
    setUserDidTab(false);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) =>
    event.key === 'Tab' &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) =>
    event.key === 'Tab' && setUserDidTab(true);

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      w={shrinkItems ? '100%' : `${itemWidth}px`}
      flex={shrinkItems ? { base: '0 0', xl: '0 0 344px' } : 'inherit'}
      maxW={shrinkItems ? '344px' : 'inherit'}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};
