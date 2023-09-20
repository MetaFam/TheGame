import {
  Box,
  Button,
  Container,
  Image,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMultiStyleConfig,
  useTab,
} from '@metafam/ds';
import GuildsImg from 'assets/guilds-sun_800x800.webp';
import PatronsImg from 'assets/patrons-sun_800x820.webp';
import PlayerImg from 'assets/players-sun_800x822.webp';
import { FullPageContainer } from 'components/Container';
import React, { Ref, RefObject, useRef } from 'react';

import { Rain } from './OnboardingGame/Rain';

const TabImg = ({ type }: { type: string }) => {
  const currentImg = {
    Player: <Image src={PlayerImg.src} h="full" w="full" />,
    Guild: <Image src={GuildsImg.src} h="full" w="full" />,
    Patron: <Image src={PatronsImg.src} h="full" w="full" />,
  }[type];
  return <Box>{currentImg}</Box>;
};

const CustomTab = React.forwardRef<
  RefObject<HTMLElement>,
  { children: React.ReactNode }
>((props, ref) => {
  const tabProps = useTab({ ...props, ref: ref as Ref<HTMLElement> });
  const styles = useMultiStyleConfig('Tabs', tabProps);
  const isSelected = !!tabProps['aria-selected'];
  const isDisabled = !!tabProps['aria-disabled'];
  let borderColor = 'transparent';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Player')
    borderColor = '#4D3593';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Guild')
    borderColor = '#338B97';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Patron')
    borderColor = '#C846C8';
  const bgHover = isDisabled ? 'transparent' : '#ffffff40';
  const cursor = isDisabled ? 'not-allowed' : 'pointer';
  return (
    <Button
      __css={styles.tab}
      size="md"
      h="120px"
      w="120px"
      variant="outline"
      fontWeight={400}
      isDisabled={isDisabled}
      {...tabProps}
    >
      <Box
        padding={1}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
        background="transparent"
        cursor={cursor}
        _hover={{ background: bgHover }}
      >
        <TabImg type={tabProps.children as string} />
      </Box>
      {tabProps.children}
    </Button>
  );
});

export const NewOnboard: React.FC = () => {
  const section = 'onboard';

  return (
    <FullPageContainer
      id={section}
      position="relative"
      overflow="clip"
      fontSize={{ base: 'xl', md: '5xl' }}
      spacing={12}
      px={{ base: 3, lg: 12 }}
      py={{ base: 6, lg: '6rem' }}
      minH="100vh"
    >
      <Container
        display="flex"
        flexDirection="column"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height={{ base: '100vh', lg: 'auto' }}
        alignItems="center"
        justifyContent="start"
        gap="40px"
        zIndex={5}
      >
        <Text fontSize="4xl">Join MetaGame as</Text>
        <Tabs variant="unstyled">
          <TabList display="flex" justifyContent="center" gap={8}>
            <CustomTab>Player</CustomTab>
            <CustomTab>Guild</CustomTab>
            <CustomTab>Patron</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                maxW="container.lg"
                bg="tranparent"
                border="1px solid #4D3593"
                borderRadius={8}
                padding={10}
                boxShadow="inset 0px 0px 48px 0px #4D359359, -8px 0px 72px 0px #4D359359"
                color="white"
              >
                Players are here to learn, contribute labor and help build
                MetaGame.
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.lg"
                bg="tranparent"
                border="1px solid #338B97"
                borderRadius={8}
                padding={10}
                boxShadow="inset 0px 0px 48px 0px #65BDC959, -8px 0px 72px 0px #65BDC959"
                color="white"
              >
                Players are here to learn, contribute labor and help build
                MetaGame.
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.lg"
                bg="tranparent"
                border="1px solid #C846C8"
                borderRadius={8}
                padding={10}
                boxShadow="inset 0px 0px 48px 0px #C846C88C, -8px 0px 72px 0px #C846C859"
                color="white"
              >
                Players are here to learn, contribute labor and help build
                MetaGame.
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
    </FullPageContainer>
  );
};
