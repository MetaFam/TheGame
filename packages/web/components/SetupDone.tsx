import { MetaButton, MetaHeading } from '@metafam/ds';
import NextLink from 'next/link';
import React from 'react';

import { FlexContainer } from './Container';

export const SetupDone: React.FC = () => {
  return (
    <FlexContainer flex={1}>
      <MetaHeading mb={10}>Game on!</MetaHeading>
      <NextLink href="/">
        <MetaButton>Play</MetaButton>
      </NextLink>
    </FlexContainer>
  );
};
