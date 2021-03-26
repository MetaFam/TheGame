import { Box, SimpleGrid, Text } from '@metafam/ds';
import { QuestTile } from 'components/Quest/QuestTile';
import { QuestFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  quests: QuestFragmentFragment[];
};

/* TODO
- infinite scroll
 */
export const QuestList: React.FC<Props> = ({ quests }) => (
  <Box>
    {quests.length > 0 ?
      <SimpleGrid
        columns={[1, null, 2, 3]}
        spacing="8"
        autoRows="minmax(30rem, auto)"
      >
        {quests.map((q) => (
          <QuestTile key={q.id} quest={q} />
        ))}
      </SimpleGrid>
      :
      <Text>No quests found</Text>
    }
  </Box>
);
