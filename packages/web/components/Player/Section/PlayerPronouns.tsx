import { MetaTag } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = { player: PlayerFragmentFragment };

export const PlayerPronouns: React.FC<Props> = ({ player }) => (
  <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
    {player.pronouns}
  </MetaTag>
);
