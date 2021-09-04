import { Avatar, Badge, Flex, Stack, Text } from '@metafam/ds';
import { LoginButton } from 'components/LoginButton';
import { usePSeedBalance } from 'lib/hooks/balances';
import Image from 'next/image';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { useUser, useWeb3 } from '../lib/hooks';

// Display player XP and Seed
const PlayerStats = () => {
  const { isConnected } = useWeb3();
  const { user } = useUser();
  const { pSeedBalance } = usePSeedBalance();
  return (
    <Flex
      align="center"
      display={{ base: 'flex', lg: 'none' }}
      justifyContent={isConnected ? 'space-between' : 'center'}
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
      {isConnected && !!user?.player ? (
        <>
          <Flex pt={2} pr={2} pb={6} pl={2}>
            <Avatar
              name="alt text"
              src={getPlayerImage(user.player)}
              width="52px"
              height="52px"
            />
            <Stack fontFamily="exo" mt={2} mb={2} ml={2}>
              <Text
                fontSize={14}
                fontWeight="semibold"
                m={0}
                p={0}
                lineHeight={1}
              >
                {getPlayerName(user.player)}
              </Text>
              <Text fontSize={12} m={0} p={0} lineHeight={1}>
                {user.player.rank || ''}
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
              <Text color="#ffffff" fontFamily="exo" ml={2}>
                {user.player.total_xp}
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
              <Text color="#ffffff" fontFamily="exo" ml={2}>
                {pSeedBalance || 0}
              </Text>
            </Badge>
          </Flex>
        </>
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export const PlayerStatsBar: React.FC = () => <PlayerStats />;
