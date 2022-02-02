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
import {
  PlayerRole,
  QuestFragmentFragment,
  Skill,
} from 'graphql/autogen/types';
import parse from 'html-react-parser';
import moment from 'moment';
import React from 'react';

import { RolesTags } from '../Roles';
import { SkillsTags } from '../Skills';
import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestFragmentFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => (
  <MetaTile>
    <Box
      bgImage={`url(${BackgroundImage})`}
      bgSize="cover"
      bgPosition="center"
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="3.5rem"
    />
    <Flex justify="center" mb={4}>
      <Avatar
        size="lg"
        src={quest.guild.logo || undefined}
        name={quest.guild.name}
      />
    </Flex>

    <MetaTileHeader>
      <VStack>
        <MetaLink as={`/quest/${quest.id}`} href="/quest/[id]">
          <Heading size="sm" color="white" align="center">
            {quest.title}
          </Heading>
        </MetaLink>
        <HStack mt={2}>
          <RepetitionTag
            repetition={quest.repetition}
            cooldown={quest.cooldown}
          />
          <StatusTag status={quest.status} />
          <Text>
            <i>{moment(quest.createdAt).fromNow()}</i>
          </Text>
        </HStack>
      </VStack>
    </MetaTileHeader>
    <MetaTileBody flex={1}>
      <VStack spacing={2} align="stretch">
        <Box pb={2}>
          <Text textStyle="caption" pb={1}>
            DESCRIPTION
          </Text>
          <Text>{parse(quest.description || '')}</Text>
        </Box>
        <Box pb={2}>
          <Text textStyle="caption" pb={1}>
            SKILLS
          </Text>
          <SkillsTags
            skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
            maxSkills={4}
          />
        </Box>
        <Box pb={2}>
          <Text textStyle="caption" pb={1}>
            ROLES
          </Text>
          {quest.quest_roles.length ? (
            <RolesTags
              roles={
                quest.quest_roles.map(({ PlayerRole: r }) => r) as PlayerRole[]
              }
            />
          ) : (
            <Text>/</Text>
          )}
        </Box>
      </VStack>
    </MetaTileBody>
  </MetaTile>
);
