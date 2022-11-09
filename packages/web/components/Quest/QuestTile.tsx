import {
  Box,
  Flex,
  Heading,
<<<<<<< HEAD
=======
  HStack,
>>>>>>> 86629af0 (make all card images square & clickable)
  Link,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
} from '@metafam/ds';
import BackgroundImage from 'assets/quests/quest.png';
import { MetaLink } from 'components/Link';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import { SquareImage } from 'components/SquareImage';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import React from 'react';
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
    <Link
      role="group"
      _hover={{ textDecoration: 'none' }}
      href={`/quest/${quest.id}`}
    >
      <MetaTile height="full" width="full">
        <MetaTileHeader>
<<<<<<< HEAD
          <SquareImage src={BackgroundImage.src} />
=======
          <SquareImage src={BackgroundImage} />
>>>>>>> 86629af0 (make all card images square & clickable)
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              size="lg"
              color="white"
<<<<<<< HEAD
              bgColor="whiteAlpha.100"
=======
              bgColor="rgba(255, 255, 255, 0.06)"
>>>>>>> 86629af0 (make all card images square & clickable)
              style={{ backdropFilter: 'blur(10px)' }}
              lineHeight={1.8}
              justifyContent="center"
              px={3}
              width="full"
              textAlign="center"
              borderRadius={10}
              fontFamily="body"
              fontWeight={400}
            >
              {quest.title}
            </Heading>
          </Flex>
        </MetaTileHeader>
        <MetaTileBody>
<<<<<<< HEAD
          <Flex flexDir="column">
            <Box pb={2}>
              <Text textStyle="caption" pb={1}>
                Description
=======
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
          <Flex flexDir="column">
            <Box pb={2}>
              <Text textStyle="caption" pb={1}>
                DESCRIPTION
>>>>>>> 86629af0 (make all card images square & clickable)
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
<<<<<<< HEAD
                Skills
=======
                SKILLS
>>>>>>> 86629af0 (make all card images square & clickable)
              </Text>
              <SkillsTags
                skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
              />
            </Box>
            <Box pb={2}>
              <Text textStyle="caption" pb={1}>
<<<<<<< HEAD
                Roles
=======
                ROLES
>>>>>>> 86629af0 (make all card images square & clickable)
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
          </Flex>
        </MetaTileBody>
      </MetaTile>
    </Link>
  );
};
