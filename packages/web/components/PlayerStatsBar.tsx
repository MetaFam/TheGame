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
  Tooltip,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import SeedMarket from 'assets/seed-icon.svg';
import XPStar from 'assets/xp-star.svg';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { useUser, useWeb3 } from 'lib/hooks';
import { usePSeedBalance } from 'lib/hooks/balances';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

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
          <Flex py={1} px={2}>
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
                  w={12}
                  h={12}
                  m={0}
                />
              </MenuButton>
              <MenuList color="black">
                <MetaLink
                  color="black"
                  href={`/player/${user.player.username}`}
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
            <Stack my={2} ml={2} justify="center">
              <Text
                fontSize={user.player.rank ? 14 : 22}
                fontWeight="semibold"
                m={0}
                p={0}
                lineHeight={1}
              >
                {getPlayerName(user.player)}
              </Text>
              {user.player.rank && (
                <Text fontSize={12} m={0} p={0} lineHeight={1}>
                  {user.player.rank}
                </Text>
              )}
            </Stack>
          </Flex>
          <Flex
            mr={2}
            mt={2}
            flexWrap="wrap"
            height="100%"
            alignSelf="baseline"
            justifyContent="flex-end"
          >
            <Tooltip label="Total XP" hasArrow>
              <Badge
                display="flex"
                minH="fill"
                minW="fit-content"
                py={2}
                px={4}
                mb={2}
                bg="rgba(0,0,0,0.25)"
                border="1px solid #2B2244"
                borderRadius={50}
              >
                <Image
                  src={XPStar}
                  alignSelf="center"
                  alt="XP"
                  h={7}
                  w={7}
                  mr={3}
                />
                <Text color="#FFF" lineHeight={2} fontSize={20}>
                  {Math.trunc(user.player.totalXP)}
                </Text>
              </Badge>
            </Tooltip>
            <Tooltip label="pSEEDs" hasArrow>
              <Badge
                display="flex"
                minH="fill"
                minW="fit-content"
                py={2}
                px={4}
                mx={2}
                mb={2}
                bg="rgba(0,0,0,0.25)"
                border="1px solid #2B2244"
                borderRadius={50}
                alignSelf="center"
              >
                <Image
                  src={SeedMarket}
                  alignSelf="center"
                  alt="Seed"
                  h={7}
                  w={6}
                  mr={3}
                />
                <Text color="#FFF" lineHeight={2} fontSize={20}>
                  {parseInt(amountToDecimal(pSeedBalance || '0', 18), 10)}
                </Text>
              </Badge>
            </Tooltip>
          </Flex>
        </>
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export const PlayerStatsBar: React.FC = () => <PlayerStats />;
