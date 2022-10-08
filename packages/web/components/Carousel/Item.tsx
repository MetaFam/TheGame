import { Flex } from '@metafam/ds';
import React, { KeyboardEventHandler, useState } from 'react';

import { useCarouselContext } from './CarouselContext';

export const Item: React.FC<{ index: number }> = ({ children, index }) => {
  const {
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
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
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};
