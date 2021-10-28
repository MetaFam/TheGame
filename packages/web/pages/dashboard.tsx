import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Avatar,
  Box,
  ButtonGroup,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  IconButton,
  Image,
  MetaButton,
  MetaHeading,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@metafam/ds';
import classnames from 'classnames';
import { PageContainer } from 'components/Container';
import { FC, useEffect, useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';

import { containerQueries } from '../components/Dashboard/Section';

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

export const gridDataSmall = [
  { i: 'latest', x: 0, y: 2, w: 4, h: 3, minW: 2, maxW: 4 },
  { i: 'xp', x: 0, y: 0, w: 2, h: 1, minW: 2, maxW: 4 },
  { i: 'seed', x: 2, y: 0, w: 2, h: 1 },
  { i: 'cal', x: 0, y: 5, w: 4, h: 2 },
  { i: 'leaders', x: 0, y: 7, w: 4, h: 3 },
];

export const initLayouts = {
  lg: gridData,
  md: gridData,
  sm: gridDataSmall,
  xs: gridDataSmall,
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
      height="85vh"
      maxH="85vh"
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
        breakpoints={{ xl: 1920, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4, xxs: 4 }}
        rowHeight={135}
        autoSize
        isBounded
        isDraggable={!!editable}
        isResizable={!!editable}
        transformScale={1}
        margin={{
          xl: [20, 20],
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
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
                  <StatGroup mt={5} flex="0 0 50%">
                    <Stat mb={3}>
                      <StatLabel>This Week</StatLabel>
                      <StatNumber>45</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        55%
                      </StatHelpText>
                    </Stat>

                    <Stat mb={3} flex="0 0 50%">
                      <StatLabel>Last Week</StatLabel>
                      <StatNumber>78</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        22%
                      </StatHelpText>
                    </Stat>

                    <Stat
                      alignSelf="flex-start"
                      justifySelf="flex-end"
                      flex="0 0 50%"
                    >
                      <StatLabel>All Time</StatLabel>
                      <StatNumber>2463</StatNumber>
                      <StatHelpText color="diamond">Diamond</StatHelpText>
                    </Stat>
                    <Stat
                      alignSelf="flex-start"
                      justifySelf="flex-end"
                      flex="0 0 50%"
                    >
                      <StatLabel>XP/SEED Ratio</StatLabel>
                      <StatNumber>3.4</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        0.3
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
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
                  <StatGroup mt={5}>
                    <Stat mb={3}>
                      <StatLabel>Market Price</StatLabel>
                      <StatNumber>$30.77</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        11.43%
                      </StatHelpText>
                    </Stat>

                    <Stat mb={3}>
                      <StatLabel>24h Trading Volume</StatLabel>
                      <StatNumber>$1,034</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        9.05%
                      </StatHelpText>
                    </Stat>

                    <Stat alignSelf="flex-start" flex="0 0 100%">
                      <StatLabel>24h Low / High</StatLabel>
                      <StatNumber>$30.24 / $32.17</StatNumber>
                    </Stat>
                  </StatGroup>
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
                    '.player': {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                      },
                    },
                    '&.container': {
                      '&__xxs': {
                        '.calendar': {
                          '&__day': {
                            '&--title': {
                              fontSize: 'xs',
                            },
                            '&--event': {
                              h4: {
                                visibility: 'hidden',
                                maxH: 0,
                              },
                              _hover: {},
                            },
                          },
                        },
                      },
                      '&__xs': {
                        '.calendar': {
                          '&__day': {
                            h3: {
                              fontSize: 'xs',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MetaHeading>Calendar</MetaHeading>
                  <VStack
                    as="ol"
                    className="calendar"
                    width="100%"
                    mt={5}
                    ml={0}
                    sx={{
                      listStyle: 'none',
                    }}
                  >
                    <Box
                      as="li"
                      className="calendar__day"
                      display="flex"
                      width="100%"
                      px={0}
                      py={0}
                      mb={3}
                      flexFlow="column wrap"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <Box
                        as="h3"
                        fontSize="sm"
                        className="calendar__day--title"
                        mb={3}
                        px={5}
                      >
                        Monday • 24 May 2021
                      </Box>
                      <VStack
                        as="ol"
                        className="calendar__day--events"
                        ml={0}
                        width="100%"
                        sx={{
                          listStyle: 'none',
                        }}
                      >
                        <Box
                          as="li"
                          className="calendar__day--event"
                          width="100%"
                          px={5}
                          py={2}
                          backgroundColor="blackAlpha.500"
                          borderRadius="md"
                          sx={{
                            '&:hover': {
                              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <Popover colorScheme="purple">
                            <PopoverTrigger>
                              <Box
                                tabIndex={0}
                                role="button"
                                aria-label="Event summary"
                              >
                                <Box
                                  as="h4"
                                  fontSize="md"
                                  fontFamily="exo2"
                                  fontWeight="bold"
                                >
                                  Champions Ring
                                </Box>
                                <Box
                                  fontWeight="100"
                                  fontFamily="body"
                                  fontSize="xs"
                                >
                                  16:00 – 17:00
                                </Box>
                              </Box>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                backgroundColor="purple.400"
                                backdropFilter="blur(10px)"
                                boxShadow="0 0 10px rgba(0,0,0,0.3)"
                                borderWidth={0}
                                color="white"
                                sx={{
                                  _focus: {
                                    outline: 'none',
                                  },
                                }}
                              >
                                <Box
                                  bg="transparent"
                                  borderWidth={0}
                                  position="absolute"
                                  left={-1}
                                  top={0}
                                  width="100%"
                                  textAlign="center"
                                >
                                  <Image
                                    src="/assets/logo.png"
                                    minH="15px"
                                    minW="12px"
                                    maxH="15px"
                                    mx="auto"
                                    transform="translateY(-7px)"
                                  />
                                </Box>
                                <PopoverCloseButton />
                                <PopoverHeader
                                  borderColor="cyanText"
                                  borderBottomWidth={1}
                                  fontWeight="600"
                                  fontFamily="exo"
                                >
                                  Champions Ring
                                </PopoverHeader>
                                <PopoverBody>
                                  <Box
                                    as="dl"
                                    sx={{
                                      dt: {
                                        fontSize: 'sm',
                                        fontWeight: '600',
                                      },
                                    }}
                                  >
                                    <Box as="dt">Date &amp; Time</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      16:00 – 17:00
                                    </Box>
                                    <Box as="dt">Description</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      Consequat dolore veniam cupidatat id sit
                                      velit consequat.
                                    </Box>
                                    <Box as="dt">Attendees</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      If there is an attendees list
                                    </Box>
                                  </Box>
                                </PopoverBody>
                                <PopoverFooter borderTopWidth={0}>
                                  <ButtonGroup
                                    variant="ghost"
                                    colorScheme="purple"
                                  >
                                    <IconButton
                                      aria-label="Add to your calendar"
                                      icon={<CalendarIcon />}
                                    />
                                    <IconButton
                                      aria-label="View calendar"
                                      icon={<ExternalLinkIcon />}
                                    />
                                  </ButtonGroup>
                                </PopoverFooter>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        </Box>
                        <Box
                          as="li"
                          className="calendar__day--event"
                          width="100%"
                          px={5}
                          py={2}
                          backgroundColor="blackAlpha.500"
                          borderRadius="md"
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <Popover colorScheme="purple">
                            <PopoverTrigger>
                              <Box
                                tabIndex={0}
                                role="button"
                                aria-label="Some box"
                              >
                                <Box
                                  as="h4"
                                  fontSize="md"
                                  fontFamily="exo2"
                                  fontWeight="bold"
                                >
                                  Headhunters align
                                </Box>
                                <Box
                                  fontWeight="100"
                                  fontFamily="body"
                                  fontSize="xs"
                                >
                                  18:00 – 19:00
                                </Box>
                              </Box>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                backgroundColor="purple.400"
                                backdropFilter="blur(10px)"
                                boxShadow="0 0 10px rgba(0,0,0,0.3)"
                                borderWidth={0}
                                color="white"
                                sx={{
                                  _focus: {
                                    outline: 'none',
                                  },
                                }}
                              >
                                <Box
                                  bg="transparent"
                                  borderWidth={0}
                                  position="absolute"
                                  left={-1}
                                  top={0}
                                  width="100%"
                                  textAlign="center"
                                >
                                  <Image
                                    src="/assets/logo.png"
                                    minH="15px"
                                    minW="12px"
                                    maxH="15px"
                                    mx="auto"
                                    transform="translateY(-7px)"
                                  />
                                </Box>
                                <PopoverCloseButton />
                                <PopoverHeader
                                  borderColor="cyanText"
                                  borderBottomWidth={1}
                                  fontWeight="600"
                                  fontFamily="exo"
                                >
                                  Headhunters Align
                                </PopoverHeader>
                                <PopoverBody>
                                  <Box
                                    as="dl"
                                    sx={{
                                      dt: {
                                        fontSize: 'sm',
                                        fontWeight: '600',
                                      },
                                    }}
                                  >
                                    <Box as="dt">Date &amp; Time</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      18:00 – 19:00
                                    </Box>
                                    <Box as="dt">Description</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      Consequat dolore veniam cupidatat id sit
                                      velit consequat.
                                    </Box>
                                    <Box as="dt">Attendees</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      If there is an attendees list
                                    </Box>
                                  </Box>
                                </PopoverBody>
                                <PopoverFooter borderTopWidth={0}>
                                  <ButtonGroup
                                    variant="ghost"
                                    colorScheme="purple"
                                  >
                                    <IconButton
                                      aria-label="Add to your calendar"
                                      icon={<CalendarIcon />}
                                    />
                                    <IconButton
                                      aria-label="View calendar"
                                      icon={<ExternalLinkIcon />}
                                    />
                                  </ButtonGroup>
                                </PopoverFooter>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      as="li"
                      className="calendar__day"
                      display="flex"
                      width="100%"
                      px={0}
                      py={0}
                      mb={3}
                      flexFlow="column wrap"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <Box
                        as="h3"
                        fontSize="sm"
                        className="calendar__day--title"
                        mb={3}
                        px={5}
                      >
                        Tuesday • 25 May 2021
                      </Box>
                      <VStack
                        as="ol"
                        className="calendar__day--events"
                        ml={0}
                        width="100%"
                        sx={{
                          listStyle: 'none',
                        }}
                      >
                        <Box
                          as="li"
                          className="calendar__day--event"
                          width="100%"
                          px={5}
                          py={2}
                          backgroundColor="blackAlpha.500"
                          borderRadius="md"
                          sx={{
                            '&:hover': {
                              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <Popover colorScheme="purple">
                            <PopoverTrigger>
                              <Box
                                tabIndex={0}
                                role="button"
                                aria-label="Some box"
                              >
                                <Box
                                  as="h4"
                                  fontSize="md"
                                  fontFamily="exo2"
                                  fontWeight="bold"
                                >
                                  Content &amp; Shilling Strategy
                                </Box>
                                <Box
                                  fontWeight="100"
                                  fontFamily="body"
                                  fontSize="xs"
                                >
                                  16:00 – 17:00
                                </Box>
                              </Box>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                backgroundColor="purple.400"
                                backdropFilter="blur(10px)"
                                boxShadow="0 0 10px rgba(0,0,0,0.3)"
                                borderWidth={0}
                                color="white"
                                sx={{
                                  _focus: {
                                    outline: 'none',
                                  },
                                }}
                              >
                                <Box
                                  bg="transparent"
                                  borderWidth={0}
                                  position="absolute"
                                  left={-1}
                                  top={0}
                                  width="100%"
                                  textAlign="center"
                                >
                                  <Image
                                    src="/assets/logo.png"
                                    minH="15px"
                                    minW="12px"
                                    maxH="15px"
                                    mx="auto"
                                    transform="translateY(-7px)"
                                  />
                                </Box>
                                <PopoverCloseButton />
                                <PopoverHeader
                                  borderColor="cyanText"
                                  borderBottomWidth={1}
                                  fontWeight="600"
                                  fontFamily="exo"
                                >
                                  Content &amp; Shilling Strategy
                                </PopoverHeader>
                                <PopoverBody>
                                  <Box
                                    as="dl"
                                    sx={{
                                      dt: {
                                        fontSize: 'sm',
                                        fontWeight: '600',
                                      },
                                    }}
                                  >
                                    <Box as="dt">Date &amp; Time</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      17:00 – 18:00
                                    </Box>
                                    <Box as="dt">Description</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      Consequat dolore veniam cupidatat id sit
                                      velit consequat.
                                    </Box>
                                    <Box as="dt">Attendees</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      If there is an attendees list
                                    </Box>
                                  </Box>
                                </PopoverBody>
                                <PopoverFooter borderTopWidth={0}>
                                  <ButtonGroup
                                    variant="ghost"
                                    colorScheme="purple"
                                  >
                                    <IconButton
                                      aria-label="Add to your calendar"
                                      icon={<CalendarIcon />}
                                    />
                                    <IconButton
                                      aria-label="View calendar"
                                      icon={<ExternalLinkIcon />}
                                    />
                                  </ButtonGroup>
                                </PopoverFooter>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        </Box>
                        <Box
                          as="li"
                          className="calendar__day--event"
                          width="100%"
                          px={5}
                          py={2}
                          backgroundColor="blackAlpha.500"
                          borderRadius="md"
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <Popover colorScheme="purple">
                            <PopoverTrigger>
                              <Box
                                tabIndex={0}
                                role="button"
                                aria-label="Some box"
                              >
                                <Box
                                  as="h4"
                                  fontSize="md"
                                  fontFamily="exo2"
                                  fontWeight="bold"
                                >
                                  Shillers Align
                                </Box>
                                <Box
                                  fontWeight="100"
                                  fontFamily="body"
                                  fontSize="xs"
                                >
                                  17:00 – 18:00
                                </Box>
                              </Box>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                backgroundColor="purple.400"
                                backdropFilter="blur(10px)"
                                boxShadow="0 0 10px rgba(0,0,0,0.3)"
                                borderWidth={0}
                                color="white"
                                sx={{
                                  _focus: {
                                    outline: 'none',
                                  },
                                }}
                              >
                                <Box
                                  bg="transparent"
                                  borderWidth={0}
                                  position="absolute"
                                  left={-1}
                                  top={0}
                                  width="100%"
                                  textAlign="center"
                                >
                                  <Image
                                    src="/assets/logo.png"
                                    minH="15px"
                                    minW="12px"
                                    maxH="15px"
                                    mx="auto"
                                    transform="translateY(-7px)"
                                  />
                                </Box>
                                <PopoverCloseButton />
                                <PopoverHeader
                                  borderColor="cyanText"
                                  borderBottomWidth={1}
                                  fontWeight="600"
                                  fontFamily="exo"
                                >
                                  Shillers Align
                                </PopoverHeader>
                                <PopoverBody>
                                  <Box
                                    as="dl"
                                    sx={{
                                      dt: {
                                        fontSize: 'sm',
                                        fontWeight: '600',
                                      },
                                    }}
                                  >
                                    <Box as="dt">Date &amp; Time</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      17:00 – 18:00
                                    </Box>
                                    <Box as="dt">Description</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      Consequat dolore veniam cupidatat id sit
                                      velit consequat.
                                    </Box>
                                    <Box as="dt">Attendees</Box>
                                    <Box
                                      as="dd"
                                      fontWeight="100"
                                      fontFamily="body"
                                      fontSize="xs"
                                    >
                                      If there is an attendees list
                                    </Box>
                                  </Box>
                                </PopoverBody>
                                <PopoverFooter borderTopWidth={0}>
                                  <ButtonGroup
                                    variant="ghost"
                                    colorScheme="purple"
                                  >
                                    <IconButton
                                      aria-label="Add to your calendar"
                                      icon={<CalendarIcon />}
                                    />
                                    <IconButton
                                      aria-label="View calendar"
                                      icon={<ExternalLinkIcon />}
                                    />
                                  </ButtonGroup>
                                </PopoverFooter>
                              </PopoverContent>
                            </Portal>
                          </Popover>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
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
                  <VStack className="leaderboard" width="100%" mt={5}>
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
