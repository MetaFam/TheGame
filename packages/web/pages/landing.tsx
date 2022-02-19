import { Box, BoxedNextImage, Button, Flex, HStack, Link } from '@metafam/ds';
import LogoNew from 'assets/logo-new.png';
import { Build } from 'components/Landing/sections/Build';
import { Cards } from 'components/Landing/sections/Cards';
import { Frontier } from 'components/Landing/sections/Frontier';
import { Game } from 'components/Landing/sections/Game';
import { Intro } from 'components/Landing/sections/Intro';
import { JustWatch } from 'components/Landing/sections/JustWatch';
import { Optimal } from 'components/Landing/sections/Optimal';
import { Revolution } from 'components/Landing/sections/Revolution';
import { Together } from 'components/Landing/sections/Together';
import { Unplug } from 'components/Landing/sections/Unplug';
import { WhatWeDo } from 'components/Landing/sections/WhatWeDo';
import { Who } from 'components/Landing/sections/Who';
import { WildWeb } from 'components/Landing/sections/WildWeb';
import React, { ReactNode, useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});
const Landing: React.FC = () => (
  <>
    <LandingHeader />
    <Box>
      <Intro />
      <Game />
      <Build />
      <Revolution />
      <WildWeb />
      <Frontier />
      <Together />
      <WhatWeDo />
      <Optimal />
      <Unplug />
      <Who />
      <Cards />
      <JustWatch />
    </Box>
  </>
);
export default Landing;

const NavLink = ({
  children,
  target,
}: {
  children: ReactNode;
  target: string;
}) => (
  <Link
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
    }}
    href={`#${target}`}
    sx={{
      transition: 'background 0.3s ease-in',
      '&.active, &:hover': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    }}
  >
    {children}
  </Link>
);

export const LandingHeader = () => {
  const [isActive, setIsActive] = useState();

  return (
    <Box
      as="header"
      pos="fixed"
      textAlign="center"
      w="full"
      top={0}
      bgColor="dark"
      zIndex={200}
      sx={{
        backgroundColor: 'dark',
        backdropFilter: 'blur(7px)',
        '.border-grad': {
          border: '1px double transparent',
          background: 'transparent',
          backgroundImage:
            'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'border-box',
          WebkitBackgroundOrigin: 'border-box',
          boxSizing: 'border-box',
          '& > span': {
            background:
              'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease',
          },
          '&:hover': {
            backgroundImage:
              'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
            backgroundSize: '130%',
            '& > span': {
              background:
                'linear-gradient(-90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      }}
    >
      <Flex
        h={14}
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        w="8xl"
      >
        <HStack spacing={8} alignItems="center">
          <HStack
            fontFamily="body"
            fontSize="md"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <BoxedNextImage
              src={LogoNew}
              alt="MetaGame Logo"
              width="35px"
              height="39px"
            />
            <Box as="span">MetaGame</Box>
          </HStack>
        </HStack>
        <HStack as="nav" alignItems="center" fontSize="xs">
          <NavLink key={'link-home'} target="home">
            Home
          </NavLink>
          <NavLink key={'link-about'} target="about">
            About
          </NavLink>
          <NavLink key={'link-mission'} target="mission">
            Mission
          </NavLink>
          <NavLink key={'link-whatdo'} target="whatdo">
            What we do?
          </NavLink>
        </HStack>
        <HStack alignItems="center">
          <Button className="border-grad" rounded="md" size="md" px={10}>
            <Box as="span">Join</Box>
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
