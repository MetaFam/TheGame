import { Text, Heading, VStack } from '@metafam/ds';
import { QuestTile } from 'components/Quest/QuestTile';
import { QuestFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  quests: QuestFragmentFragment[];
};

export const QuestList: React.FC<Props> = ({ quests }) => (
  <VStack spacing="8">
    <Heading>
      Quest list
    </Heading>
    <Text>{quests.length} quests</Text>
    {quests.length > 0 ?
      quests.map((q) => (
        <QuestTile key={q.id} quest={q} />
      ))
      :
      <Text>No quests found</Text>
    }
  </VStack>
);
