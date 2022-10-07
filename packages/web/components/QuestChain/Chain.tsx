import { Box } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { UserStatusType } from 'lib/hooks/questChains';
import { useDrag } from 'lib/hooks/useDrag';
import { ContextType, MouseEvent, useCallback, useState } from 'react';
import {
  getItemsPos,
  ScrollMenu,
  VisibilityContext,
} from 'react-horizontal-scrolling-menu';

import { QuestTile } from './QuestTile';

type ScrollVisibilityApiType = ContextType<typeof VisibilityContext>;

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
    (ev: MouseEvent) =>
      dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          // eslint-disable-next-line no-param-reassign
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<string>('');
  const handleItemClick = useCallback(
    (itemId: string) =>
      ({ getItemById, scrollToItem }: ScrollVisibilityApiType) => {
        if (dragging) {
          return;
        }
        setSelected(itemId);
        // NOTE: for center items
        scrollToItem(getItemById(itemId), 'smooth', 'center', 'nearest');
      },
    [dragging],
  );

  const quests = questChain.quests.filter((q) => !q.paused);

  return (
    <Box w="100%" maxW="96rem" overflow="visible" pb="10rem">
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
        {quests.map(({ name, description, questId }, index) => (
          <QuestTile
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            itemId={questId}
            key={questId + index}
            number={index + 1}
            name={name ?? ''}
            description={description ?? ''}
            onClick={handleItemClick(questId)}
            isSelected={selected === questId}
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
            questStatus={userStatus[questId]?.status ?? null}
            refresh={refresh}
            isLast={index === quests.length - 1}
          />
        ))}
      </ScrollMenu>
    </Box>
  );
};
