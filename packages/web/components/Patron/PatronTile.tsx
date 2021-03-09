import {
  Avatar,
  Box,
  Heading,
  HStack,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { utils } from 'ethers';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import {
  getPlayerCoverImage,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

export const PatronTile: React.FC<Props> = ({ player }) => {
  return (
    <MetaTile key={player.id}>
      <Box
        bgImage={`url(${getPlayerCoverImage(player)})`}
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="4.5rem"
      />
      <MetaTileHeader>
        <MetaLink
          as={`/player/${player.username}`}
          href="/player/[username]"
          key={player.id}
        >
          <VStack>
            <Avatar
              size="xl"
              src={getPlayerImage(player)}
              name={getPlayerName(player)}
            />
            <Heading size="xs" color="white">
              {getPlayerName(player)}
            </Heading>
          </VStack>
        </MetaLink>
        <Wrap w="100%" justify="center">
          {player.playerType?.title ? (
            <WrapItem>
              <MetaTag size="md">
                {player.playerType?.title.toUpperCase()}
              </MetaTag>
            </WrapItem>
          ) : null}
          {player.token_balance?.pSeedBalance ? (
            <WrapItem>
              <MetaTag
                backgroundColor="cyan.400"
                size="md"
                color="blackAlpha.600"
              >
                {`pSEED: ${Math.floor(
                  Number(utils.formatEther(player.token_balance?.pSeedBalance)),
                )}`}
              </MetaTag>
            </WrapItem>
          ) : null}
          <WrapItem>
            <MetaTag size="md">XP: {Math.floor(player.total_xp)}</MetaTag>
          </WrapItem>
        </Wrap>
        {player.box_profile?.description ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              ABOUT
            </Text>
            <Text fontSize="sm">{player.box_profile.description}</Text>
          </VStack>
        ) : null}
      </MetaTileHeader>
      <MetaTileBody>
        {player.daohausMemberships.length ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              MEMBER OF
            </Text>
            <PlayerTileMemberships player={player} />
          </VStack>
        ) : null}
        {player.Accounts.length ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              CONTACT
            </Text>
            <HStack mt="2">
              <PlayerContacts player={player} />
            </HStack>
          </VStack>
        ) : null}
      </MetaTileBody>
    </MetaTile>
  );
};
