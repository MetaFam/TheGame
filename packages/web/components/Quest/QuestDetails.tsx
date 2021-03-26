import {
  Avatar,
  Box, Flex,
  Heading, HStack, MetaButton, MetaTile, MetaTileBody, MetaTileHeader,
  Text, VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { QuestWithCompletionFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { useUser } from '../../lib/hooks';
import { RepetitionTag, SkillsTags, StatusTag } from './QuestTags';
import BackgroundImage from '../../assets/main-background.jpg';

type Props = {
  quest: QuestWithCompletionFragmentFragment;
}

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === quest.player.id;

  return (
    <MetaTile maxW={undefined}>
      <Box
        bgImage={`url(${BackgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="3.5rem"
      />
      <Flex
        justify="center"
        mb={4}
      >
        <Avatar
          size="lg"
          src={quest.guild.logo || undefined}
          name={quest.guild.name}
        />
      </Flex>

      <MetaTileHeader>
        <VStack>
          <MetaLink
            as={`/quest/${quest.id}`}
            href="/quest/[id]"
          >
            <Heading size="sm" color="white">
              {quest.title}
            </Heading>
          </MetaLink>
          <HStack>
            <RepetitionTag quest={quest}/>
            <StatusTag quest={quest}/>
          </HStack>
          <HStack w="100%">
            {isMyQuest &&
            <MetaLink
              as={`/quest/${quest.id}/edit`}
              href="/quest/[id]/edit"
            >
              <MetaButton size="md">
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
                colorScheme="cyan"
                size="md"
              >
                Open link
              </MetaButton>
            </MetaLink>
            }
          </HStack>
        </VStack>
      </MetaTileHeader>
      <MetaTileBody flex={1}>
        <VStack spacing={2} align="stretch">
          <Text textStyle="caption">DESCRIPTION</Text>
          <Text>
            {quest.description}
          </Text>

          <Text textStyle="caption">SKILLS</Text>
          <SkillsTags quest={quest} maxSkills={20} />
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
