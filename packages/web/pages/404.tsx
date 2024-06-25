import {
  Box,
  BoxedNextImage,
  Flex,
  Heading,
  MetaSecondaryButton,
} from '@metafam/ds';
import BackgroundImage from 'assets/404-bg.svg';
import LogoImage from 'assets/new_logo_svg.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { useWeb3 } from '../lib/hooks';

const Custom404: FC = () => {
  const router = useRouter();
  const { connected } = useWeb3();

  return (
    <Flex>
      <BoxedNextImage
        pos={{ base: 'relative', xl: 'absolute' }}
        mb={{ base: 16 }}
        m={{ xl: 5 }}
        w="2.5rem"
        h="2.5rem"
        src={LogoImage}
        alt="Avatar"
        display={{ base: 'none', xl: 'block' }}
      />
      <Flex
        w="100%"
        h="100vh"
        p={{ xl: 16, md: 16, base: 6 }}
        pt={{ base: '30%', md: '10%', lg: '10%', xl: '10%' }}
        direction="column"
        backgroundImage={`url(${BackgroundImage.src})`}
        backgroundSize={{
          base: '700px',
          md: '1000px',
          lg: '1150px',
          xl: '1100px',
          '2xl': '1500px',
        }}
        backgroundPosition={{
          base: '75% -30%',
          md: '85% -50%',
          lg: '85% 70%',
          xl: '70% 65%',
        }}
        backgroundRepeat="no-repeat"
        minHeight="inherit"
        justifyContent={{
          base: 'flex-end',
          sm: 'flex-end',
          md: 'flex-end',
          lg: 'flex-start',
          xl: 'flex-start',
        }}
      >
        <BoxedNextImage
          mb={{ base: 8 }}
          w="3rem"
          h="3rem"
          src={LogoImage.src}
          alt="Avatar"
          display={{ base: 'table', xl: 'none' }}
        />
        <Heading
          as="h1"
          fontFamily="Exo 2"
          pb={2}
          fontSize={{ base: '39px', md: '67px' }}
        >
          Oops!
        </Heading>
        <Heading
          as="h2"
          fontFamily="Exo 2"
          pb={6}
          fontSize={{ base: '20px', md: '31px' }}
        >
          We can't seem to find the page you're looking for.
        </Heading>
        <Box fontSize={{ sm: '16px' }}>
          Here are some good places to start exploring MetaGame, instead:
        </Box>
        <Flex direction="column">
          <Box pt={5}>
            <MetaSecondaryButton
              width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
              onClick={() => router.push(connected ? '/dashboard' : '/')}
            >
              {connected ? 'Dashboard' : 'Home'}
            </MetaSecondaryButton>
          </Box>
          <Box pt={5}>
            <MetaSecondaryButton
              width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
              onClick={() => router.push('/academy')}
            >
              dAcademy
            </MetaSecondaryButton>
          </Box>
          <Box pt={5}>
            <Link href="https://chat.metagame.wtf">
              <MetaSecondaryButton
                width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
              >
                Discord
              </MetaSecondaryButton>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export default Custom404;
