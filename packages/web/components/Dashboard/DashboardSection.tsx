import { Flex, IconButton } from '@metafam/ds';
import { Calendar } from 'components/Dashboard/Calendar';
import { LatestContent } from 'components/Dashboard/LatestContent';
import { Leaderboard } from 'components/Dashboard/Leaderboard';
import { Seed } from 'components/Dashboard/Seed';
// import { XP } from 'components/Dashboard/XP';
import { CustomTextSection } from 'components/Section/CustomTextSection';
import { EmbeddedUrl } from 'components/Section/EmbeddedUrlSection';
import { Player } from 'graphql/autogen/types';
import React, { forwardRef, LegacyRef, ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, BoxTypes, createBoxKey } from 'utils/boxTypes';
import { isBoxResizable } from 'utils/layoutHelpers';

import { QuestChainsPinned } from './QuestChainsPinned';
import { DashboardQuestsCompleted } from './QuestsCompleted';
import { DashboardQuestsCreated } from './QuestsCreated';

type Props = {
  type: BoxType;
  player?: Player;
  metadata?: BoxMetadata;
  editing?: boolean;
  onRemoveBox?: (boxKey: string) => void;
};

const DashboardSectionInner: React.FC<Props> = ({
  metadata,
  type,
  editing,
}) => {
  switch (type) {
    case BoxTypes.DASHBOARD_LASTEST_CONTENT:
      return <LatestContent />;
    // case BoxTypes.DASHBOARD_XP_INFO:
    //   return <XP />;
    case BoxTypes.DASHBOARD_SEEDS_INFO:
      return <Seed />;
    case BoxTypes.DASHBOARD_CALENDER:
      return <Calendar />;
    case BoxTypes.DASHBOARD_LEADERBOARD:
      return <Leaderboard />;
    case BoxTypes.DASHBOARD_COMPLETED_QUESTS:
      return <DashboardQuestsCompleted />;
    case BoxTypes.DASHBOARD_PINNED_QUEST_CHAINS:
      return <QuestChainsPinned />;
    case BoxTypes.DASHBOARD_CREATED_QUESTS:
      return <DashboardQuestsCreated />;
    case BoxTypes.EMBEDDED_URL: {
      const { url } = metadata ?? {};
      return url ? <EmbeddedUrl {...{ url, editing }} /> : null;
    }
    case BoxTypes.CUSTOM_TEXT: {
      const { title, content } = metadata ?? {};
      return title && content ? (
        <CustomTextSection {...{ title, content }} />
      ) : null;
    }
    default:
      return null;
  }
};

export const DashboardSection = forwardRef<ReactElement, Props>(
  ({ metadata, type, player, editing = false, onRemoveBox }, ref) => {
    const key = createBoxKey(type, metadata);

    return (
      <Flex
        ref={ref as LegacyRef<HTMLDivElement>}
        w="100%"
        direction="column"
        h="auto"
        minH="100%"
        boxShadow="md"
        pos="relative"
      >
        <Flex
          display={isBoxResizable(type) ? 'flex' : 'block'}
          minH={isBoxResizable(type) ? '100%' : undefined}
          overflow={isBoxResizable(type) ? 'hidden' : undefined}
          w="100%"
          direction="column"
          pointerEvents={editing ? 'none' : 'initial'}
        >
          <DashboardSectionInner
            {...{
              metadata,
              type,
              player,
              editing,
            }}
          />
        </Flex>
        {editing && (
          <Flex
            className="gridItemOverlay"
            w="100%"
            h="100%"
            bg="purpleTag50"
            pos="absolute"
            top={0}
            left={0}
          />
        )}
        {editing && type && (
          <IconButton
            aria-label="Remove Dashboard Section"
            size="lg"
            pos="absolute"
            top={0}
            right={0}
            bg="transparent"
            color="pinkShadeOne"
            icon={<FaTimes />}
            _hover={{ color: 'white' }}
            onClick={() => onRemoveBox?.(key)}
            onTouchStart={() => onRemoveBox?.(key)}
            _focus={{
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            _active={{
              transform: 'scale(0.8)',
              backgroundColor: 'transparent',
            }}
            isRound
          />
        )}
      </Flex>
    );
  },
);
