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
import { SkillsTags } from 'components/Skills';
import { utils } from 'ethers';
import { PlayerFragmentFragment, Skill } from 'graphql/autogen/types';
import { Patron } from 'graphql/types';
import React from 'react';
import {
  getPlayerCoverImage,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

type Props = {
  patron: Patron;
};

export const PatronTile: React.FC<Props> = ({ patron }) => {
  const player = patron as PlayerFragmentFragment;
  return (
    <MetaTile>
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
          {patron.pSeedBalance ? (
            <WrapItem>
              <MetaTag
                size="md"
              >
                {`pSEED: ${Math.floor(
                  Number(utils.formatEther(patron.pSeedBalance)),
                )}`}
              </MetaTag>
            </WrapItem>
          ) : null}
          {player.rank ? (
            <WrapItem>
              <MetaTag
                backgroundColor={player.rank?.toLowerCase()}
                size="md"
                color="blackAlpha.600"
              >
                {player.rank}
              </MetaTag>
            </WrapItem>
          ) : null}
          <WrapItem>
            <MetaTag size="md">XP: {Math.floor(player.total_xp)}</MetaTag>
          </WrapItem>
        </Wrap>
        {player.box_profile?.description ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">
              ABOUT
            </Text>
            <Text fontSize="sm">{player.box_profile.description}</Text>
          </VStack>
        ) : null}
      </MetaTileHeader>
      <MetaTileBody>
        {player.Player_Skills.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">
              SKILLS
            </Text>
            <SkillsTags skills={player.Player_Skills.map(s => s.Skill) as Skill[]} />
          </VStack>
        ) : null}

        {player.daohausMemberships.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">
              MEMBER OF
            </Text>
            <PlayerTileMemberships player={player} />
          </VStack>
        ) : null}
        {player.Accounts.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">
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
