import { MetaTag } from '@metafam/ds';
import React from 'react';

type Props = { pronouns: string };

export const PlayerPronouns: React.FC<Props> = ({ pronouns }) => (
  <MetaTag size="md" fontWeight="normal" backgroundColor="gray.600">
    {pronouns}
  </MetaTag>
);
