import { Stack } from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { MegaMenu as MegaMenuHeader } from 'components/MegaMenu/MegaMenu';
import { PlayerStatsBar as MegaMenuFooter } from 'components/MegaMenu/PlayerStatsBar';

type Props = { hide?: boolean };

export const MegaMenu: React.FC<Props> = ({ hide = false, children }) => (
  <Stack
    h="100vh"
    w="100%"
    spacing={0}
    overflow="hidden"
    pb={{ base: hide ? 0 : '5rem', lg: 0 }}
    bgSize="cover"
    bgAttachment="fixed"
    backgroundImage={`url(${BackgroundImage})`}
  >
    {!hide && <MegaMenuHeader />}
    <Stack w="100%" h="100%" spacing={0} overflowY="auto" overflowX="hidden">
      {children}
    </Stack>
    {!hide && <MegaMenuFooter />}
  </Stack>
);
