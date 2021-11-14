import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import { useUser } from 'lib/hooks';
import { useUserXP } from 'lib/hooks/useUserXp';
import React from 'react';

export const XP = (): React.ReactElement => {
  const { user } = useUser();

  const {
    userTotalXP,
    variationThisWeek,
    variationLastWeek,
    thisWeekXP,
    lastWeekXP,
  } = useUserXP(user?.ethereum_address || '');

  return (
    <StatGroup mt={5} flex="0 0 50%">
      <Stat mb={3}>
        <StatLabel>This Week</StatLabel>
        <StatNumber>{thisWeekXP}</StatNumber>
        <StatHelpText>
          <StatArrow type={variationThisWeek < 0 ? 'decrease' : 'increase'} />
          {variationThisWeek}%
        </StatHelpText>
      </Stat>

      <Stat mb={3} flex="0 0 50%">
        <StatLabel>Last Week</StatLabel>
        <StatNumber>{lastWeekXP}</StatNumber>
        <StatHelpText>
          <StatArrow type={variationLastWeek < 0 ? 'decrease' : 'increase'} />
          {lastWeekXP}%
        </StatHelpText>
      </Stat>

      <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 100%">
        <StatLabel>All Time</StatLabel>
        <StatNumber>{userTotalXP}</StatNumber>
        {user?.player?.rank && (
          <StatHelpText color={user.player.rank}>
            {user.player.rank}
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
