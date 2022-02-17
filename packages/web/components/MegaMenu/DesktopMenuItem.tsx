import { Avatar, Box, Link, MenuItem, Text } from '@metafam/ds';
import { Values } from '@metafam/utils';
import { menuIcons } from 'utils/menuIcons';

const ICON_SIZE = 60;

type MenuItemProps = {
  title: string;
  url: string;
  explainerText: string;
  icon: Values<Record<string, string>>;
  iconSize?: number;
};

// Menu links (with icons and explanatory text) -- used in DesktopNavLinks below
export const DesktopMenuItem = ({
  title,
  url,
  explainerText,
  icon,
  iconSize = ICON_SIZE,
}: MenuItemProps) => (
  <MenuItem
    color="#FFF"
    key={title}
    mb={4}
    p={0}
    borderRadius="md"
    _active={{ bg: 'none' }}
    _focus={{ bg: 'none' }}
    _hover={{ bg: '#C8BAFC33' }}
  >
    <Link
      display="flex"
      className="desktop-menu-item"
      href={url}
      width="full"
      m={1}
      p="1rem"
      borderRadius="0.618vmax"
      _hover={{
        backgroundColor: 'rgba(0,0,0,0.56)',
        textDecoration: 'none',
        transition: '0s',
      }}
      transitionTimingFunction="ease-in"
      transition="0.5s"
      _focus={{ outline: 'none' }}
      alignItems="center"
    >
      <Avatar
        alt={title}
        src={menuIcons[icon]}
        width={`${iconSize}px`}
        height={`${iconSize}px`}
        style={{ padding: '10px', marginRight: '20px' }}
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%);"
        boxShadow="0 0 0 2px rgba(0, 0, 0, 0.08)"
        sx={{
          '.desktop-menu-item:hover &': {
            boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.1)',
            bg: 'linear-gradient(180deg, #170B23 0%, #350C58 100%);',
            transition: '0s',
          },
        }}
        transitionTimingFunction="ease-in"
        transition="0.3s"
      />
      <Box>
        <Text color="#FFF" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text color="#FFF" fontSize="13px">
          {explainerText}
        </Text>
      </Box>
    </Link>
  </MenuItem>
);
