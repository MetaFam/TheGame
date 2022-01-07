import { MetaTag } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';

type Props = { person: PlayerFragmentFragment | null | undefined };

export const PlayerPronouns: React.FC<Props> = ({ person }) => {
  const [pronouns, setPronouns] = useState<string>('');
  const updateFN = () => {
    setPronouns(person?.pronouns || '');
  };
  const { animation } = useAnimateProfileChanges(person?.pronouns, updateFN);

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
