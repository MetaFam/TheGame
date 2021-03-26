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

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === quest.player.id;

  return (
    <VStack>
      <Heading>Quest details</Heading>
      <Text>{quest.title}</Text>
      <Text>{quest.status}</Text>
      <Text>{quest.repetition}</Text>
      <Text>{quest.description}</Text>

      <SkillsTags quest={quest} />

      <HStack>
        {isMyQuest &&
        <MetaLink
          as={`/quest/${quest.id}/edit`}
          href="/quest/[id]/edit"
        >
          <MetaButton>
            Edit Quest
          </MetaButton>
        </MetaLink>
        }
        {quest.external_link &&
        <MetaLink
          href={quest.external_link}
          isExternal
        >
          <MetaButton
            variant="outline"
          >
            Open link
          </MetaButton>
        </MetaLink>
        }
      </HStack>
    </VStack>
  );
};
