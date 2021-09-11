import {
  Avatar,
  Badge,
  ChevronUpIcon,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { usePSeedBalance } from 'lib/hooks/balances';
import React from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { useUser, useWeb3 } from '../lib/hooks';

// Display player XP and Seed
const PlayerStats = () => {
  const { isConnected, disconnect } = useWeb3();
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
          <Flex pt={2} pb={6} px={2}>
            <MetaLink href="/profile/setup/username">
              <Avatar
                name={getPlayerName(user.player)}
                src={getPlayerImage(user.player)}
                w="52px"
                h="52px"
              />
            </MetaLink>
            <Stack fontFamily="exo" my={2} ml={2}>
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
            <Menu>
              <MenuButton
                bg="transparent"
                as={IconButton}
                aria-label="Options"
                icon={<ChevronUpIcon h="18px" w="18px" />}
                _focus={{ outline: 'none', bg: 'transparent' }}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              />
              <MenuList color="black" fontFamily="exo">
                <MetaLink
                  color="black"
                  href="/profile/setup/username"
                  _hover={{ textDecoration: 'none' }}
                >
                  <MenuItem>Edit Profile</MenuItem>
                </MetaLink>
                <MenuItem onClick={disconnect}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex pb={6} mr={2}>
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
              mr={2}
            >
              <Image src={XPStar} alt="XP" h="14px" w="14px" mr={3} />
              <Text color="#ffffff" fontFamily="exo" ml={2}>
                {user.player.total_xp}
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
            >
              <Image src={SeedMarket} alt="Seed" h="14px" w="14px" mr={3} />
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
