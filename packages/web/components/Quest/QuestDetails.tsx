import {
  Box,
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
import { MetaLink } from 'components/Link';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
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
import { useUser } from 'lib/hooks';
import moment from 'moment';
import React from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

type Props = {
  quest: QuestWithCompletionFragment;
};

export const QuestDetails: React.FC<Props> = ({ quest }) => {
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const descIsHtml = /<\/?[a-z][\s\S]*>/i.test(quest.description ?? '');
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(quest.description ?? '')
    : '';

  return (
    <MetaTile maxW={undefined} noTilt>
      <MetaTileHeader py={6} px={3}>
        <Heading size="lg" color="white" fontFamily="body" textAlign="center">
          {quest.title}
        </Heading>
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
      </MetaTileHeader>
      <MetaTileBody>
        <VStack spacing={2} align="stretch">
          <Box pb={2}>
            <Text textStyle="caption" pb={1}>
              DESCRIPTION
            </Text>
            {descIsHtml ? (
              <Prose>{parsedDescription}</Prose>
            ) : (
              <Markdown>{quest.description}</Markdown>
            )}
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
