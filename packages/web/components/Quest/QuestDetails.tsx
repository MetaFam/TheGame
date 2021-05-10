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
import { FormattedText } from 'components/FormattedText';
import { MetaLink } from 'components/Link';
import {
  Quest,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragmentFragment,
  Skill,
} from 'graphql/autogen/types';
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
          <Heading size="sm" color="white" align="center" mb={2}>
            {quest.title}
          </Heading>
          <HStack mb={2} align="center">
            <RepetitionTag
              repetition={quest.repetition}
              cooldown={quest.cooldown}
            />
            <StatusTag status={quest.status} />
            <Text>
              <i>{moment(quest.created_at).fromNow()}</i>
            </Text>
          </HStack>
          <HStack w="100%" mb={3} justifyContent="center" spacing={3}>
            {isMyQuest && quest.status === QuestStatus_Enum.Open && (
              <MetaLink as={`/quest/${quest.id}/edit`} href="/quest/[id]/edit">
                <MetaButton colorScheme="purple" size="sm">
                  Edit Quest
                </MetaButton>
              </MetaLink>
            )}
            {quest.external_link && (
              <MetaLink href={quest.external_link} isExternal>
                <MetaButton variant="outline" colorScheme="cyan" size="sm">
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
          <FormattedText>{quest.description}</FormattedText>

          {quest.repetition === QuestRepetition_Enum.Recurring && (
            <>
              <Text textStyle="caption" mt={5}>
                Cooldown
              </Text>
              <Text fontSize="14px">
                Doable every{' '}
                {moment.duration(quest.cooldown, 'second').humanize()}
              </Text>
            </>
          )}

          <Text textStyle="caption" sx={{ mt: 5 }}>
            SKILLS
          </Text>
          <SkillsTags
            skills={quest.quest_skills.map((s) => s.skill) as Skill[]}
            maxSkills={4}
          />
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
