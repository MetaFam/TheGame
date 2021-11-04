import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import { useUser } from 'lib/hooks';
import { useUserXp } from 'lib/hooks/useUserXp';
import React from 'react';

export const XP = (): React.ReactElement => {
  const { user } = useUser();

  const {
    absVariationLastWeek,
    absVariationThisWeek,
    thisWeekXp,
    lastWeekXp,
    userTotalXp,
  } = useUserXp(user?.ethereum_address || '');

  return (
    <StatGroup mt={5} flex="0 0 50%">
      <Stat mb={3}>
        <StatLabel>This Week</StatLabel>
        <StatNumber>{thisWeekXp}</StatNumber>
        <StatHelpText>
          <StatArrow
            type={`${
              absVariationThisWeek?.isNegative ? 'decrease' : 'increase'
            }`}
          />
          {absVariationThisWeek?.value}%
        </StatHelpText>
      </Stat>

      <Stat mb={3} flex="0 0 50%">
        <StatLabel>Last Week</StatLabel>
        <StatNumber>{lastWeekXp}</StatNumber>
        <StatHelpText>
          <StatArrow
            type={`${
              absVariationLastWeek?.isNegative ? 'decrease' : 'increase'
            }`}
          />
          {absVariationLastWeek?.value}%
        </StatHelpText>
      </Stat>

      <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 50%">
        <StatLabel>All Time</StatLabel>
        <StatNumber>{userTotalXp}</StatNumber>
        {user?.player?.rank && (
          <StatHelpText color={user?.player?.rank}>
            {user?.player?.rank}
          </StatHelpText>
        )}
      </Stat>
      {/* <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 50%">
        <StatLabel>XP/SEED Ratio</StatLabel>
        <StatNumber>3.4</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          0.3
        </StatHelpText>
      </Stat> */}
    </StatGroup>
  );
};
