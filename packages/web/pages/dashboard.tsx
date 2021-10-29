import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Avatar,
  Box,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  MetaButton,
  MetaHeading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@metafam/ds';
import classnames from 'classnames';
import { PageContainer } from 'components/Container';
import { Calendar } from 'components/Dashboard/Calendar';
import { containerQueries } from 'components/Dashboard/Section';
import { Seed } from 'components/Dashboard/Seed';
import { XP } from 'components/Dashboard/XP';
import { FC, useEffect, useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';

// type LayoutProps = Layout
// type LayoutsProps = Layouts
export interface Query {
  [key: string]: ContainerQueries;
}
export interface Params {
  [key: string]: boolean;
}
export interface ContainerQueries {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

const ResponsiveGridLayout = WidthProvider(Responsive);
export const gridData = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 6 },
  { i: 'xp', x: 6, y: 0, w: 3, h: 2 },
  { i: 'seed', x: 9, y: 0, w: 3, h: 2 },
  { i: 'cal', x: 6, y: 2, w: 3, h: 4 },
  { i: 'leaders', x: 9, y: 2, w: 3, h: 4 },
];

export const gridDataMd = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 4 },
  { i: 'xp', x: 6, y: 0, w: 6, h: 2 },
  { i: 'seed', x: 6, y: 2, w: 6, h: 2 },
  { i: 'cal', x: 0, y: 4, w: 6, h: 4 },
  { i: 'leaders', x: 6, y: 4, w: 6, h: 4 },
];

export const gridDataSm = [
  { i: 'latest', x: 0, y: 3, w: 4, h: 3 },
  { i: 'xp', x: 0, y: 0, w: 2, h: 2 },
  { i: 'seed', x: 2, y: 0, w: 2, h: 2 },
  { i: 'cal', x: 0, y: 5, w: 2, h: 4 },
  { i: 'leaders', x: 2, y: 5, w: 2, h: 4 },
];

export const initLayouts = {
  lg: gridData,
  md: gridDataMd,
  sm: gridDataSm,
  xs: gridDataSm,
};

export const originalLayouts = getFromLS('layouts') || initLayouts;

const Dashboard: FC = () => (
  <PageContainer>
    <Grid />
  </PageContainer>
);

export default Dashboard;

type CurrentLayoutType = {
  layout: Layout[];
  layouts: Layouts;
};

