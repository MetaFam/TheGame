import { Box, SimpleGrid, Text } from '@metafam/ds';

import { QuestTile } from '#components/Quest/QuestTile';
import { QuestFragment } from '#graphql/autogen/hasura-sdk';

type Props = {
  quests: QuestFragment[];
};

/* TODO
- infinite scroll
 */
export const QuestList: React.FC<Props> = ({ quests }) => (
  <Box>
    {quests.length > 0 ? (
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
        spacing={{ base: 4, md: 6, lg: 8 }}
        pb={24}
        w="full"
      >
        {quests.map((q) => (
          <QuestTile key={q.id} quest={q} />
        ))}
      </SimpleGrid>
    ) : (
      <Text>No quests found</Text>
    )}
  </Box>
);
