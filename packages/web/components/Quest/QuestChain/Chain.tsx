import { Accordion } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { QuestTile } from 'components/Quest/QuestChain/QuestTile';
import { UserStatusType } from 'components/Quest/UploadProofButton';
import React from 'react';
import {
  getItemsPos,
  ScrollMenu,
  VisibilityContext,
} from 'react-horizontal-scrolling-menu';

// import { RightArrow } from './arrows';
import useDrag from './useDrag';

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type PlayerStatsProps = {
  questChain: graphql.QuestChainInfoFragment;
  userStatus: UserStatusType;
  refresh: () => void;
};

export const Chain: React.FC<PlayerStatsProps> = ({
  questChain,
  userStatus,
  refresh,
}) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }: ScrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          // eslint-disable-next-line no-param-reassign
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState<string>('');
  const handleItemClick =
    (itemId: string) =>
    ({ getItemById, scrollToItem }: ScrollVisibilityApiType) => {
      if (dragging) {
        return;
      }
      setSelected(selected !== itemId ? itemId : '');
      // NOTE: for center items
      scrollToItem(getItemById(itemId), 'smooth', 'center', 'nearest');
    };

  return (
    <Accordion allowToggle onMouseLeave={dragStop} justifyContent="center">
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={({
            getItemById,
            scrollToItem,
            visibleItems,
          }: ScrollVisibilityApiType) =>
          () => {
            // NOTE: for center items
            dragStop();
            const { center } = getItemsPos(visibleItems);
            scrollToItem(getItemById(center), 'smooth', 'center');
          }}
        options={{ throttle: 0 }} // NOTE: for center items
        onMouseMove={handleDrag}
      >
        {questChain.quests.map(({ name, description, questId }, index) => (
          <QuestTile
            key={questId}
            number={index + 1}
            name={String(name)}
            description={description ?? ''}
            onClick={handleItemClick(questId)}
            bgColor={
              // eslint-disable-next-line no-nested-ternary
              userStatus[questId]?.status === 'pass'
                ? 'main.300'
                : userStatus[questId]?.status === 'review'
                ? '#EFFF8F30'
                : 'whiteAlpha.100'
            }
            questId={questId}
            questChain={questChain}
            userStatus={userStatus}
            refresh={refresh}
          />
        ))}
      </ScrollMenu>
    </Accordion>
  );
};
