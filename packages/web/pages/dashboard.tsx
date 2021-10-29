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
import { GridItem } from 'components/Dashboard/GridItem';
import { LatestContent } from 'components/Dashboard/LatestContent';
import { Leaderboard } from 'components/Dashboard/Leaderboard';
import { Seed } from 'components/Dashboard/Seed';
import { XP } from 'components/Dashboard/XP';
import { FC, useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { gridConfig, gridData, gridDataMd, gridDataSm } from 'utils/dashboard';

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
      sx={gridConfig.wrapper(editable)}
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
          <GridItem title="Calendar" sx={gridConfig.calendar}>
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
