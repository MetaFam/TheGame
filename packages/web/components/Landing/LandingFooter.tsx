import { BoxedNextImage, Flex, HStack } from '@metafam/ds';
import MetaGameLogo from 'assets/logo.webp';
import { MetaLink } from 'components/Link';
import React from 'react';

export const LandingFooter: React.FC = () => (
  <Flex
    as="footer"
    w="33%"
    flexFlow="row nowrap"
    position="absolute"
    justify="center"
    bottom={{ base: 20, md: '10vh', xl: '15vh', '2xl': '18vh', '3xl': '12vh' }}
    left="33%"
    transition="opacity 0.3s 0.3s ease"
    zIndex={100}
  >
    <HStack spacing={8} alignItems="center">
      <MetaLink
        href="#start"
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            filter: 'drop-shadow(0 0 20px #79F8FB)',
          },
        }}
      >
        <HStack
          fontFamily="body"
          fontSize={{ base: 'sm', lg: 'md' }}
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <BoxedNextImage
            src={MetaGameLogo}
            alt="MetaGame Logo"
            width="35px"
            height="39px"
          />
        </HStack>
      </MetaLink>
    </HStack>
  </Flex>
);
