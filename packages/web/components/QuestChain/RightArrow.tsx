import { useContext, useEffect, useState } from 'react';
import {
  getItemsPos,
  slidingWindow,
  VisibilityContext,
} from 'react-horizontal-scrolling-menu';

const Arrow: React.FC<{ disabled: boolean; onClick: () => void }> = ({
  children,
  disabled,
  onClick,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    style={{
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      right: '1%',
      opacity: disabled ? '0' : '1',
      userSelect: 'none',
    }}
  >
    {children}
  </button>
);

export const RightArrow = () => {
  const {
    getItemById,
    isLastItemVisible,
    items,
    scrollToItem,
    visibleItems,
    visibleItemsWithoutSeparators,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible,
  );
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  // NOTE: for center items
  const nextGroupItems = slidingWindow(
    items.toItemsKeys(),
    visibleItems,
  ).next();
  const { center } = getItemsPos(nextGroupItems);
  const scrollNextCentered = () =>
    scrollToItem(getItemById(center), 'smooth', 'center');

  return (
    <Arrow disabled={disabled} onClick={scrollNextCentered}>
      Right
    </Arrow>
  );
};
