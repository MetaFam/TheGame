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
import BackgroundImage from 'assets/main-background.jpg';
import { MetaLink } from 'components/Link';
import { RepetitionTag, StatusTag } from 'components/Quest/QuestTags';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import {
  PlayerRole,
  Quest,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
  Skill,
} from 'graphql/autogen/types';
import parse from 'html-react-parser';
import { useUser } from 'lib/hooks';
import moment from 'moment';
import React from 'react';

type Props = {
  quest: QuestWithCompletionFragment;
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
            <Heading size="sm" color="white" textAlign="center">
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
          <HStack w="100%" mt={2}>
            {isMyQuest && quest.status === QuestStatus_Enum.Open && (
              <MetaLink as={`/quest/${quest.id}/edit`} href="/quest/[id]/edit">
                <MetaButton size="md">Edit Quest</MetaButton>
              </MetaLink>
            )}
            {quest.externalLink && (
              <MetaLink href={quest.externalLink} isExternal>
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
          <Box pb={2}>
            <Text textStyle="caption" pb={1}>
              DESCRIPTION
            </Text>
            <Text>{parse(quest.description || '')}</Text>
          </Box>

          {quest.repetition === QuestRepetition_Enum.Recurring && (
            <>
              <Text textStyle="caption">Cooldown</Text>
              <Text>
                Doable every{' '}
                {moment.duration(quest.cooldown, 'second').humanize()}
              </Text>
            </>
          )}

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
            <RolesTags
              roles={
                quest.quest_roles.map(({ PlayerRole: r }) => r) as PlayerRole[]
              }
            />
          </Box>
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
