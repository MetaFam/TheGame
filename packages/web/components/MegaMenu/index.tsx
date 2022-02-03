import { Stack } from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { MegaMenu as MegaMenuHeader } from 'components/MegaMenu/MegaMenu';
import { PlayerStatsBar as MegaMenuFooter } from 'components/MegaMenu/PlayerStatsBar';

type Props = { hideMenu?: boolean };
export const MegaMenu: React.FC<Props> = ({ hideMenu = false, children }) => (
  <Stack
    h="100vh"
    w="100%"
    spacing={0}
    overflow="hidden"
    pb={{ base: hideMenu ? '0' : '5rem', lg: '0' }}
  >
    {!hideMenu && <MegaMenuHeader />}
    <Stack
      w="100%"
      h="100%"
      spacing={0}
      overflowY="auto"
      overflowX="hidden"
      bgSize="cover"
      bgAttachment="fixed"
      backgroundImage={`url(${BackgroundImage})`}
    >
      {children}
    </Stack>
    {!hideMenu && <MegaMenuFooter />}
  </Stack>
);
