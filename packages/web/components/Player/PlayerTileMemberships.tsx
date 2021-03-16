import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_MEMBERSHIPS = 4;

export const PlayerTileMemberships: React.FC<Props> = ({ player }) => {
  return (
    <Wrap>
      {player.daohausMemberships.slice(0, SHOW_MEMBERSHIPS).map((member) => (
        <WrapItem key={member.id}>
          <MetaTag size="md" fontWeight="normal">
            {member.moloch.title}
          </MetaTag>
        </WrapItem>
      ))}
      {player.daohausMemberships.length > SHOW_MEMBERSHIPS && (
        <WrapItem>
          <MetaTag size="md" fontWeight="normal">
            {`+${player.daohausMemberships.length - SHOW_MEMBERSHIPS}`}
          </MetaTag>
        </WrapItem>
      )}
    </Wrap>
  );
};
