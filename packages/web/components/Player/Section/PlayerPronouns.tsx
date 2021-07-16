import { MetaTag } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type PlayerPronounsProps = {
  player: PlayerFragmentFragment;
};

export const PlayerPronouns = ({ player }: PlayerPronounsProps) => (
  <>
    {player.pronouns && (
      <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
        {player.pronouns}
      </MetaTag>
    )}
  </>
);
