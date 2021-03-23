import { VStack } from '@metafam/ds';
import { QuestTile } from 'components/Quest/QuestTile';
import { QuestFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  quests: QuestFragmentFragment[];
};

export const QuestList: React.FC<Props> = ({ quests }) => (
  <VStack spacing="8">
    {quests.map((q) => (
      <QuestTile key={q.id} quest={q} />
    ))}
  </VStack>
);
