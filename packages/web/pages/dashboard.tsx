import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Box, HStack, MetaButton, MetaHeading, Text } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { FC, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';

// type LayoutProps = Layout
// type LayoutsProps = Layouts

const ResponsiveGridLayout = WidthProvider(Responsive);
export const gridData = [
  { i: 'latest', x: 0, y: 0, w: 6, h: 5 },
  { i: 'xp', x: 6, y: 0, w: 3, h: 2 },
  { i: 'seed', x: 9, y: 0, w: 3, h: 2 },
  { i: 'cal', x: 6, y: 2, w: 3, h: 3 },
  { i: 'leaders', x: 9, y: 2, w: 3, h: 3 },
];

export const gridDataSmall = [
  { i: 'latest', x: 0, y: 0, w: 4, h: 4, minW: 2, maxW: 4 },
  { i: 'xp', x: 4, y: 0, w: 2, h: 1, minW: 2, maxW: 4 },
  { i: 'seed', x: 6, y: 0, w: 2, h: 1 },
  { i: 'cal', x: 4, y: 2, w: 2, h: 3 },
  { i: 'leaders', x: 7, y: 2, w: 2, h: 3 },
];

export const initLayouts = {
  lg: gridData,
  md: gridDataSmall,
  sm: gridDataSmall,
  xs: gridDataSmall,
};

export const originalLayouts = getFromLS('metagame-dashboard') || initLayouts;

const Dashboard: FC = () => (
  <PageContainer>
    <Grid />
  </PageContainer>
);

export default Dashboard;

export const Grid: FC = () => {
  const [gridLayouts, setGridLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)),
  );
  const [ownLayout, setOwnLayout] = useState(false);
  // const hasLayout = !!getFromLS('metagame-dashboard');

  function handleLayoutChange(layout: Layout[], layouts: Layouts) {
    if (layout) setOwnLayout(true);
    saveToLS('metagame-dashboard', JSON.parse(JSON.stringify(layouts)));
    setGridLayouts(JSON.parse(JSON.stringify(layouts)));
  }

  function handleReset() {
    setGridLayouts(JSON.parse(JSON.stringify(initLayouts)));
    resetLayouts();
    setOwnLayout(false);
  }

  return (
    <Box
      className="gridWrapper"
      width="100%"
      height="85vh"
      maxH="85vh"
      sx={{
        border: '1px solid white',
        borderColor: 'whiteAlpha.300',
        '.grid > div': {
          // bg: 'purple80',
          borderTopRadius: 'lg',
          height: 'unset',
          p: {
            fontFamily: 'mono',
            fontSize: 'sm',
            fontWeight: 'bold',
            color: 'blueLight',
            mr: 'auto',
          },
          '& > div': {
            bg: 'blackAlpha.300',
            backdropFilter: 'blur(10px)',
            h: '100%',
          },
          h2: {
            fontFamily: 'exo',
            fontSize: 'lg',
            fontWeight: '500',
            textAlign: 'left',
            textTransform: 'uppercase',
          },
        },
        '.react-grid-placeholder': {
          bg: 'purple80',
          boxShadow: '0 0 15px solid rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      {ownLayout && (
        <Box pos="absolute" top={-10} right={5} h={10}>
          <MetaButton onClick={handleReset}>Reset layout</MetaButton>
        </Box>
      )}
      <ResponsiveGridLayout
        className="grid"
        onLayoutChange={handleLayoutChange}
        verticalCompact
        layouts={gridLayouts}
        breakpoints={{ xl: 1920, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ xl: 12, lg: 12, md: 8, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
        autoSize
        isBounded
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
        <Box key="latest" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <MetaHeading>Latest Content</MetaHeading>
          </Box>
        </Box>
        <Box key="xp" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <MetaHeading>XP</MetaHeading>
          </Box>
        </Box>
        <Box key="seed" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <MetaHeading>Seed</MetaHeading>
            <HStack w="100%" justify="space-evenly">
              <Text>Mkt Price</Text>
              <Text>Trad Vol</Text>
              <Text>Low / High</Text>
            </HStack>
          </Box>
        </Box>
        <Box key="cal" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <MetaHeading>Calendar</MetaHeading>
          </Box>
        </Box>
        <Box key="leaders" className="gridItem">
          <Box
            borderBottomRadius="lg"
            borderTopRadius="lg"
            p={6}
            boxShadow="md"
          >
            <MetaHeading>Leaderboard</MetaHeading>
          </Box>
        </Box>
      </ResponsiveGridLayout>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function resetLayouts() {
  if (global.localStorage) {
    global.localStorage.removeItem('metagame-dashboard');
  }
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
      // return false;
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