export const Grid: FC = () => {
  const [gridLayouts, setGridLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)),
  );
  const [ownLayout, setOwnLayout] = useState(false);
  const [changed, setChanged] = useState(false);
  const [current, setCurrent] = useState<CurrentLayoutType>({
    layout: [],
    layouts: {},
  });
  const [editable, setEditable] = useState(false);

  const toggleEditLayout = () => setEditable(!editable);

  const toggleScrollLock = () => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      if (body) body.classList.toggle('dashboard-edit');
    }
    return null;
  };

  useEffect(() => {
    if (getFromLS('layouts') !== undefined) setOwnLayout(true);
    function handleLayoutChange(layout: Layout[] = [], layouts: Layouts) {
      // eslint-disable-next-line no-console
      console.log(layout);
      saveToLS('layouts', JSON.parse(JSON.stringify(layouts)));
      setGridLayouts(JSON.parse(JSON.stringify(layouts)));
    }
    if (changed) handleLayoutChange(current.layout, current.layouts);
  }, [current, changed]);

  function handleReset() {
    setGridLayouts(JSON.parse(JSON.stringify(initLayouts)));

    setTimeout(() => {
      setOwnLayout(false);
      setChanged(false);
      resetLayouts();
    }, 300);
  }

  return (
    <Box
      className="gridWrapper"
      width="100%"
      height="100%"
      sx={{
        '.gridItem': {
          boxShadow: editable
            ? '0 0 10px rgba(0,0,0,0.4)'
            : '0 0 0 rgba(0,0,0,0.4)',
          borderTopRadius: 'lg',
          height: 'unset',
          overflow: 'hidden',
          transition: 'boxShadow 0.2s 0.3s ease',
          p: {
            fontFamily: 'mono',
            fontSize: 'sm',
            fontWeight: 'bold',
            color: 'blueLight',
            mr: 'auto',
          },
          '& > div': {
            bg: editable ? 'blackAlpha.500' : 'blackAlpha.300',
            backdropFilter: 'blur(10px)',
            borderBottomRadius: 'lg',
            overflow: 'hidden',
            h: '100%',
            transition: 'bg 0.2s 0.3s ease',
          },
          '.container': {
            overflowY: 'auto',
            height: '100%',
          },
          h2: {
            fontFamily: 'exo',
            fontSize: 'lg',
            fontWeight: '700',
            textAlign: 'left',
            textTransform: 'uppercase',
          },
        },
        '.react-grid-placeholder': {
          bg: 'purple',
          boxShadow: '0 0 0 solid rgba(0, 0, 0, 0.8)',
          borderRadius: 'lg',
        },
      }}
    >
      <ButtonGroup
        pos="absolute"
        right={25}
        top={90}
        variant="ghost"
        zIndex={10}
        isAttached
      >
        {(changed || ownLayout) && editable && (
          <MetaButton
            aria-label="Edit layout"
            colorScheme="purple"
            textTransform="uppercase"
            px={12}
            letterSpacing="0.1em"
            size="lg"
            fontSize="sm"
            bg="transparent"
            color="purple.400"
            onClick={handleReset}
            leftIcon={<DeleteIcon />}
          >
            Reset
          </MetaButton>
        )}
        <MetaButton
          aria-label="Edit layout"
          colorScheme="purple"
          textTransform="uppercase"
          px={12}
          letterSpacing="0.1em"
          size="lg"
          fontSize="sm"
          bg="transparent"
          color={editable ? 'red.400' : 'purple.400'}
          leftIcon={<EditIcon />}
          transition="color 0.2s ease"
          onClick={toggleEditLayout}
        >
          Edit layout
        </MetaButton>
      </ButtonGroup>

      <ResponsiveGridLayout
        className="grid"
        onLayoutChange={(layout, layouts) => {
          setCurrent({ layout, layouts });
          setChanged(true);
        }}
        verticalCompact
        layouts={gridLayouts}
        breakpoints={{ xl: 1920, lg: 1180, md: 900, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4, xxs: 4 }}
        rowHeight={135}
        autoSize
        // isBounded
        isDraggable={!!editable}
        isResizable={!!editable}
        onDragStart={toggleScrollLock}
        onDragStop={toggleScrollLock}
        onResizeStart={toggleScrollLock}
        onResizeStop={toggleScrollLock}
        transformScale={1}
        margin={{
          xl: [20, 20],
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
        containerPadding={{
          xl: [20, 20],
          lg: [20, 20],
          md: [15, 15],
          sm: [15, 15],
          xs: [10, 10],
          xxs: [10, 10],
        }}
      >
        {/* <DashboardSection key="latest" id="latest" containerQuery={queryData}> */}
        <Box key="latest" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <ContainerQuery query={containerQueries}>
              {(params: Params) => (
                <Box
                  className={classnames('container', params)}
                  sx={{
                    '&.container': {
                      '&__xs': {
                        '.chakra-tabs': {
                          '&__tab-panel': {
                            p: {
                              color: 'purple.50',
                            },
                            // '&--read': {
                            //   p: {
                            //     color: 'purple.50',
                            //   },
                            // },
                            // '&--listen': {
                            //   p: {
                            //     color: 'purple.200',
                            //   },
                            // },
                            // '&--watch': {
                            //   p: {
                            //     color: 'purple.300',
                            //   },
                            // },
                          },
                        },
                      },
                      '&__sm': {
                        '.chakra-tabs': {
                          '&__tab-panel': {
                            p: {
                              color: 'purple.200',
                            },
                          },
                        },
                      },
                      '&__md': {
                        '.chakra-tabs': {
                          '&__tab-panel': {
                            p: {
                              color: 'purple.300',
                            },
                          },
                        },
                      },
                      '&__lg': {
                        '.chakra-tabs': {
                          '&__tab-panel': {
                            p: {
                              color: 'pink.400',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>Latest Content</MetaHeading>
                  <Tabs
                    mt={5}
                    size="lg"
                    variant="line"
                    colorScheme="gray.600"
                    isFitted
                  >
                    <TabList borderBottomWidth={0}>
                      <Tab
                        color="gray.600"
                        _selected={{ color: 'white', borderColor: 'white' }}
                      >
                        Read
                      </Tab>
                      <Tab
                        color="gray.600"
                        _selected={{ color: 'white', borderColor: 'white' }}
                      >
                        Listen
                      </Tab>
                      <Tab
                        color="gray.600"
                        _selected={{ color: 'white', borderColor: 'white' }}
                      >
                        Watch
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel className="chakra-tabs__tab-panel--read">
                        <p>A feed of news and events</p>
                      </TabPanel>
                      <TabPanel className="chakra-tabs__tab-panel--listen">
                        <p>A feed podcast episodes from Anchor or wherever.</p>
                      </TabPanel>
                      <TabPanel className="chakra-tabs__tab-panel--watch">
                        <p>Feed of MetaMedia YouTube content</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              )}
            </ContainerQuery>
          </Box>
        </Box>

        {/* </DashboardSection> */}

        <Box key="xp" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <ContainerQuery query={containerQueries}>
              {(params: Params) => (
                <Box
                  className={classnames('container', params)}
                  sx={{
                    '&.container': {
                      '&__xxs': {
                        '.chakra-stack': {
                          flexFlow: 'column wrap',
                          alignItems: 'flex-start',
                          p: {
                            mx: 0,
                          },
                        },
                        '.chakra-stat': {
                          flex: '0 1 100%',
                          '&__group': {
                            mt: 1,
                          },
                          '&__label': {
                            fontSize: 'xs',
                          },
                          '&:nth-of-type(3), &:last-of-type': {
                            display: 'none',
                          },
                        },
                      },
                      '&__xs': {
                        '.chakra-stat': {
                          '&__label': {
                            fontSize: 'xs',
                          },
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>XP</MetaHeading>
                  <XP />
                </Box>
              )}
            </ContainerQuery>
          </Box>
        </Box>
        <Box key="seed" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <ContainerQuery query={containerQueries}>
              {(params: Params) => (
                <Box
                  className={classnames('container', params)}
                  sx={{
                    '&.container': {
                      '&__xxs': {
                        '.chakra-stack': {
                          flexFlow: 'column',
                          alignItems: 'flex-start',
                          p: {
                            mx: 0,
                          },
                        },
                        '.chakra-stat': {
                          '&__group': {
                            mt: 1,
                          },
                          '&__label': {
                            fontSize: 'xs',
                          },
                          '&:last-of-type': {
                            display: 'none',
                          },
                        },
                      },
                      '&__xs': {
                        '.chakra-stat': {
                          '&__label': {
                            fontSize: 'xs',
                          },
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>Seed</MetaHeading>
                  <Seed />
                </Box>
              )}
            </ContainerQuery>
          </Box>
        </Box>
        <Box key="cal" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <ContainerQuery query={containerQueries}>
              {(params: Params) => (
                <Box
                  className={classnames('container', params)}
                  sx={{
                    '.calendar': {
                      '&__day': {
                        '&--title': {
                          transition: 'all 0.3s ease',
                        },
                        '&--event': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                            cursor: 'pointer',
                          },
                          h4: {
                            transition: 'all 0.3s ease',
                          },
                        },
                      },
                    },
                    '&.container': {
                      '&__xxs': {
                        '.calendar': {
                          '&__day': {
                            '&--title': {
                              fontSize: 'xs',
                              px: 1,
                            },
                            '&--event': {
                              py: 1,
                              px: 2,
                              h4: {
                                visibility: 'hidden',
                                maxH: 0,
                              },
                              span: {
                                fontSize: '12px',
                                fontWeight: '700',
                              },
                              _hover: {},
                            },
                          },
                        },
                      },
                      '&__xs': {
                        '.calendar': {
                          '&__day': {
                            '&--title': {
                              fontSize: 'xs',
                              px: 3,
                            },
                            '&--event': {
                              py: 2,
                              px: 3,
                              h4: {
                                fontSize: 'sm',
                              },
                              span: {
                                fontSize: '12px',
                              },
                              _hover: {},
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>Calendar</MetaHeading>
                  <Calendar />
                </Box>
              )}
            </ContainerQuery>
          </Box>
        </Box>
        <Box key="leaders" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <ContainerQuery query={containerQueries}>
              {(params: Params) => (
                <Box
                  className={classnames('container', params)}
                  sx={{
                    '.player': {
                      transition: 'all 0.3s ease',
                      '&__score': {
                        fontWeight: '400',
                      },
                      '&:hover': {
                        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                      },
                    },
                    '&.container': {
                      '&__xxs': {
                        '.player': {
                          px: 3,
                          py: 2,
                          fontSize: 'sm',
                          justifyContent: 'center',
                          opacity: 1,
                          '&__position, &__name, &__score': {
                            visibility: 'hidden',
                            maxW: 0,
                            maxH: 0,
                            mr: 0,
                          },
                          '&__avatar': {
                            mr: 0,
                          },
                        },
                      },
                      '&__xs': {
                        '.player': {
                          px: 3,
                          fontSize: 'sm',
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>Leaderboard</MetaHeading>
                  <VStack
                    className="leaderboard"
                    width="100%"
                    mt={5}
                    fontFamily="exo2"
                    fontWeight="700"
                  >
                    <Box
                      className="player player__chip"
                      display="flex"
                      width="100%"
                      px={8}
                      py={2}
                      flexFlow="row nowrap"
                      alignItems="center"
                      justifyContent="flex-start"
                      backgroundColor="blackAlpha.500"
                      borderRadius="md"
                    >
                      <Box className="player__position" flex={0} mr={3}>
                        1
                      </Box>
                      <Avatar
                        className="player__avatar"
                        bg="cyan.200"
                        border="2px solid"
                        borderColor="diamond"
                        src="https://pbs.twimg.com/profile_images/1349660293778067456/x4HwomRZ_400x400.jpg"
                        mr={3}
                      />
                      <Box className="player__name">pΞTH</Box>
                      <Box className="player__score" textAlign="right" flex={1}>
                        429
                      </Box>
                    </Box>
                    <Box
                      className="player player__chip"
                      display="flex"
                      width="100%"
                      px={8}
                      py={2}
                      flexFlow="row nowrap"
                      alignItems="center"
                      justifyContent="flex-start"
                      backgroundColor="blackAlpha.500"
                      borderRadius="md"
                    >
                      <Box className="player__position" flex={0} mr={3}>
                        2
                      </Box>
                      <Avatar
                        className="player__avatar"
                        bg="cyan.200"
                        border="2px solid"
                        borderColor="diamond"
                        src="https://pbs.twimg.com/profile_images/964343435682512896/JEnt0Aed_400x400.jpg"
                        mr={3}
                      />
                      <Box className="player__name">Misanth</Box>
                      <Box className="player__score" textAlign="right" flex={1}>
                        390
                      </Box>
                    </Box>
                    <Box
                      className="player player__chip"
                      display="flex"
                      width="100%"
                      px={8}
                      py={2}
                      flexFlow="row nowrap"
                      alignItems="center"
                      justifyContent="flex-start"
                      backgroundColor="blackAlpha.500"
                      borderRadius="md"
                    >
                      <Box className="player__position" flex={0} mr={3}>
                        3
                      </Box>
                      <Avatar
                        className="player__avatar"
                        bg="cyan.200"
                        border="2px solid"
                        borderColor="diamond"
                        src="https://metafam.imgix.net/https%3A%2F%2Fipfs.infura.io%2Fipfs%2FQmRKgJ6nA8CaxDRFYQ2o7SLVF4N8zGbezEKnC993foTZX5?ixlib=js-2.3.2&amp;ar=1%3A1&amp;height=200&amp;s=3f23e361b4ac8a70e211a706b95398a9"
                        mr={3}
                      />
                      <Box className="player__name">luxumbra</Box>
                      <Box className="player__score" textAlign="right" flex={1}>
                        321
                      </Box>
                    </Box>
                    <Box
                      className="player player__chip"
                      display="flex"
                      width="100%"
                      px={8}
                      py={2}
                      flexFlow="row nowrap"
                      alignItems="center"
                      justifyContent="flex-start"
                      backgroundColor="blackAlpha.500"
                      borderRadius="md"
                    >
                      <Box className="player__position" flex={0} mr={3}>
                        4
                      </Box>
                      <Avatar
                        className="player__avatar"
                        bg="cyan.200"
                        border="2px solid"
                        borderColor="diamond"
                        src="https://metafam.imgix.net/https%3A%2F%2Fipfs.infura.io%2Fipfs%2FQmXqFv1JQrUvyVEZXSsriJrxgx9uhBX99RessphRCX5D8j?ixlib=js-2.3.2&amp;ar=1%3A1&amp;height=200&amp;s=ed9e9235a18d845328ddc473bf7bfe5d"
                        mr={3}
                      />
                      <Box className="player__name">Alec</Box>
                      <Box className="player__score" textAlign="right" flex={1}>
                        305
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              )}
            </ContainerQuery>
          </Box>
        </Box>
      </ResponsiveGridLayout>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function resetLayouts() {
  if (getFromLS('metagame-dashboard') === null) {
    return false;
  }
  return global.localStorage.removeItem('metagame-dashboard');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFromLS(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ls: any = {};
  if (global.localStorage) {
    try {
      const dashboard = global.localStorage.getItem('metagame-dashboard');
      ls = dashboard !== null ? JSON.parse(dashboard) : {};
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('getFromLS error: ', e);
      // return null;
    }
  }
  return ls[key];
}

// eslint-disable-next-line
export function saveToLS(key: string, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'metagame-dashboard',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}
