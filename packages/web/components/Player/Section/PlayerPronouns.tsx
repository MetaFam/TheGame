import { MetaTag } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useAnimation } from 'lib/hooks/players';
import React from 'react';

type Props = { pronouns: string };

export const PlayerPronouns: React.FC<Props> = ({ pronouns }) => {
  const { animation } = useAnimation('fadeOut', 'fadeIn', 400, pronouns);

  return (
    <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
      <FlexContainer
        align="stretch"
        transition=" opacity 0.4s"
        opacity={animation === 'fadeIn' ? 1 : 0}
      >
        {pronouns}
      </FlexContainer>
    </MetaTag>
  );
};
