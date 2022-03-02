import {
  Dashboard,
  Flex,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Profile,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { XPSeedsBalance } from 'components/MegaMenu/XPSeedsBalance';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import React from 'react';
import { getPlayerURL } from 'utils/playerHelpers';

type PlayerStatsProps = {
  player: Player;
};

export const DesktopPlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const { disconnect } = useWeb3();

  return (
    <Flex align="center" justifyContent="flex-end">
      <XPSeedsBalance totalXP={player.totalXP} />
      <Menu>
        <MenuButton
          bg="transparent"
          aria-label="Options"
          _focus={{ outline: 'none', bg: 'transparent' }}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        >
          <PlayerAvatar
            {...{ player }}
            size="md"
            ml={4}
            _hover={{ transform: 'scale(0.9)' }}
          />
        </MenuButton>
        <MenuList mt="8px" color="black">
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
            href={'/profile/setup'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>
              <Profile w={4} h={4} mr={4} /> Profile Wizard
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
          <MetaLink
            color="black"
            href={'/profile/setup/username'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>
              <Profile w={4} h={4} mr={4} /> Setup Profile
            </MenuItem>
          </MetaLink>
          <MenuItem onClick={disconnect}>
            <LogOut w={4} h={4} mr={4} />
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
