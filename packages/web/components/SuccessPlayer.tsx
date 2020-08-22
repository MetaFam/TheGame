import { Image, MetaButton, MetaHeading, Text } from '@metafam/ds';
import { useRouter } from 'next/router';
import React from 'react';

import AvatarImage from '../public/images/avatar.png';
import { FlexContainer } from './Container';
import { MetaLink } from './Link';

export const SuccessPlayer: React.FC = () => {
  const router = useRouter();
  return (
    <FlexContainer h="100%">
      <MetaHeading m={5}>Success!</MetaHeading>
      <Image m={10} src={AvatarImage} />
      <MetaButton mt={5} mb={8} onClick={() => router.push('/profile/setup')}>
        Set up your profile
      </MetaButton>
      <Text fontFamily="mono" color="offwhite">
        {`I'll do this later. `}
        <MetaLink href="">Go to my profile</MetaLink>
      </Text>
    </FlexContainer>
  );
};
