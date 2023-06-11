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
            size="lg"
            fontSize="md"
            variant="edit"
            w="full"
            borderColor="blueLight"
            borderRadius={4}
            borderWidth={2}
            color="blueLight"
            _hover={{
              bg: 'blackAlpha.200',
              borderColor: 'secondaryBlue.200',
              color: 'secondaryBlue.200',
            }}
            _active={{
              bg: 'blackAlpha.200',
              borderColor: 'blueLight',
              color: 'blueLight',
            }}
          >
            Edit quest
          </Button>

          <Button
            size="lg"
            fontSize="md"
            variant="delete"
            w="full"
            borderColor="red.500"
            borderRadius={4}
            borderWidth={1}
            color="red.500"
            _hover={{
              bg: 'blackAlpha.200',
              borderColor: 'red.700',
              color: 'red.500',
            }}
            _active={{
              bg: 'blackAlpha.200',
              borderColor: 'red.500',
              color: 'red.500',
            }}
          >
            Delete quest
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
