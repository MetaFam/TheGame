import { MetaTag, Text, VStack, Wrap, WrapItem } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import React, { useMemo } from 'react';

type Props = {
  player: Player;
};

const SHOW_MEMBERSHIPS = 4;

export const PlayerTileMemberships: React.FC<Props> = ({ player }) => {
  const displayMemberships = useMemo(
    () => player.guilds?.filter(({ Guild: { name } }) => !!name) ?? [],
    [player.guilds],
  );
  return displayMemberships.length > 0 ? (
    <VStack spacing={2} align="stretch">
      <Text textStyle="caption">MEMBER OF</Text>
      <Wrap>
        {displayMemberships.slice(0, SHOW_MEMBERSHIPS).map((member) => (
          <WrapItem key={member.guildId}>
            <MetaTag size="md" fontWeight="normal">
              {member.Guild.name}
            </MetaTag>
          </WrapItem>
        ))}
        {displayMemberships.length > SHOW_MEMBERSHIPS && (
          <WrapItem>
            <MetaTag size="md" fontWeight="normal">
              {`+${
                (player.daohausMemberships?.length ?? 0) - SHOW_MEMBERSHIPS
              }`}
            </MetaTag>
          </WrapItem>
        )}
      </Wrap>
    </VStack>
  ) : null;
};
