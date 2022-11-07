import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
  VStack,
} from '@metafam/ds';
import BackgroundImage from 'assets/main-background.png';
import { MetaLink } from 'components/Link';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RepetitionTag, StatusTag } from 'components/Quest/QuestTags';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import moment from 'moment';
import React from 'react';
import { optimizedImage } from 'utils/imageHelpers';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

type Props = {
  quest: QuestFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => {
  const descriptionSummary = quest.description
    ? `${quest.description.substring(0, 180)} ...`
    : 'No description available';

  const descIsHtml = /<\/?[a-z][\s\S]*>/i.test(descriptionSummary ?? '');
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(descriptionSummary ?? '')
    : '';

  return (
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
          src={optimizedImage('logoURL', quest.guild.logo)}
          name={quest.guild.name}
        />
      </Flex>

      <MetaTileHeader>
        <VStack>
          <MetaLink as={`/quest/${quest.id}`} href="/quest/[id]">
            <Heading
              size="md"
              color="white"
              fontFamily="body"
              textAlign="center"
            >
              {quest.title}
            </Heading>
          </MetaLink>
          <HStack mt={3}>
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
            {descIsHtml ? (
              <Prose>{parsedDescription}</Prose>
            ) : (
              <Markdown>{descriptionSummary}</Markdown>
            )}
            <MetaLink as={`/quest/${quest.id}`} href="/quest/[id]">
              Read more
            </MetaLink>
          </Box>
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
            {quest.quest_roles.length ? (
              <RolesTags
                roles={
                  quest.quest_roles.map(
                    ({ PlayerRole: r }) => r,
                  ) as PlayerRole[]
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
};
