import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  CloseIcon,
  ConfirmModal,
  EditIcon,
  Flex,
  MetaButton,
  RepeatClockIcon,
  ResponsiveText,
  useBreakpointValue,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { Calendar } from 'components/Dashboard/Calendar';
import { gridSX, initLayouts } from 'components/Dashboard/config';
import { GridItem } from 'components/Dashboard/GridItem';
import { LatestContent } from 'components/Dashboard/LatestContent';
import { Leaderboard } from 'components/Dashboard/Leaderboard';
import { Seed } from 'components/Dashboard/Seed';
import { XP } from 'components/Dashboard/XP';
import { HeadComponent } from 'components/Seo';
import deepEquals from 'deep-equal';
import { useCallback, useMemo, useState } from 'react';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage: React.FC = () => (
  <PageContainer>
    <HeadComponent title="MetaGame Dashboard" />
    <Grid />
  </PageContainer>
);

export default DashboardPage;

export const Grid: React.FC = () => {
  const [savedLayouts, setSavedLayouts] = useState<Layouts>(
    getFromLS('layouts') ?? initLayouts,
  );

  const [changed, setChanged] = useState(false);
  const [currentLayouts, setCurrentLayouts] = useState<Layouts>(savedLayouts);
  const [exitAlertCancel, setExitAlertCancel] = useState<boolean>(false);
  const [exitAlertReset, setExitAlertReset] = useState<boolean>(false);
  const [editing, setEditing] = useState(false);

  const toggleEditLayout = useCallback(async () => {
    setEditing((e) => !e);
    if (editing) {
      setChanged(false);
      if (changed) {
        saveToLS('layouts', currentLayouts);
        setSavedLayouts(currentLayouts);
      }
    }
  }, [editing, changed, currentLayouts]);

  const handleReset = useCallback(() => {
    setCurrentLayouts(initLayouts);
    setExitAlertReset(false);
  }, []);

  const handleCancel = useCallback(() => {
    setSavedLayouts(getFromLS('layouts') ?? initLayouts);
    setEditing(false);
    setExitAlertCancel(false);
  }, []);

  const isDefaultLayout = useMemo(
    () => deepEquals(currentLayouts, initLayouts),
    [currentLayouts],
  );

  const mobile = useBreakpointValue({ base: true, sm: false });

  console.log({ isDefaultLayout, changed, editing });

  return (
    <Box width="100%" height="100%" sx={gridSX}>
      <ButtonGroup
        w="full"
        mb={4}
        px={8}
        justifyContent="end"
        variant="ghost"
        zIndex={10}
        isAttached
        size={mobile ? 'xs' : 'md'}
      >
        {editing && !isDefaultLayout && (
          <MetaButton
            aria-label="Reset Layout"
            _hover={{ background: 'purple.600' }}
            textTransform="uppercase"
            px={[8, 12]}
            letterSpacing="0.1em"
            onClick={() => setExitAlertReset(true)}
            leftIcon={mobile ? undefined : <RepeatClockIcon />}
          >
            Reset
          </MetaButton>
        )}
        {editing && (
          <MetaButton
            aria-label="Cancel Layout Edit"
            colorScheme="purple"
            _hover={{ background: 'purple.600' }}
            textTransform="uppercase"
            px={[9, 12]}
            letterSpacing="0.1em"
            onClick={() => setExitAlertCancel(true)}
            leftIcon={mobile ? undefined : <CloseIcon />}
          >
            Cancel
          </MetaButton>
        )}
        <ConfirmModal
          isOpen={exitAlertReset}
          onNope={() => setExitAlertReset(false)}
          onYep={handleReset}
          header="Are you sure you want to reset the layout to its default?"
        />
        <ConfirmModal
          isOpen={exitAlertCancel}
          onNope={() => setExitAlertCancel(false)}
          onYep={handleCancel}
          header="Are you sure you want to cancel editing the layout?"
        />
        {(!editing || changed) && (
          <MetaButton
            aria-label="Edit Layout"
            borderColor="transparent"
            background="rgba(17, 17, 17, 0.9)"
            _hover={{ color: 'white' }}
            variant="outline"
            textTransform="uppercase"
            px={[5, 12]}
            letterSpacing="0.1em"
            bg="transparent"
            color={editing ? 'red.400' : 'pinkShadeOne'}
            leftIcon={mobile ? undefined : <EditIcon />}
            transition="color 0.2s ease"
            onClick={toggleEditLayout}
          >
            <ResponsiveText
              content={{
                base: editing ? 'Save' : 'Edit Layout ',
                md: `${editing ? 'Save' : 'Edit'} Layout`,
              }}
            />
          </MetaButton>
        )}
      </ButtonGroup>

      <ResponsiveGridLayout
        onLayoutChange={(_layout, layouts) => {
          setCurrentLayouts(layouts);
          setChanged(
            changed || (editing && !deepEquals(layouts, savedLayouts)),
          );
        }}
        layouts={currentLayouts}
        breakpoints={{ lg: 1180, md: 768, sm: 0 }}
        cols={{ lg: 12, md: 12, sm: 4 }}
        rowHeight={135}
        isDraggable={!!editing}
        isResizable={!!editing}
        margin={{
          lg: [30, 30],
          md: [30, 30],
          sm: [30, 30],
        }}
        containerPadding={{
          lg: [30, 30],
          md: [20, 20],
          sm: [20, 20],
        }}
      >
        <Flex key="latest">
          <GridItem title="Latest Content" {...{ editing }}>
            <LatestContent />
          </GridItem>
        </Flex>
        <Flex key="xp">
          <GridItem title="XP" {...{ editing }}>
            <XP />
          </GridItem>
        </Flex>

        <Flex key="seed">
          <GridItem title="Seed" {...{ editing }}>
            <Seed />
          </GridItem>
        </Flex>
        <Flex key="calendar">
          <GridItem title="Calendar" {...{ editing }}>
            <Calendar />
          </GridItem>
        </Flex>
        <Flex key="leaderboard">
          <GridItem title="Leaderboard" {...{ editing }}>
            <Leaderboard />
          </GridItem>
        </Flex>
      </ResponsiveGridLayout>
    </Box>
  );
};

const STORAGE_KEY = 'metagame-dashboard';

const getFromLS = (key: string): Layouts | undefined => {
  let ls: Record<string, unknown> = {};
  if (global.localStorage) {
    try {
      const dashboard = global.localStorage.getItem(STORAGE_KEY);
      ls = dashboard !== null ? (JSON.parse(dashboard) as Layouts) : {};
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error fetching dashboard layouts from localStorage:', e);
    }
  }
  return ls[key] as Layouts;
};

const saveToLS = (key: string, value: Layouts): void => {
  if (global.localStorage) {
    global.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};
