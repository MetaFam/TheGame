import {
  Heading, HStack, MetaButton, MetaTag,
  Text, VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { QuestWithCompletionFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';

import { useUser } from '../../lib/hooks';

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

      <HStack>
        {quest.quest_skills.map(qs => (
          <MetaTag
            size="md"
            fontWeight="normal"
            backgroundColor={SkillColors[qs.skill.category]}
          >
            {qs.skill.name}
          </MetaTag>
        ))}
      </HStack>
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
