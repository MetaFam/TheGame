import { Box, Flex, Image, MetaTag, Text, WrapItem } from '@metafam/ds';
import Triangle from 'assets/triangle.svg';
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
    background="hsl(253deg 65% 11% / 55%)"
    backdropFilter="blur(10.5px)"
    borderRadius="8px"
    zIndex={1}
  >
    <Flex flexDir="column" gap={2} zIndex={2}>
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
      <Text fontSize="sm" color="white">
        XP: {Math.floor(player.totalXP).toLocaleString()}
      </Text>
      {showSeasonalXP && (
        <Text fontSize="sm" color="white">
          {/* hardcoded Season #, will have to be changed every season */}
          S8: {Math.floor(player.seasonXP).toLocaleString()}
        </Text>
      )}
    </Flex>
  </Flex>
);
