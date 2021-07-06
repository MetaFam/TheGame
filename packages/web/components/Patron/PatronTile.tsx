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
import { computeRank } from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Skills';
import { utils } from 'ethers';
import {
  PlayerFragmentFragment,
  PlayerRank_Enum,
  Skill,
} from 'graphql/autogen/types';
import { Patron } from 'graphql/types';
import React from 'react';
import {
  getPlayerCoverImage,
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
} from 'utils/playerHelpers';

const PATRON_RANKS = [
  PlayerRank_Enum.Diamond,
  PlayerRank_Enum.Platinum,
  PlayerRank_Enum.Gold,
  PlayerRank_Enum.Silver,
  PlayerRank_Enum.Bronze,
];

const PATRONS_PER_RANK = [7, 7, 7, 14, 21];

type Props = {
  patron: Patron;
  index: number;
};

export const PatronTile: React.FC<Props> = ({ index, patron }) => {
  const player = patron as PlayerFragmentFragment;
  const patronRank = computeRank(index, PATRONS_PER_RANK, PATRON_RANKS);
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
              <MetaTag size="md">
                {`pSEED: ${Math.floor(
                  Number(utils.formatEther(patron.pSeedBalance)),
                )}`}
              </MetaTag>
            </WrapItem>
          ) : null}
          {patronRank ? (
            <WrapItem>
              <MetaTag
                backgroundColor={patronRank?.toLowerCase()}
                size="md"
                color="blackAlpha.600"
              >
                {patronRank}
              </MetaTag>
            </WrapItem>
          ) : null}
          <WrapItem>
            <MetaTag size="md">{`XP: ${Math.floor(player.total_xp)}`}</MetaTag>
          </WrapItem>
        </Wrap>
        {getPlayerDescription(player) && (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">ABOUT</Text>
            <Text fontSize="sm">{getPlayerDescription(player)}</Text>
          </VStack>
        )}
      </MetaTileHeader>
      <MetaTileBody>
        {player.Player_Skills.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">SKILLS</Text>
            <SkillsTags
              skills={player.Player_Skills.map((s) => s.Skill) as Skill[]}
            />
          </VStack>
        ) : null}

        {player.daohausMemberships.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">MEMBER OF</Text>
            <PlayerTileMemberships player={player} />
          </VStack>
        ) : null}
        {player.Accounts.length ? (
          <VStack spacing={2} align="stretch">
            <Text textStyle="caption">CONTACT</Text>
            <HStack mt="2">
              <PlayerContacts player={player} />
            </HStack>
          </VStack>
        ) : null}
      </MetaTileBody>
    </MetaTile>
  );
};
