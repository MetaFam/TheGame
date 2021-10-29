import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import React from 'react';

export const XP: React.FC = () => (
  <StatGroup mt={5} flex="0 0 50%">
    <Stat mb={3}>
      <StatLabel>This Week</StatLabel>
      <StatNumber>45</StatNumber>
      <StatHelpText>
        <StatArrow type="decrease" />
        55%
      </StatHelpText>
    </Stat>

    <Stat mb={3} flex="0 0 50%">
      <StatLabel>Last Week</StatLabel>
      <StatNumber>78</StatNumber>
      <StatHelpText>
        <StatArrow type="decrease" />
        22%
      </StatHelpText>
    </Stat>

    <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 50%">
      <StatLabel>All Time</StatLabel>
      <StatNumber>2463</StatNumber>
      <StatHelpText color="diamond">Diamond</StatHelpText>
    </Stat>
    <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 50%">
      <StatLabel>XP/SEED Ratio</StatLabel>
      <StatNumber>3.4</StatNumber>
      <StatHelpText>
        <StatArrow type="decrease" />
        0.3
      </StatHelpText>
    </Stat>
  </StatGroup>
);
