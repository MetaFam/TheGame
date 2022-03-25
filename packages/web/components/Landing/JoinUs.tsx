import { Box, Button, Container, HStack, Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-6.png';
import { FullPageContainer } from 'components/Container';
import { StartButton } from 'components/Landing/StartButton';
import { MetaLink } from 'components/Link';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

import { LandingFooter } from './LandingFooter';

export const JoinUs: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'join-us';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      backgroundRepeat="no-repeat"
      backgroundSize={{ base: '170%', lg: 'contain' }}
      backgroundPosition="center"
      id={section}
      position="relative"
      justify={{ base: 'center' }}
    >
      <Container
        position="relative"
        d="flex"
        maxW={{ base: '100%', md: '7xl' }}
        flexFlow="column"
        maxH="60%"
        height="55%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          color="landing500"
          textShadow="0 0 5px var(--chakra-colors-landing500)"
          flexDirection="column"
          justifyContent="center"
          maxWidth={{ base: '66%', md: 'md', '2xl': '2xl' }}
          pl={{ base: 0, md: 0 }}
          textAlign="center"
          zIndex={1}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.5s ease-in-out, opacity 0.5s 0.7s ease-in"
          sx={{
            '.screen-esque': {
              background: 'landing150',
              border: '1px solid #6916DA',
              color: 'landing500',
              textShadow: '0 0 5px var(--chakra-colors-landing500)',
              '&--alt': {
                background: 'rgba(66, 4, 150, 0.29)',
                border: '1px solid #6916DA',
                color: 'landing500',
                textShadow: '0 0 5px var(--chakra-colors-landing500)',
              },
            },
          }}
        >
          <VStack flex={1}>
            <Text
              fontSize={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
              lineHeight={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
              fontWeight="700"
              mb={{ base: 3, lg: 8 }}
            >
              The revolution will be televized, <br />
              but{' '}
              <Text
                as="span"
                opacity={onScreen ? 1 : 0}
                transition="opacity 0.5s 0.9s ease-in"
              >
                don’t{' '}
              </Text>
              <Text
                as="span"
                opacity={onScreen ? 1 : 0}
                transition="opacity 0.5s 1.2s ease-in"
              >
                just{' '}
              </Text>
              <Text
                as="span"
                opacity={onScreen ? 1 : 0}
                transition="opacity 0.5s 1.5s ease-in"
              >
                watch
              </Text>
              <Text
                as="span"
                opacity={onScreen ? 1 : 0}
                transition="opacity 0.5s 1.8s ease-in"
              >
                .
              </Text>
            </Text>
            <HStack
              opacity={onScreen ? 1 : 0}
              transition="transform 0.3s 1.8s ease-in-out, opacity 0.5s 2s ease-in"
            >
              <MetaLink _hover={{}} href="/dashboard">
                <Button
                  className="screen-esque--alt"
                  colorScheme="white"
                  size="lg"
                  minW="7rem"
                >
                  Watch
                </Button>
              </MetaLink>
              <StartButton text="Join" />
            </HStack>
          </VStack>
        </Box>
        <Box
          className="footer-content"
          color="landing500"
          fontSize={{ base: 'lg', lg: '2xl' }}
          textShadow="0 0 5px var(--chakra-colors-landing500)"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          position={{ base: 'fixed', lg: 'absolute' }}
          bottom={{ base: 0, lg: 0, xl: 0, '2xl': 0 }}
          height="75px"
          maxH="75px"
          width="100%"
          maxW={{ base: '90%', md: 'md', '2xl': '2xl' }}
          transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 2.1s ease-in-out, opacity 0.5s 2.3s ease-in"
          sx={{
            svg: {
              color: 'landing500',
              filter: 'drop-shadow(0 0 5px var(--chakra-colors-landing500))',
            },
          }}
        >
          <Text>&copy; 2022 MetaGame</Text>
          <HStack>
            <MetaLink href="https://github.com/metafam" isExternal>
              <FaGithub />
            </MetaLink>
            <MetaLink href="https://discord.com/invite/metagame" isExternal>
              <FaDiscord />
            </MetaLink>
            <MetaLink href="https://twitter.com/metafam" isExternal>
              <FaTwitter />
            </MetaLink>
          </HStack>
        </Box>
      </Container>
      <LandingFooter />
    </FullPageContainer>
  );
};
