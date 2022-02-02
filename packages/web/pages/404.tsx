import {
  Box,
  BoxedNextImage,
  Flex,
  Heading,
  MetaSecondaryButton,
  Stack,
  useMediaQuery,
} from '@metafam/ds';
import BackgroundImage from 'assets/404-bg.svg';
import LogoImage from 'assets/logo.png';
import { useWeb3 } from 'lib/hooks';
import React from 'react';

const Custom404: React.FC = () => {
  const { connected } = useWeb3();
  const [short] = useMediaQuery('(max-height: 18rem) and (min-width: 40rem)');

  return (
    <Flex backgroundColor="#1B0D29">
      <Flex
        w="full"
        h="100%"
        p={{ base: 6, md: 16 }}
        pt={{
          base: 'max(0, min(20%, 100vh - 14rem))',
          md: 'max(0, min(3%, 100vh - 18rem))',
        }}
        pb={0}
        direction={short ? 'row' : 'column'}
        backgroundImage={`url(${BackgroundImage})`}
        backgroundSize="100%"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        minHeight="inherit"
        justifyContent={{
          base: 'flex-end',
          lg: 'flex-start',
        }}
      >
        <Stack mt={[0, 20]}>
          <Flex direction={['column', 'row']}>
            <BoxedNextImage
              mb={{ base: 8 }}
              mr={5}
              w={['full', '6rem']}
              h="6rem"
              src={LogoImage}
              alt="Avatar"
              justify="center"
            />
            <Stack>
              <Heading
                as="h1"
                fontFamily={'Exo 2'}
                pb={2}
                fontSize="max(10vmin, 2rem)"
              >
                Oops!
              </Heading>
              <Heading as="h2" fontFamily={'Exo 2'} fontSize="max(3vmin, 1rem)">
                We can't seem to find the page you're looking for.
              </Heading>
            </Stack>
          </Flex>
          <Box fontSize="max(3.5vmin, 0.75rem)">
            Here are some good places to start exploring MetaGame, instead:
          </Box>
        </Stack>
        <Flex direction="column" mx={10}>
          <MetaSecondaryButton
            as="a"
            mt={5}
            width={{ base: '100%', md: '50vw', lg: '25vw' }}
            href={connected ? '/dashboard' : '/community/players'}
          >
            Home
          </MetaSecondaryButton>
          <MetaSecondaryButton
            as="a"
            mt={5}
            width={{ base: '100%', md: '50vw', lg: '25vw' }}
            href="/learn/wiki"
          >
            Wiki
          </MetaSecondaryButton>
          <MetaSecondaryButton
            as="a"
            mt={5}
            width={{ base: '100%', md: '50vw', lg: '25vw' }}
            href="https://forum.metagame.wtf"
          >
            Forum
          </MetaSecondaryButton>
          <MetaSecondaryButton
            as="a"
            mt={5}
            width={{ base: '100%', md: '50vw', lg: '25vw' }}
            href="https://discord.gg/metagame"
          >
            Discord
          </MetaSecondaryButton>
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
