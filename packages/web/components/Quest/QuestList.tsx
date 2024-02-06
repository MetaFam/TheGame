import { Box, SimpleGrid, Text } from '@metafam/ds';
import { QuestTile } from 'components/Quest/QuestTile';
import { QuestFragment } from 'graphql/autogen/types';


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
        templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
        gap={{ base: 4, lg: 6, xl: 8 }}
        pb={24}
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
