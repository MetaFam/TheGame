import React from 'react';
import {
  getItemsPos,
  slidingWindow,
  VisibilityContext,
} from 'react-horizontal-scrolling-menu';

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
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
}

export function RightArrow() {
  const {
    getItemById,
    isLastItemVisible,
    items,
    scrollToItem,
    visibleItems,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible,
  );
  React.useEffect(() => {
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
}
