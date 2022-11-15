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
  <Flex pos="absolute" left={-8} top={-8} p={3} borderRadius="8px">
    <Box
      bgImage={Triangle.src}
      backgroundSize="contain"
      position="absolute"
      h={171}
      w={170}
      left={0}
      top={0}
      opacity={0.5}
      zIndex={1}
    />
    <Flex flexDir="column" gap={2} zIndex={2}>
      {showSeasonalXP && (
        <Text fontSize="sm" color="blueLight">
          SEASON XP: {Math.floor(player.seasonXP).toLocaleString()}
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
  </Flex>
);
