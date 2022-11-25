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
import { isSGML, Maybe } from '@metafam/utils';
import BackgroundImage from 'assets/quests/quest.png';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { RolesTags } from 'components/Quest/Roles';
import { SkillsTags } from 'components/Quest/Skills';
import { SquareImage } from 'components/SquareImage';
import { PlayerRole, QuestFragment, Skill } from 'graphql/autogen/types';
import React, { useEffect, useRef } from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

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
    <LinkBox role="group">
      <MetaTile height="full" width="full">
        <MetaTileHeader>
          <SquareImage src={BackgroundImage.src} />
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <LinkOverlay href={`/quests/${quest.id}`}>
              <Heading
                size="lg"
                color="white"
                bgColor="whiteAlpha.100"
                backdropFilter="blur(10px)"
                lineHeight={1.8}
                justifyContent="center"
                px={3}
                width="full"
                textAlign="center"
                borderRadius={10}
                fontFamily="body"
                fontWeight="normal"
              >
                {quest.title}
              </Heading>
            </LinkOverlay>
          </Flex>
        </MetaTileHeader>
        <MetaTileBody>
          <Flex direction="column">
            <Box pb={2}>
              <Text textStyle="caption" pb={1}>
                Description
              </Text>
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
              <Text textStyle="caption" pb={1}>
                Skills
              </Text>
              <SkillsTags
                skills={quest.quest_skills.map(({ skill }) => skill) as Skill[]}
              />
            </Box>
            <Box pb={2}>
              <Text textStyle="caption" pb={1}>
                Roles
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
    </LinkBox>
  );
};
