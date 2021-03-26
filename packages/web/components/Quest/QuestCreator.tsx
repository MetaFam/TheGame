import {
  Heading, HStack, MetaButton,
  Text, VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { QuestWithCompletionFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { useUser } from '../../lib/hooks';
import { SkillsTags } from './QuestTags';

type Props = {
  quest: QuestWithCompletionFragmentFragment;
}

export const QuestCreator: React.FC<Props> = ({ quest }) => {
  console.log(quest);
  return (
    <VStack>
      <Heading>Quest creator</Heading>
      <Text>{quest.title}</Text>
    </VStack>
  );
};
