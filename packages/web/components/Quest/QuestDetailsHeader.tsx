import {
  Box,
  Button,
  Flex,
  Heading,
  MetaButton,
  Stack,
  Text,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Quest, QuestFragment } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
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
  const { user } = useUser();
  const isMyQuest = user?.id === (quest as Quest).player.id;
  const {
    repetition,
    cooldown,
    // createdAt,
    // externalLink: link,
    title,
    status,
  } = quest;

  return (
    <Flex
      as="header"
      alignItems="center"
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      gap={6}
      mb={[8, 8, 12]}
    >
      <Box w="full" flexBasis="100%">
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
          <StatusTag status={status} />
          <RepetitionTag {...{ repetition, cooldown }} />
        </Flex>
      </Box>

      {/* isMyQuest conditional here to show edit/delete {isMyQuest && ...} */}
      <Box w="full" maxW={{ base: '100%', md: '12rem' }}>
        {/* Stacked vertically after md breakpoint */}
        <Stack spacing={5} direction={{ base: 'row', md: 'column' }}>
          <Button
            variant="outline"
            borderWidth={2}
            size="lg"
            fontSize="md"
            w="full"
          >
            Edit quest
          </Button>

          <Button variant="warning" size="lg" fontSize="md" w="full">
            Delete quest
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
