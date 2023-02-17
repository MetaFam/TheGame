import {
  Box,
  Flex,
  Heading,
  HStack,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
  VStack,
} from '@metafam/ds';
import { httpLink, isSGML } from '@metafam/utils';
import BackgroundImage from 'assets/quests/quest.webppp';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { SquareImage } from 'components/SquareImage';
import {
  PlayerRole,
  Quest,
  QuestRepetition_Enum,
  QuestStatus_Enum,
  QuestWithCompletionFragment,
  Skill,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import moment from 'moment';
import React from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

import { RepetitionTag, StatusTag } from './QuestTags';
import { TileHeading } from './QuestTile';
import { RolesTags } from './Roles';
import { SkillsTags } from './Skills';

type Props = {
  quest: QuestWithCompletionFragment;
};

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const descIsHtml = isSGML(quest.description ?? '');
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(quest.description ?? '')
    : null;
  const {
    repetition,
    cooldown,
    image,
    createdAt,
    externalLink: link,
    title,
    status,
  } = quest;

  return (
    <MetaTile maxW={undefined} noTilt>
      <MetaTileHeader py={6} px={3}>
        <Flex direction="column" align="center">
          <Box width={300} mb={5}>
            <SquareImage
              src={httpLink(image) ?? BackgroundImage.src}
              overflow="hidden"
            />
          </Box>
          <Heading size="xl" color="white" fontFamily="body">
            {title}
          </Heading>
        </Flex>
        <HStack mt={2}>
          <RepetitionTag {...{ repetition, cooldown }} />
          <StatusTag status={quest.status} />
          <Text fontStyle="italic" title={new Date(createdAt).toLocaleString()}>
            {moment(createdAt).fromNow()}
          </Text>
        </HStack>
        <HStack w="full" mt={0.5}>
          {isMyQuest && status === QuestStatus_Enum.Open && (
            <MetaButton href={`/quest/${quest.id}/edit`} size="md">
              Edit Quest
            </MetaButton>
          )}
          {link && (
            <MetaButton
              href={link}
              target="_blank"
              variant="outline"
              colorScheme="cyan"
              size="md"
            >
              Open Link
            </MetaButton>
          )}
        </HStack>
      </MetaTileHeader>
      <MetaTileBody pt={0}>
        <VStack spacing={2} align="stretch">
          <Box py={2}>
            <TileHeading>Description</TileHeading>
            {descIsHtml ? (
              <Prose>{parsedDescription}</Prose>
            ) : (
              <Markdown>{quest.description}</Markdown>
            )}
          </Box>

          {repetition === QuestRepetition_Enum.Recurring && (
            <>
              <TileHeading>Cooldown</TileHeading>
              <Text>
                Doable every ~{moment.duration(cooldown, 'second').humanize()}
              </Text>
            </>
          )}

          <Box pb={2}>
            <TileHeading>Skills</TileHeading>
            <SkillsTags
              skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
            />
          </Box>
          <Box pb={2}>
            <TileHeading>Roles</TileHeading>
            <RolesTags
              roles={
                quest.quest_roles.map(
                  ({ PlayerRole: role }) => role,
                ) as PlayerRole[]
              }
            />
          </Box>
        </VStack>
      </MetaTileBody>
    </MetaTile>
  );
};
