import { Box } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { Carousel } from 'components/Carousel';
import { UserStatusType } from 'lib/hooks/questChains';

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
      <Carousel gap={32}>
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
