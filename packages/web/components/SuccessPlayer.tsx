import { Image, MetaButton, MetaHeading, Text } from '@metafam/ds';
import AvatarImage from 'assets/avatar.png';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useRouter } from 'next/router';
import React from 'react';

export const SuccessPlayer: React.FC = () => {
  const router = useRouter();
  return (
    <FlexContainer my="auto">
      <MetaHeading m={5}>Success!</MetaHeading>
      <Image m={10} src={AvatarImage} alt="Avatar" w="3.5rem" />
      <MetaButton mt={5} mb={8} onClick={() => router.push('/profile/setup')}>
        Set up your profile
      </MetaButton>
      <Text color="offwhite">
        {"I'll do this later. "}
        <MetaLink href="">Go to my profile</MetaLink>
      </Text>
    </FlexContainer>
  );
};
