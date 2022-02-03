import {
  Dashboard,
  Flex,
  HStack,
  Image,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Profile,
  Stack,
  Text,
  Tooltip,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import SeedMarket from 'assets/seed-icon.svg';
import XPStar from 'assets/xp-star.svg';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { useUser, useWeb3 } from 'lib/hooks';
import { usePSeedBalance } from 'lib/hooks/balances';
import React from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

const { amountToDecimal } = numbers;

// Display player XP and Seed
export const PlayerStatsBar = () => {
  const { disconnect } = useWeb3();
  const { user } = useUser();
  const { player } = user ?? {};
  const { pSeedBalance } = usePSeedBalance();

  return (
    <Flex
      align="center"
      display={{ base: 'flex', lg: 'none' }}
      pos="fixed"
      left={0}
      bottom={0}
      justify={player ? 'space-between' : 'center'}
      w="100%"
      h="5rem"
      bg="rgba(0,0,0,0.75)"
      borderColor="#2B2244"
      px="1rem"
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      {!player ? (
        <LoginButton />
      ) : (
        <>
          <Menu>
            <MenuButton
              bg="transparent"
              aria-label="menu options"
              _focus={{ outline: 'none', bg: 'transparent' }}
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
            >
              <Flex>
                <PlayerAvatar {...{ player }} w={12} h={12} m={0} />
                <Stack my={2} ml={2} justify="center">
                  <Text
                    fontSize={player.rank ? 14 : 22}
                    fontWeight="semibold"
                    m={0}
                    p={0}
                    lineHeight={1}
                  >
                    {getPlayerName(player)}
                  </Text>
                  {player.rank && (
                    <Text fontSize={12} m={0} p={0} lineHeight={1}>
                      {player.rank}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </MenuButton>
            <MenuList color="black">
              <MetaLink
                color="black"
                href={getPlayerURL(player) ?? '/'}
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
          <HStack height="100%" justify="flex-end" px="0.5rem">
            <Tooltip label="Total XP" hasArrow>
              <HStack
                bg="rgba(0,0,0,0.25)"
                border="1px solid #2B2244"
                borderRadius="full"
                px="0.75rem"
                minW="fit-content"
              >
                <Image
                  src={XPStar}
                  alignSelf="center"
                  alt="XP"
                  boxSize="1.5rem"
                />
                <Text color="#FFF" lineHeight={2} fontSize={20}>
                  {Math.trunc(player.totalXP).toLocaleString()}
                </Text>
              </HStack>
            </Tooltip>
            <Tooltip label="pSEEDs" hasArrow>
              <HStack
                bg="rgba(0,0,0,0.25)"
                border="1px solid #2B2244"
                borderRadius="full"
                px="0.75rem"
                minW="fit-content"
              >
                <Image
                  src={SeedMarket}
                  alignSelf="center"
                  alt="Seed"
                  boxSize="1.5rem"
                />
                <Text color="#FFF" lineHeight={2} fontSize={20}>
                  {parseInt(
                    amountToDecimal(pSeedBalance || '0', 18),
                    10,
                  ).toLocaleString()}
                </Text>
              </HStack>
            </Tooltip>
          </HStack>
        </>
      )}
    </Flex>
  );
};
