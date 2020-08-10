import { Flex, Image, SimpleGrid, Text } from '@metafam/ds';
import React, { useState } from 'react';

import { PageContainer } from '../components/Container';
import { MetaLink } from '../components/Link';
import { RegisterPlayer } from '../components/RegisterPlayer';
import { WelcomePlayer } from '../components/WelcomePlayer';
import BackgroundImage from '../public/images/login-background.jpg';
import MetaGameImage from '../public/images/metagame.png';

const Login: React.FC = () => {
  const [step, setStep] = useState(0);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <SimpleGrid
        columns={3}
        alignItems="center"
        width="100%"
        fontFamily="mono"
      >
        <MetaLink href="">How to play MetaGame</MetaLink>
        <Flex justify="center" align="center">
          <Image src={MetaGameImage} />
        </Flex>
        <Flex align="center" justify="flex-end">
          <Text color="offwhite">
            Already a Player? <MetaLink href="">Sign in</MetaLink>
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
    </PageContainer>
  );
};

export default Login;
