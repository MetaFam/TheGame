import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { MetaLink } from 'components/Link';
import { QuestWithCompletionFragmentFragment, QuestFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { RepetitionTag,SkillsTags, StatusTag } from './QuestTags';
import moment from 'moment';

type Props = {
  quest: QuestFragmentFragment | QuestWithCompletionFragmentFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => (
  <MetaTile>
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
        <HStack mt={2}>
          <RepetitionTag quest={quest}/>
          <StatusTag quest={quest}/>
          <Text><i>{moment(quest.created_at).fromNow()}</i></Text>
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
        <SkillsTags quest={quest} maxSkills={4} />
      </VStack>
    </MetaTileBody>
  </MetaTile>
);
