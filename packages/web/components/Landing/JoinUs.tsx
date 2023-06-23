import {
  AbsoluteCenter,
  Box,
  Circle,
  Container,
  Divider,
  HStack,
  Text,
  VStack,
} from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-7.webp';
import { FullPageContainer } from 'components/Container';
import { StartButton } from 'components/Landing/StartButton';
import { MetaLink } from 'components/Link';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import Script from 'next/script';
import React, { useRef } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

import { LandingFooter } from './LandingFooter';
import { LandingPageSectionProps } from './landingSection';
import { Rain } from './OnboardingGame/Rain';

export const JoinUs: React.FC<LandingPageSectionProps> = ({ section }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const root = typeof window !== 'undefined' ? document.body : null;
  const noMotion = useMotionDetector(root);
  const displayElement = noMotion ? true : !!onScreen;

  return (
    <FullPageContainer
      id={section.internalLinkId}
      position="relative"
      justify="center"
    >
      <Container
        position="relative"
        display="flex"
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
          zIndex={100}
          transform={`translate3d(0, ${displayElement ? '0' : '50px'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            'transform 0.3s 0.5s ease-in-out, opacity 0.5s 0.7s ease-in'
          }
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
          <VStack flex={1} pb={2} mb={20} gap={5}>
            <Box>
              <Text
                fontSize={{ base: 'sm', md: '2xl' }}
                lineHeight={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
                fontWeight="700"
                mb={{ base: 1, lg: 3 }}
              >
                The revolution will be televized, <br />
                but{' '}
                <Text
                  as="span"
                  opacity={displayElement ? 1 : 0}
                  transition={noMotion ? 'none' : 'opacity 0.5s 0.9s ease-in'}
                >
                  don’t{' '}
                </Text>
                <Text
                  as="span"
                  opacity={displayElement ? 1 : 0}
                  transition={noMotion ? 'none' : 'opacity 0.5s 1.2s ease-in'}
                >
                  just{' '}
                </Text>
                <Text
                  as="span"
                  opacity={displayElement ? 1 : 0}
                  transition={noMotion ? 'none' : 'opacity 0.5s 1.5s ease-in'}
                >
                  watch
                </Text>
                <Text
                  as="span"
                  opacity={displayElement ? 1 : 0}
                  transition={noMotion ? 'none' : 'opacity 0.5s 1.8s ease-in'}
                >
                  .
                </Text>
              </Text>
              <StartButton text="Join" />
            </Box>
            <Box position="relative" padding={{ base: 2, md: 10 }}>
              <Divider
                borderColor="#FFFFFF50"
                width={{ base: '200px', md: '502px' }}
              />
              <AbsoluteCenter bg="#270E62">
                <Circle
                  size={{ base: 10, md: 50 }}
                  border="2px solid #FFFFFF16"
                >
                  <Text color="#77649C">OR</Text>
                </Circle>
              </AbsoluteCenter>
            </Box>
            <Box
              w="100%"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyItems="center"
            >
              <Text
                fontSize={{ base: 'md', md: '2xl' }}
                lineHeight={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
                fontWeight="700"
                mb={{ base: 3, lg: 8 }}
              >
                Stay in the loop
              </Text>
              <div id="custom-substack-embed" />
              {/* Load substack form */}
              <Script id="rendered-component">
                {`window.CustomSubstackWidget = {
                  substackUrl: "metagame.substack.com",
                  placeholder: "example@gmail.com",
                  buttonText: "Subscribe",
                  theme: "custom",
                  colors: {
                    primary: "#FF03FF",
                    input: "#2E0A67",
                    email: "#FF03FF",
                    text: "#000000",
                  }
                };
                `}
              </Script>
              <Script
                src="https://substackapi.com/widget.js"
                async
                id="render-component"
              />
            </Box>
          </VStack>
        </Box>
        <Box
          className="footer-content"
          color="landing500"
          fontSize={{ base: 'sm', '2xl': '2xl' }}
          textShadow="0 0 5px var(--chakra-colors-landing500)"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position={{ base: 'fixed', md: 'absolute' }}
          bottom={{ base: 0, md: 16, xl: 5, '2xl': 0, '4xl': 5 }}
          height="75px"
          maxH="75px"
          width="100%"
          maxW={{ base: '90%', md: 'lg', lg: 'xl' }}
          transform={`translate3d(0, ${displayElement ? '0' : '50px'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            'transform 0.3s 2.1s ease-in-out, opacity 0.5s 2.3s ease-in'
          }
          zIndex={100}
          sx={{
            pt: '1em',
            svg: {
              color: 'landing500',
              filter: 'drop-shadow(0 0 5px var(--chakra-colors-landing500))',
            },
          }}
        >
          <Text>&copy; {new Date().getFullYear()} MetaGame</Text>
          <HStack fontSize={{ base: 'lg', lg: '2xl' }} spacing={5}>
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
      <Box
        backgroundImage={BackgroundImage.src}
        backgroundBlendMode="normal"
        backgroundPosition={{ base: 'center', xl: 'center' }}
        backgroundSize={{ base: '170%', xl: 'cover' }}
        backgroundRepeat="no-repeat"
        minH="100vh"
        minW="100vw"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
      />
      <Rain effectOpacity={0.2} />
    </FullPageContainer>
  );
};
