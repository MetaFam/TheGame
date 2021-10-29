import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import React from 'react';

export const Seed: React.FC = () => (
  <StatGroup mt={5}>
    <Stat mb={3}>
      <StatLabel>Market Price</StatLabel>
      <StatNumber>$30.77</StatNumber>
      <StatHelpText>
        <StatArrow type="increase" />
        11.43%
      </StatHelpText>
    </Stat>

    <Stat mb={3}>
      <StatLabel>24h Trading Volume</StatLabel>
      <StatNumber>$1,034</StatNumber>
      <StatHelpText>
        <StatArrow type="increase" />
        9.05%
      </StatHelpText>
    </Stat>

    <Stat alignSelf="flex-start" flex="0 0 100%">
      <StatLabel>24h Low / High</StatLabel>
      <StatNumber>$30.24 / $32.17</StatNumber>
    </Stat>
  </StatGroup>
);
