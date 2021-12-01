import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import {
  Quest,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragmentFragment,
  Skill,
} from 'graphql/autogen/types';
import parse from 'html-react-parser';
import moment from 'moment';
import React from 'react';

import BackgroundImage from '../../assets/main-background.jpg';
import { useUser } from '../../lib/hooks';
import { SkillsTags } from '../Skills';
import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestWithCompletionFragmentFragment;
};

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;

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
              <i>{moment(quest.created_at).fromNow()}</i>
            </Text>
          </HStack>
          <HStack w="100%" mt={2}>
            {isMyQuest && quest.status === QuestStatus_Enum.Open && (
              <MetaLink as={`/quest/${quest.id}/edit`} href="/quest/[id]/edit">
                <MetaButton size="md">Edit Quest</MetaButton>
              </MetaLink>
            )}
            {quest.external_link && (
              <MetaLink href={quest.external_link} isExternal>
                <MetaButton variant="outline" colorScheme="cyan" size="md">
                  Open link
                </MetaButton>
              </MetaLink>
            )}
          </HStack>
        </VStack>
      </MetaTileHeader>
      <MetaTileBody>
        <VStack spacing={2} align="stretch">
          <Text textStyle="caption">DESCRIPTION</Text>
          <Box>{parse(quest.description || '')}</Box>

          {quest.repetition === QuestRepetition_Enum.Recurring && (
            <>
              <Text textStyle="caption">Cooldown</Text>
              <Text>
                Doable every{' '}
                {moment.duration(quest.cooldown, 'second').humanize()}
              </Text>
            </>
          )}

          <Text textStyle="caption">SKILLS</Text>
          <SkillsTags
            skills={quest.quest_skills.map((s) => s.skill) as Skill[]}
            maxSkills={4}
          />
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
