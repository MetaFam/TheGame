/* eslint-disable import/no-extraneous-dependencies */
import { Box, Flex, Heading } from '@chakra-ui/react';
import { MetaButton } from '@metafam/ds';
import BackgroundImage from 'assets/404-bg.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Custom404: FC = () => {
  const router = useRouter();

  return (
    <Flex
      p={{ xl: 16, md: 16, base: 6 }}
      pt={{ base: '0%', md: '10%', lg: '10%', xl: '5%' }}
      flexDirection={'column'}
      backgroundImage={`url(${BackgroundImage})`}
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
      backgroundRepeat={'no-repeat'}
      minHeight={'inherit'}
    >
      <Heading
        as="h1"
        fontFamily={'Exo 2'}
        pb={8}
        fontSize={{ base: '39px', md: '67px' }}
      >
        Oops!
      </Heading>
      <Heading
        as="h2"
        fontFamily={'Exo 2'}
        pb={8}
        fontSize={{ base: '20px', md: '31px' }}
      >
        We can't seem to find the page you're looking for.
      </Heading>
      <Box fontSize={{ sm: '16px' }}>
        Here are some good places to start exploring MetaGame, instead:
      </Box>
      <Flex direction="column">
        <Box pt={8}>
          <MetaButton
            width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
            onClick={() => router.push('/')}
          >
            Home
          </MetaButton>
        </Box>
        <Box pt={8}>
          <MetaButton
            width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
            onClick={() => router.push('/learn/wiki')}
          >
            Wiki
          </MetaButton>
        </Box>
        <Box pt={8}>
          <Link href="https://forum.metagame.wtf">
            <MetaButton
              width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
            >
              Forum
            </MetaButton>
          </Link>
        </Box>
        <Box pt={8}>
          <Link href="https://discord.gg/metagame">
            <MetaButton
              width={{ base: '100%', md: '50%', lg: '25%', xl: '25%' }}
            >
              Discord
            </MetaButton>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Custom404;
