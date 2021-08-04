import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { QuestFragmentFragment, Skill } from 'graphql/autogen/types';
import moment from 'moment';
import NextLink from 'next/link';
import React from 'react';

import { SkillsTags } from '../Skills';
import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestFragmentFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => (
  <LinkBox>
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
      <Flex justify="center" mb={4}>
        <Avatar
          size="lg"
          src={quest.guild.logo || undefined}
          name={quest.guild.name}
        />
      </Flex>

      <NextLink as={`/quest/${quest.id}`} href="/quest/[id]" passHref>
        <LinkOverlay>
          <MetaTileHeader>
            <VStack>
              <Heading size="sm" color="white" align="center">
                {quest.title}
              </Heading>
              <HStack mt={2}>
                <RepetitionTag
                  repetition={quest.repetition}
                  cooldown={quest.cooldown}
                />
                <StatusTag status={quest.status} />
                <Text>
                  <i>{moment(quest.created_at).fromNow()}</i>
                </Text>
              </HStack>
            </VStack>
          </MetaTileHeader>
        </LinkOverlay>
      </NextLink>
      <MetaTileBody flex={1}>
        <VStack spacing={2} align="stretch">
          <Text textStyle="caption">DESCRIPTION</Text>
          <Text noOfLines={4}>{quest.description}</Text>

          <Text textStyle="caption">SKILLS</Text>
          <SkillsTags
            skills={quest.quest_skills.map((s) => s.skill) as Skill[]}
            maxSkills={4}
          />
        </VStack>
      </MetaTileBody>
    </MetaTile>
  </LinkBox>
);
