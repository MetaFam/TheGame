import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  MetaButton,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Calendar } from 'components/Dashboard/Calendar';
import { gridConfig, initLayouts } from 'components/Dashboard/config';
import { GridItem } from 'components/Dashboard/GridItem';
import { LatestContent } from 'components/Dashboard/LatestContent';
import { Leaderboard } from 'components/Dashboard/Leaderboard';
import { Seed } from 'components/Dashboard/Seed';
import { XP } from 'components/Dashboard/XP';
import { ReactElement, useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';

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

export const originalLayouts = getFromLS('layouts') || initLayouts;

const Dashboard = (): ReactElement => (
  <PageContainer>
    <Grid />
  </PageContainer>
);

export default Dashboard;

type CurrentLayoutType = {
  layout: Layout[];
  layouts: Layouts;
};

export const Grid = (): ReactElement => {
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
    function handleLayoutChange(layouts: Layouts) {
      saveToLS('layouts', JSON.parse(JSON.stringify(layouts)));
      setGridLayouts(JSON.parse(JSON.stringify(layouts)));
    }
    if (changed) handleLayoutChange(current.layouts);
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
      mt={{ base: '-20px', md: '-30px' }}
      sx={gridConfig.wrapper(editable)}
    >
      <ButtonGroup
        w="100%"
        justifyContent="end"
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
          borderColor="transparent"
          background="rgba(17, 17, 17, 0.9)"
          _hover={{ color: 'white', borderColor: 'transparent' }}
          variant="outline"
          textTransform="uppercase"
          px={12}
          letterSpacing="0.1em"
          size="lg"
          fontSize="sm"
          bg="transparent"
          color={editable ? 'red.400' : 'pinkShadeOne'}
          leftIcon={<EditIcon />}
          transition="color 0.2s ease"
          onClick={toggleEditLayout}
        >
          {editable ? 'Save' : 'Edit'} layout
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
          <GridItem title="Latest Content" sx={gridConfig.latest}>
            <LatestContent />
          </GridItem>
        </Box>
        <Box key="xp" className="gridItem">
          <GridItem title="XP" sx={gridConfig.xp}>
            <XP />
          </GridItem>
        </Box>
        <Box key="seed" className="gridItem">
          <GridItem title="Seed" sx={gridConfig.seed}>
            <Seed />
          </GridItem>
        </Box>
        <Box key="calendar" className="gridItem">
          <GridItem title="Calendar" sx={{}}>
            <Calendar />
          </GridItem>
        </Box>
        <Box key="leaderboard" className="gridItem">
          <GridItem title="Leaderboard" sx={gridConfig.leaderboard}>
            <Leaderboard />
          </GridItem>
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
      console.error('getFromLS error: ', e);
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
