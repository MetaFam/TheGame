import { Flex, Image, SimpleGrid, Text } from '@metafam/ds';
import React, { useState } from 'react';

import { MetaLink } from '../components/Link';
import { RegisterPlayer } from '../components/RegisterPlayer';
import { WelcomePlayer } from '../components/WelcomePlayer';
import BackgroundImage from '../public/images/login-background.png';
import MetaGameImage from '../public/images/metagame.png';

const Login: React.FC = () => {
  const [step, setStep] = useState(0);
  return (
    <Flex
      backgroundSize="cover"
      backgroundImage={`url(${BackgroundImage})`}
      width="100vw"
      height="100vh"
      padding="3rem"
      flexDirection="column"
      alignItems="center"
    >
      <SimpleGrid columns={3} alignItems="center" width="100%">
        <MetaLink fontFamily="heading" href="" color="cyan.400">
          How to play MetaGame
        </MetaLink>
        <Flex justifyContent="center" alignItems="center">
          <Image src={MetaGameImage} />
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <Text fontFamily="heading" color="offwhite.50">
            Already a Player?{' '}
            <MetaLink fontFamily="heading" href="" color="cyan.400">
              Sign in
            </MetaLink>
          </Text>
        </Flex>
      </SimpleGrid>
      {step === 0 && (
        <WelcomePlayer
          next={() => {
            setStep(1);
          }}
        />
      )}
      {step === 1 && <RegisterPlayer />}
    </Flex>
  );
};

export default Login;
