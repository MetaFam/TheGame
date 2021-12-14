import { MetaTag } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useAnimation } from 'lib/hooks/players';
import React, { useState } from 'react';

import { PlayerHeroTile } from './PlayerHeroTile';

type Props = { person: PlayerFragmentFragment | null | undefined };

export const PlayerPronouns: React.FC<Props> = ({ person }) => {
  const [pronouns, setPronouns] = useState<string>('');
  const updateFN = () => {
    setPronouns(person?.pronouns || '');
  };
  const { animation } = useAnimation(person?.pronouns, updateFN);

  return pronouns ? (
    <PlayerHeroTile title="Personal pronouns">
      <FlexContainer
        align="stretch"
        transition=" opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
          {pronouns}
        </MetaTag>
      </FlexContainer>
    </PlayerHeroTile>
  ) : (
    <></>
  );
};
