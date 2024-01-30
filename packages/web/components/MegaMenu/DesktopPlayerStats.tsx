import {
  Dashboard,
  Flex,
  Icon,
  LogOut,
  Menu,
  MenuArrow,
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
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';


type PlayerStatsProps = {
  player: Player;
};

export const DesktopPlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const { disconnect } = useWeb3();

  const linkURL = usePlayerURL(player);

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

        <MenuList
          mt="8px"
          color="white"
          boxShadow="2xl"
          bg="linear-gradient(180deg, rgba(42, 31, 71, 0.9) 6.18%, rgba(17, 3, 32, 0.86) 140%)"
          borderRadius="md"
          border={0}
          px={2}
          position="absolute"
          right={"-4rem"}
        >
          <Icon
            as={MenuArrow}
            color="rgba(42, 31, 71, 0.9)"
            position="absolute"
            left="calc(92% - 1.25rem)"
            top={-3}
            w={6}
            h="auto"
            opacity={1}
            transition="opacity 0.2s"
            zIndex={2}
          />
          <MetaLink
            color="white"
            href={linkURL || '/'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem
              sx={{
                '&:hover, &:active, &:focus': {
                  bg: 'rgba(0,0,0,0.56)',
                  color: 'white',
                  borderRadius: 'md',
                },
                bg: 'transparent',
              }}
            >
              <Profile w={4} h={4} mr={4} /> View Profile
            </MenuItem>
          </MetaLink>
          <MetaLink
            color="white"
            href={'/profile/setup'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem
              sx={{
                '&:hover, &:active, &:focus': {
                  bg: 'rgba(0,0,0,0.56)',
                  color: 'white',
                  borderRadius: 'md',
                },
                bg: 'transparent',
              }}
            >
              <Profile w={4} h={4} mr={4} /> Profile Wizard
            </MenuItem>
          </MetaLink>
          <MetaLink
            color="white"
            href={'/dashboard'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem
              sx={{
                '&:hover, &:active, &:focus': {
                  bg: 'rgba(0,0,0,0.56)',
                  color: 'white',
                  borderRadius: 'md',
                },
                bg: 'transparent',
              }}
            >
              <Dashboard w={4} h={4} mr={4} fill="white" />
              Dashboard
            </MenuItem>
          </MetaLink>
          <MenuItem
            onClick={disconnect}
            sx={{
              '&:hover, &:active, &:focus': {
                bg: 'rgba(0,0,0,0.56)',
                color: 'white',
                borderRadius: 'md',
              },
              bg: 'transparent',
            }}
          >
            <LogOut w={4} h={4} mr={4} fill="white" />
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
