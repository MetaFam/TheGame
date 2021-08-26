import { Avatar, Badge, Flex, Stack, Text } from '@metafam/ds';
import Image from 'next/image';
import React from 'react';

import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';

// Display player XP and Seed -- not working yet
const PlayerStats = () => (
  <Flex
    align="center"
    display={{ base: 'flex', lg: 'none' }}
    justifyContent="space-between"
    flex="1"
    minW="100vw"
    bg="rgba(0,0,0,0.75)"
    borderColor="#2B2244"
    sx={{ backdropFilter: 'blur(10px)' }}
    position="fixed"
    bottom="0"
    zIndex="2"
    boxSizing="border-box"
    mt="auto"
    mr="0"
    mb="auto"
  >
    <Flex pt={2} pr={2} pb={6} pl={2}>
      <Avatar
        name="alt text"
        src="https://bit.ly/tioluwani-kolawole"
        width="52px"
        height="52px"
      />
      <Stack fontFamily="exo" mt={2} mb={2} ml={2}>
        <Text fontSize={14} fontWeight="semibold" m={0} p={0} lineHeight={1}>
          Name
        </Text>
        <Text fontSize={12} m={0} p={0} lineHeight={1}>
          Rank
        </Text>
      </Stack>
    </Flex>
    <Flex pb={6} mr={2}>
      <Badge
        display="flex"
        minH="fill"
        minW="fit-content"
        pt={2}
        pr={4}
        pb={2}
        pl={4}
        bg="rgba(0,0,0,0.25)"
        border="1px solid #2B2244"
        borderRadius={50}
        borderRight="1px solid #2B2244"
        borderLeft="1px solid #2B2244"
        mr={2}
      >
        <Image src={XPStar} alt="XP" height={14} width={14} />{' '}
        <Text color="#ffffff" fontSamily="exo" ml={2}>
          N
        </Text>
      </Badge>
      <Badge
        display="flex"
        minH="100%"
        minW="fit-content"
        pt={2}
        pr={4}
        pb={2}
        pl={4}
        bg="rgba(0,0,0,0.25)"
        border="1px solid #2B2244"
        borderRadius={50}
      >
        <Image src={SeedMarket} alt="Seed" height={14} width={14} />{' '}
        <Text color="#ffffff" fontSamily="exo" ml={2}>
          N
        </Text>
      </Badge>
    </Flex>
  </Flex>
);

export const PlayerStatsBar: React.FC = () => <PlayerStats />;
