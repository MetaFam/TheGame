import { Box, useBreakpointValue } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { Carousel } from 'components/Carousel';
import { UserStatusType } from 'lib/hooks/questChains';
import React from 'react';

import { QuestTile } from './QuestTile';

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
  const quests = questChain.quests.filter((q) => !q.paused);

  const gap = useBreakpointValue({ base: 8, md: 16, lg: 32 }) || 8;

  return (
    <Box
      w={{
        base: '90%',
        md: '80%',
        lg: '90%',
        xl: '80%',
      }}
      overflow="visible"
      pb="10rem"
      alignSelf="flex-start"
    >
      <Carousel gap={gap}>
        {quests.map(({ name, description, questId }, index) => (
          <QuestTile
            key={questId + index}
            index={index}
            name={name ?? ''}
            description={description ?? ''}
            questId={questId}
            questChain={questChain}
            questStatus={userStatus[questId]?.status ?? null}
            refresh={refresh}
          />
        ))}
      </Carousel>
    </Box>
  );
};
