import { Stack } from '@metafam/ds';
import BackgroundImage from 'assets/main-background.jpg';
import { MegaMenuFooter } from 'components/MegaMenu/MegaMenuFooter';
import { MegaMenuHeader } from 'components/MegaMenu/MegaMenuHeader';

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
    <Stack
      id="scroll-container" // needed for getting scroll position in landing page
      w="100%"
      h="100%"
      spacing={0}
      overflowY="auto"
      overflowX="hidden"
      sx={{
        scrollSnapType: 'y mandatory',
      }}
    >
      {children}
    </Stack>
    {!hide && <MegaMenuFooter />}
  </Stack>
);
