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
      p={{ base: 10, sm: 6 }}
      flexDirection={'column'}
      backgroundImage={`url(${BackgroundImage})`}
      backgroundSize={'contain'}
      backgroundPosition={{ sm: 'top', xl: '70%' }}
      backgroundRepeat={'no-repeat'}
    >
      <Heading
        as="h1"
        size="4xl"
        fontFamily={'Exo 2'}
        pb={8}
        fontSize={{ base: '90px', sm: '39px', md: '67px' }}
      >
        Oops!
      </Heading>
      <Heading
        as="h2"
        fontFamily={'Exo 2'}
        pb={8}
        fontSize={{ base: '38px', sm: '20px', md: '31px' }}
      >
        We can't seem to find the page you're looking for.
      </Heading>
      <Box fontSize={{ base: '25px', sm: '16px' }}>
        Here are some good places to start exploring MetaGame, instead:
      </Box>
      <Flex direction="column">
        <Box pt={8}>
          <MetaButton
            width={{ sm: '100%', xl: '25%' }}
            onClick={() => router.push('/')}
          >
            Home
          </MetaButton>
        </Box>
        <Box pt={8}>
          <MetaButton
            width={{ sm: '100%', xl: '25%' }}
            onClick={() => router.push('/learn/wiki')}
          >
            Wiki
          </MetaButton>
        </Box>
        <Box pt={8}>
          <Link href="https://forum.metagame.wtf">
            <MetaButton width={{ sm: '100%', xl: '25%' }}>Forum</MetaButton>
          </Link>
        </Box>
        <Box pt={8}>
          <Link href="https://discord.gg/metagame">
            <MetaButton width={{ sm: '100%', xl: '25%' }}>Discord</MetaButton>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Custom404;
