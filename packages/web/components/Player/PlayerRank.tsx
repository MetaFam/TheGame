import { Flex, MetaTag, Text, WrapItem } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import React from 'react';

type PlayerRankProps = {
  player: Player;
  showSeasonalXP?: boolean;
};

export const PlayerRank: React.FC<PlayerRankProps> = ({
  player,
  showSeasonalXP,
}) => (
  <Flex
    flexDir="column"
    gap={1}
    pos="absolute"
    left={-8}
    p={3}
    top={-8}
    background="rgba(255, 255, 255, 0.1)"
    backdropFilter="blur(10.5px)"
    borderRadius="8px"
  >
    {showSeasonalXP && (
      <Text fontSize="sm" color="blueLight">
        SEASON XP: {player.seasonXP}
      </Text>
    )}
    {player.rank && (
      <WrapItem>
        <MetaTag
          backgroundColor={player.rank.toLowerCase()}
          size="md"
          color="blackAlpha.600"
        >
          {player.rank}
        </MetaTag>
      </WrapItem>
    )}
    <Text fontSize="sm" color="blueLight">
      XP: {Math.floor(player.totalXP).toLocaleString()}
    </Text>
  </Flex>
);
