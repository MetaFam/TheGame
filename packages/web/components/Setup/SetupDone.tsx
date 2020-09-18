import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useRouter } from 'next/router';
import React from 'react';

export const SetupDone: React.FC = () => {
  const router = useRouter();
  return (
    <FlexContainer flex={1}>
      <MetaHeading mb={10}>Game on!</MetaHeading>
      <MetaButton onClick={() => router.push('/')}>Play</MetaButton>
    </FlexContainer>
  );
};
