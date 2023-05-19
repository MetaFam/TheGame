import { Box, Flex, Heading, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { QuestFragment } from 'graphql/autogen/types';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
import React from 'react';

import { RepetitionTag, StatusTag } from './QuestTags';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsHeader: React.FC<Props> = ({ quest }) => {
  const playerName = usePlayerName(quest.player);
  const playerProfileLinkURL = usePlayerURL(quest.player);
  const {
    repetition,
    cooldown,
    // createdAt,
    // externalLink: link,
    title,
    // status,
  } = quest;

  return (
    <Box as="header" mb={[8, 8, 12]}>
      <Heading
        as="h1"
        fontFamily="body"
        fontWeight="600"
        fontSize={{ base: '5xl', md: '8xl' }}
        mb={5}
      >
        {title}
      </Heading>
      <Flex
        gap={2}
        fontSize="2xl"
        lineHeight="1.1"
        alignItems="flex-start"
        mb={5}
      >
        <Text as="div" fontWeight="400" whiteSpace="nowrap">
          Created by
        </Text>

        <Flex alignItems="flex-start" gap={2}>
          <PlayerAvatar player={quest.player} size="sm" />

          <Text
            wordBreak="break-all" /* in case of really long usernames or an ETH address as username */
          >
            <MetaLink href={playerProfileLinkURL}>{playerName}</MetaLink>
          </Text>
        </Flex>
      </Flex>

      <Flex gap={2}>
        <StatusTag status={quest.status} />

        <RepetitionTag {...{ repetition, cooldown }} />
      </Flex>
    </Box>
  );
};
