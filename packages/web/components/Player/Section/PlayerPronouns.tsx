import { MetaTag } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { Player } from 'graphql/autogen/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';

type Props = { person: Player | null | undefined };

export const PlayerPronouns: React.FC<Props> = ({ person }) => {
  const [pronouns, setPronouns] = useState<string>(
    person?.profile?.pronouns ?? '',
  );
  const updateFN = () => {
    setPronouns(person?.profile?.pronouns ?? '');
  };
  const { animation } = useAnimateProfileChanges(
    person?.profile?.pronouns,
    updateFN,
  );

  return pronouns ? (
    <PlayerHeroTile title="Personal Pronouns">
      <FlexContainer
        direction="row"
        justify="flex-start"
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
