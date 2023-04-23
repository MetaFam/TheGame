import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
  VisuallyHidden,
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
  <Text as="h3" textStyle="caption">
    {children}
  </Text>
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
    <MetaTile minW={'300px'} height="full" width="full">
      <MetaTileHeader>
        <LinkBox>
          <LinkOverlay href={`/quest/${quest.id}`}>
            <SquareImage
              src={httpLink(quest.image) ?? BackgroundImage.src}
              size="xl"
            />
            <Box px={5} w="full" pos="absolute" bottom={-6} zIndex={1}>
              <Heading
                as="h2"
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
                textShadow="0 0 8px var(--chakra-colors-blackAlpha-400)" // v. light shadow makes the text readable if the quest image has a white background
                noOfLines={2}
              >
                {quest.title}
              </Heading>
            </Box>
          </LinkOverlay>
        </LinkBox>
      </MetaTileHeader>

      <MetaTileBody pt={0}>
        <LinkBox height="full">
          <Flex
            direction="column"
            gap={4}
            px={2}
            pb={2}
            pt={10}
            height="full"
            justifyItems="space-between"
          >
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
          {/**
           * A hidden link overlay that makes the MetaTileBody a clickable link
           * Why?
           * 1. Links are allowed in the Quest Description
           * 2. If there is a link in the Quest Description it causes a hydration error because you can't have links inside links
           * 3. So the link overlay cannot wrap the description
           * 4. If the link overlay is added to the Skills or Roles Tags, it can't break out of the Vstack that wraps it, and the description is then not included in the link target
           * 5. So there's a hidden link down here
           */}
          <LinkOverlay href={`/quest/${quest.id}`}>
            <VisuallyHidden as="span">Read more</VisuallyHidden>
          </LinkOverlay>
        </LinkBox>
      </MetaTileBody>
    </MetaTile>
  );
};
