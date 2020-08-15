import { Image, MetaButton, MetaHeading, Text } from '@metafam/ds';
import NextLink from 'next/link';
import React from 'react';

import AvatarImage from '../public/images/avatar.png';
import { FlexContainer } from './Container';
import { MetaLink } from './Link';

export const SuccessPlayer: React.FC = () => {
  return (
    <FlexContainer h="100%">
      <MetaHeading m={5}>Success!</MetaHeading>
      <Image m={10} src={AvatarImage} />
      <NextLink href="/profile/setup">
        <MetaButton mt={5} mb={8}>
          Set up your profile
        </MetaButton>
      </NextLink>
      <Text fontFamily="mono" color="offwhite">
        {`I'll do this later. `}
        <MetaLink href="">Go to my profile</MetaLink>
      </Text>
    </FlexContainer>
  );
};
