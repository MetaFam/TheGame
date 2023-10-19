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
    defaultCarousel,
  } = useCarouselContext();
  const [userDidTab, setUserDidTab] = useState(false);

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
      w={!defaultCarousel ? '100%' : `${itemWidth}px`}
      flex={
        !defaultCarousel
          ? { base: '0 0', xl: '0 0 16.875rem', '2xl': '0 0 21.5rem' }
          : 'inherit'
      }
      maxW={
        !defaultCarousel ? { base: '16.875rem', '2xl': '21.5rem' } : 'inherit'
      }
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};
