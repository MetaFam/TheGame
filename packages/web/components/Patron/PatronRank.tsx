import { Box, Flex, MetaTag, Text } from '@metafam/ds';
import { computeRank, Constants, Maybe } from '@metafam/utils';
import Triangle from 'assets/triangle.svg';
import { utils } from 'ethers';
import { Player } from 'graphql/autogen/types';
import { Patron } from 'graphql/types';
import React, { useMemo } from 'react';
import { PATRON_RANKS, PATRONS_PER_RANK } from 'utils/patronHelpers';

type Props = {
  patron: Patron;
  index: number;
  pSeedPrice: Maybe<number>;
};

export const PatronRank: React.FC<Props> = ({ index, patron, pSeedPrice }) => {
  const player = patron as Player;

  const patronRank = useMemo(
    () => computeRank(index, PATRONS_PER_RANK, PATRON_RANKS),
    [index],
  );

  const displayBalance = useMemo(() => {
    const pSeedAmount = parseFloat(
      utils.formatUnits(patron.pSeedBalance, Constants.PSEED_DECIMALS),
    );
    const pSeedBalance = `${Math.floor(pSeedAmount).toLocaleString()} pSEED`;
    return pSeedPrice == null
      ? pSeedBalance
      : `$${(pSeedAmount * pSeedPrice).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`;
  }, [patron, pSeedPrice]);

  return (
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
        {patronRank && (
          <MetaTag
            backgroundColor={patronRank?.toLowerCase()}
            size="md"
            my={1}
            color="blackAlpha.600"
          >
            {patronRank}
          </MetaTag>
        )}
        {patron.pSeedBalance != null && (
          <Text fontSize="sm" color="white">
            {displayBalance}
          </Text>
        )}
        <Text fontSize="sm" color="white">{`XP: ${Math.floor(
          player.totalXP,
        ).toLocaleString()}`}</Text>
      </Flex>
    </Flex>
  );
};
