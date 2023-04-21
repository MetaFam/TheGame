import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Prose,
  Text,
} from '@metafam/ds';
import { httpLink, isSGML, Maybe } from '@metafam/utils';
import BackgroundImage from 'assets/quests/quest.webp';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import { SquareImage } from 'components/SquareImage';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

export const TileHeading: React.FC<PropsWithChildren> = ({ children }) => (
  <Text as="h3" textStyle="caption" pb={1}>
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
  const descriptionRef = useRef<Maybe<HTMLDivElement>>(null);
  const [clamped, setClamped] = React.useState(false);
  const descriptionContent = descriptionRef.current?.textContent;

  useEffect(() => {
    const handleResize = () => {
      const desc = descriptionRef.current;
      if (desc) {
        setClamped(desc.scrollHeight > desc.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [descriptionContent]);

  return (
    <LinkBox>
      <LinkOverlay href={`/quest/${quest.id}`} w="full" justifyContent="center">
        <MetaTile height="full" width="full">
          <MetaTileHeader>
            <SquareImage src={httpLink(quest.image) ?? BackgroundImage.src} />
            <Flex justify="center" position="absolute" bottom="-15%" w="full">
              <Heading
                zIndex={3}
                size="lg"
                color="white"
                bgColor="whiteAlpha.300"
                backdropFilter="blur(10px)"
                lineHeight={1.1}
                px={3}
                py={1}
                mb={8}
                textAlign="center"
                borderRadius={10}
                fontFamily="body"
                fontWeight="normal"
                noOfLines={3}
              >
                {quest.title}
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody>
            <Flex direction="column">
              <Box pb={2}>
                <TileHeading>Description</TileHeading>
                <Box noOfLines={3} ref={descriptionRef}>
                  {descIsHtml ? (
                    <Prose>{parsedDescription}</Prose>
                  ) : (
                    <Markdown>{description}</Markdown>
                  )}
                </Box>
                {clamped && (
                  <Flex justifyContent="end" mr={5}>
                    <MetaButton
                      href={`/quest/${quest.id}`}
                      h="auto"
                      size="sm"
                      px={3}
                      py={1}
                    >
                      Read More…
                    </MetaButton>
                  </Flex>
                )}
              </Box>
              <Box pb={2}>
                <TileHeading>Skills</TileHeading>
                <SkillsTags
                  skills={
                    quest.quest_skills.map(({ skill }) => skill) as Skill[]
                  }
                />
              </Box>
              <Box pb={2}>
                <TileHeading>Roles</TileHeading>
                {quest.quest_roles.length > 0 ? (
                  <RolesTags
                    roles={
                      quest.quest_roles.map(
                        ({ PlayerRole: r }) => r,
                      ) as PlayerRole[]
                    }
                  />
                ) : (
                  <Text>None</Text>
                )}
              </Box>
            </Flex>
          </MetaTileBody>
        </MetaTile>
      </LinkOverlay>
    </LinkBox>
  );
};
