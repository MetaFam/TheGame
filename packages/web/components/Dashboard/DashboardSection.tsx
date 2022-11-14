import { Flex, IconButton, Text } from '@metafam/ds';
import { Calendar } from 'components/Dashboard/Calendar';
import { LatestContent } from 'components/Dashboard/LatestContent';
import { Leaderboard } from 'components/Dashboard/Leaderboard';
import { Seed } from 'components/Dashboard/Seed';
import { XP } from 'components/Dashboard/XP';
import { EmbeddedUrl } from 'components/Section/EmbeddedUrlSection';
import { Player } from 'graphql/autogen/types';
import React, { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, BoxTypes, createBoxKey } from 'utils/boxTypes';
import { isBoxResizable } from 'utils/layoutHelpers';

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
    case BoxTypes.DASHBOARD_XP_INFO:
      return <XP />;
    case BoxTypes.DASHBOARD_SEEDS_INFO:
      return <Seed />;
    case BoxTypes.DASHBOARD_CALENDER:
      return <Calendar />;
    case BoxTypes.DASHBOARD_LEADERBOARD:
      return <Leaderboard />;
    case BoxTypes.EMBEDDED_URL: {
      const { url } = metadata ?? {};
      return url ? <EmbeddedUrl {...{ url, editing }} /> : null;
    }
    default:
      return null;
  }
};

const getTitle = (type: BoxType, metadata?: BoxMetadata) => {
  if (metadata?.title) return metadata?.title.toString();
  switch (type) {
    case BoxTypes.DASHBOARD_LASTEST_CONTENT:
      return 'Latest Content';
    case BoxTypes.DASHBOARD_XP_INFO:
      return 'XP';
    case BoxTypes.DASHBOARD_SEEDS_INFO:
      return 'Seed';
    case BoxTypes.DASHBOARD_CALENDER:
      return 'Calendar';
    case BoxTypes.DASHBOARD_LEADERBOARD:
      return 'Leaderboard';
    default:
      return '';
  }
};

export const DashboardSection = forwardRef<HTMLDivElement, Props>(
  ({ metadata, type, player, editing = false, onRemoveBox }, ref) => {
    const key = createBoxKey(type, metadata);
    const title = getTitle(type, metadata);
    if (!player) return null;

    return (
      <Flex
        {...{ ref }}
        w="100%"
        direction="column"
        h="auto"
        minH="100%"
        boxShadow="md"
        pos="relative"
        padding={type !== BoxTypes.EMBEDDED_URL ? 6 : 0}
        paddingRight={
          type === BoxTypes.DASHBOARD_LASTEST_CONTENT ? 4 : undefined
        }
      >
        <Flex
          w="100%"
          minH="100%"
          h="auto"
          direction="column"
          overflowY={
            isBoxResizable(type) && type !== BoxTypes.EMBEDDED_URL
              ? 'auto'
              : 'hidden'
          }
          overflowX="hidden"
          pointerEvents={editing ? 'none' : 'initial'}
        >
          {title && (
            <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
              {title}
            </Text>
          )}
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
