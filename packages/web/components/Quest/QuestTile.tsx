import {
  Box,
  Flex,
  Heading,
  Link,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
  VStack,
} from '@metafam/ds';
import { httpLink, isSGML } from '@metafam/utils';
import BackgroundImage from 'assets/quests/quest.webp';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import { SquareImage } from 'components/SquareImage';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import React, { PropsWithChildren } from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

export const TileHeading: React.FC<PropsWithChildren> = ({ children }) => (
  <Text textStyle="caption">{children}</Text>
);

type Props = {
  quest: QuestFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => {
  const description = quest.description ?? '*No Description Available*';
  const descIsHtml = isSGML(description);
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(description)
    : null;

  return (
    <Link
      role="group"
      _hover={{ textDecoration: 'none' }}
      href={`/quest/${quest.id}`}
    >
      <MetaTile minW={'300px'} height="full" width="full" cursor="pointer">
        <MetaTileHeader>
          <SquareImage
            src={httpLink(quest.image) ?? BackgroundImage.src}
            size="xl"
          />
          <Flex px={5} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              fontSize="3xl"
              color="white"
              bgColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
              lineHeight={1.1}
              px={4}
              py={3}
              width="full"
              textAlign="center"
              borderRadius={10}
              fontFamily="body"
              fontWeight={400}
              textShadow="0 0 8px var(--chakra-colors-blackAlpha-400)" // v. light shadow makes the text readable if the logo/avatar is white
              noOfLines={2}
            >
              {quest.title}
            </Heading>
          </Flex>
        </MetaTileHeader>
        <MetaTileBody>
          <Flex
            direction="column"
            gap={4}
            mt={2}
            px={2}
            pb={2}
            height="full"
            justifyItems="space-between"
          >
            {(description || parsedDescription) && (
              <VStack align="left" spacing={1}>
                <TileHeading>Description</TileHeading>
                <Box fontSize="md" noOfLines={4} mt={0}>
                  {descIsHtml ? (
                    <Prose>{parsedDescription}</Prose>
                  ) : (
                    <Markdown>{description}</Markdown>
                  )}
                </Box>
              </VStack>
            )}

            <VStack align="left" gap={1} mt="auto">
              {quest.quest_skills.length > 0 && (
                <>
                  <VStack align="left" spacing={1}>
                    <TileHeading>Skills</TileHeading>
                    <Box>
                      <SkillsTags
                        skills={
                          quest.quest_skills.map(
                            ({ skill }) => skill,
                          ) as Skill[]
                        }
                      />
                    </Box>
                  </VStack>
                </>
              )}

              {quest.quest_roles.length > 0 && (
                <VStack align="left" spacing={1}>
                  <TileHeading>Roles</TileHeading>
                  <Box>
                    <RolesTags
                      roles={
                        quest.quest_roles.map(
                          ({ PlayerRole: r }) => r,
                        ) as PlayerRole[]
                      }
                    />
                  </Box>
                </VStack>
              )}
            </VStack>
          </Flex>
        </MetaTileBody>
      </MetaTile>
    </Link>
  );
};
