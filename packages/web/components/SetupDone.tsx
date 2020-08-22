import { MetaButton, MetaHeading } from '@metafam/ds';
import { useRouter } from 'next/router';
import React from 'react';

import { FlexContainer } from './Container';

export const SetupDone: React.FC = () => {
  const router = useRouter();
  return (
    <FlexContainer flex={1}>
      <MetaHeading mb={10}>Game on!</MetaHeading>
      <MetaButton onClick={() => router.push('/')}>Play</MetaButton>
    </FlexContainer>
  );
};
