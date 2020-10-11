import { Button, ButtonGroup, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useRouter } from 'next/router';
import React from 'react';

import { useWeb3 } from '../../lib/hooks';

export const RegisterPlayer: React.FC = () => {
  return (
    <FlexContainer flex={1}>
      <MetaHeading m={5}>Register your Player account</MetaHeading>
      <ButtonGroup spacing={5} mt={20}>
        <RegisterButton>Connect Wallet</RegisterButton>
      </ButtonGroup>
    </FlexContainer>
  );
};

type ButtonProps = React.ComponentProps<typeof Button>;

const RegisterButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { connectWeb3 } = useWeb3();
  const router = useRouter();
  const login = async () => {
    await connectWeb3();
    router.push('/profile/success');
  };
  return (
    <Button
      onClick={login}
      variant="outline"
      size="lg"
      p={8}
      alignItems="center"
      {...props}
    >
      {children}
    </Button>
  );
};
