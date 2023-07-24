import { Box, HStack, Tooltip, VStack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import React from 'react';
import {
  FaDiscord,
  FaGithub,
  FaHome,
  FaTrophy,
  FaTwitter,
  FaUserCircle,
} from 'react-icons/fa';

export const Socials: React.FC = () => (
  <HStack
    display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}
    justifyContent={'space-around'}
    flexDirection={'row'}
    sx={{
      opacity: 0.7,
      transition: 'opacity 0.2s 0.2s ease',
      '&:hover': { opacity: 0.8 },
      a: {
        color: 'white',
        fontSize: { base: 'md', lg: '2xl' },
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          filter: 'drop-shadow(0 0 30px #333)',
        },
      },
    }}
  >
    <MetaLink href="https://github.com/metafam" my={3} isExternal>
      <Tooltip label="Github" hasArrow placement="right">
        <Box as="span">
          <FaGithub />
        </Box>
      </Tooltip>
    </MetaLink>
    <MetaLink href="https://chat.metagame.wtf" isExternal>
      <Tooltip label="Discord" hasArrow placement="right">
        <Box as="span">
          <FaDiscord />
        </Box>
      </Tooltip>
    </MetaLink>
    <MetaLink href="https://twitter.com/metafam" isExternal>
      <Tooltip label="Twitter" hasArrow placement="right">
        <Box as="span">
          <FaTwitter />
        </Box>
      </Tooltip>
    </MetaLink>
    <MetaLink href="/players">
      <Tooltip label="Leaderboard" hasArrow placement="right">
        <Box as="span">
          <FaTrophy />
        </Box>
      </Tooltip>
    </MetaLink>
    <MetaLink href="/dashboard">
      <Tooltip label="Dashboard" hasArrow placement="right">
        <Box as="span">
          <FaHome />
        </Box>
      </Tooltip>
    </MetaLink>
    <MetaLink href="/me">
      <Tooltip label="Player Profile" hasArrow placement="right">
        <Box as="span">
          <FaUserCircle />
        </Box>
      </Tooltip>
    </MetaLink>
  </HStack>
);

export const SocialsDesktop: React.FC = () => (
  <Box
    display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
    className="metafam-socials"
    position="fixed"
    right={{ base: 5, md: 10, lg: 5 }}
    minW={5}
    height="100vh"
    minH="100vh"
    zIndex={400}
  >
    {/* {currentWaypoint !== 6 && ( */}
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      height="full"
      // opacity={currentWaypoint === 4 ? 0 : 1}
      transition="transform 0.3s 0.1s ease, opacity 0.3s 0.3s ease"
      // transform={`translate3d(${currentWaypoint === 4 ? -200 : 0}px, 0, 0)`}
    >
      <VStack
        spacing={3}
        minW={5}
        zIndex={400}
        flexFlow="column-reverse"
        sx={{
          opacity: 0.3,
          transition: 'opacity 0.2s 0.2s ease',
          '&:hover': { opacity: 0.8 },
          a: {
            color: 'white',
            fontSize: { base: 'md', lg: '2xl' },
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              filter: 'drop-shadow(0 0 30px #333)',
            },
          },
        }}
      >
        <MetaLink href="https://github.com/metafam" my={3} isExternal>
          <Tooltip label="Github" hasArrow placement="right">
            <Box as="span">
              <FaGithub />
            </Box>
          </Tooltip>
        </MetaLink>
        <MetaLink href="https://chat.metagame.wtf" isExternal>
          <Tooltip label="Discord" hasArrow placement="right">
            <Box as="span">
              <FaDiscord />
            </Box>
          </Tooltip>
        </MetaLink>
        <MetaLink href="https://twitter.com/metafam" isExternal>
          <Tooltip label="Twitter" hasArrow placement="right">
            <Box as="span">
              <FaTwitter />
            </Box>
          </Tooltip>
        </MetaLink>
        <MetaLink href="/players">
          <Tooltip label="Leaderboard" hasArrow placement="right">
            <Box as="span">
              <FaTrophy />
            </Box>
          </Tooltip>
        </MetaLink>
        <MetaLink href="/dashboard">
          <Tooltip label="Dashboard" hasArrow placement="right">
            <Box as="span">
              <FaHome />
            </Box>
          </Tooltip>
        </MetaLink>
        <MetaLink href="/me">
          <Tooltip label="Player Profile" hasArrow placement="right">
            <Box as="span">
              <FaUserCircle />
            </Box>
          </Tooltip>
        </MetaLink>
      </VStack>
    </Box>
  </Box>
);
