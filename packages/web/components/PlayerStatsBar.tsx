import {
  Avatar,
  Badge,
  Dashboard,
  Flex,
  Image,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Profile,
  Stack,
  Text,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { usePSeedBalance } from 'lib/hooks/balances';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { useUser, useWeb3 } from '../lib/hooks';

const { amountToDecimal } = numbers;

// Display player XP and Seed
const PlayerStats = () => {
  const { connected, disconnect } = useWeb3();
  const { user } = useUser();
  const { pSeedBalance } = usePSeedBalance();
  return (
    <Flex
      align="center"
      display={{ base: 'flex', lg: 'none' }}
      justifyContent={connected ? 'space-between' : 'center'}
      flex={1}
      minW="100vw"
      height="72px"
      bg="rgba(0,0,0,0.75)"
      borderColor="#2B2244"
      sx={{ backdropFilter: 'blur(10px)' }}
      position="fixed"
      bottom={0}
      zIndex={200}
      boxSizing="border-box"
      my="auto"
      mr={0}
    >
      {connected && !!user?.player ? (
        <>
          <Flex py="10px" px={2}>
            <Menu strategy="fixed" offset={[-7, 9]}>
              <MenuButton
                bg="transparent"
                aria-label="Options"
                _focus={{ outline: 'none', bg: 'transparent' }}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              >
                <Avatar
                  name={getPlayerName(user.player)}
                  src={getPlayerImage(user.player)}
                  w="52px"
                  h="52px"
                />
              </MenuButton>
              <MenuList color="black">
                <MetaLink
                  color="black"
                  href={`/player/${getPlayerName(user.player)}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <MenuItem>
                    <Profile w={4} h={4} mr={4} /> View Profile
                  </MenuItem>
                </MetaLink>
                <MetaLink
                  color="black"
                  href={'/dashboard'}
                  _hover={{ textDecoration: 'none' }}
                >
                  <MenuItem>
                    <Dashboard w={4} h={4} mr={4} color="red.500" />
                    Dashboard
                  </MenuItem>
                </MetaLink>
                <MenuItem onClick={disconnect}>
                  <LogOut w={4} h={4} mr={4} />
                  Disconnect
                </MenuItem>
              </MenuList>
            </Menu>
            <Stack my={2} ml={2}>
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
          <Flex mr={2} mt={2} justifyContent="flex-end">
            <Badge
              display="flex"
              minH="fill"
              minW="fit-content"
              py={2}
              px={4}
              bg="rgba(0,0,0,0.25)"
              border="1px solid #2B2244"
              borderRadius={50}
              borderRight="1px solid #2B2244"
              borderLeft="1px solid #2B2244"
              mb={2}
            >
              <Image src={XPStar} alt="XP" h="14px" w="14px" mr={3} />
              <Text color="#ffffff" ml={2}>
                {Math.trunc(user.player.totalXP * 100) / 100}
              </Text>
            </Badge>
            <Badge
              display="flex"
              minH="100%"
              minW="fit-content"
              py={2}
              px={4}
              bg="rgba(0,0,0,0.25)"
              border="1px solid #2B2244"
              borderRadius={50}
              ml={2}
              mb={2}
            >
              <Image src={SeedMarket} alt="Seed" h="14px" w="14px" mr={3} />
              <Text color="#ffffff" ml={2}>
                {parseInt(amountToDecimal(pSeedBalance || '0', 18), 10)}
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
