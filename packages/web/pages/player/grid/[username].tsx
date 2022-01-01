import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  Flex,
  GridItem,
  MetaButton,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { gridConfig, initLayouts } from 'components/Player/Section/config';
// import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerColorDisposition } from 'components/Player/Section/PlayerColorDisposition';
// import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
// import { PlayerRoles } from 'components/Player/Section/PlayerRoles';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerType } from 'components/Player/Section/PlayerType';
import { HeadComponent } from 'components/Seo';
import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { useUser, useWeb3 } from 'lib/hooks';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { ReactElement, useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import {
  getPlayerCoverImageFull,
  getPlayerDescription,
  getPlayerImage,
} from 'utils/playerHelpers';

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

export const originalLayouts = initLayouts;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }): ReactElement => (
  <PageContainer p={0}>
    <Box
      background={`url(${getPlayerCoverImageFull(player)}) no-repeat`}
      bgSize="cover"
      bgPos="center"
      h={72}
      position="absolute"
      w="full"
    />
    <HeadComponent
      title={`Metagame profile for ${player.username}`}
      description={getPlayerDescription(player).replace('\n', ' ')}
      url={`https://my.metagame.wtf/player/${player.username}`}
      img={getPlayerImage(player)}
    />
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      p={[4, 8, 12]}
      direction="column"
      align="center"
    >
      <Grid player={player} />
    </Flex>
  </PageContainer>
);

export default PlayerPage;

type CurrentLayoutType = {
  layout: Layout[];
  layouts: Layouts;
};

export const Grid: React.FC<Props> = ({ player }): ReactElement => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const { user, fetching } = useUser();
  const { connected } = useWeb3();
  useEffect(() => {
    if (connected && !fetching && user?.id === player?.id) {
      setIsOwnProfile(true);
    }
  }, [user, fetching, connected, player?.id]);

  useEffect(() => {
    if (player) {
      invalidateCache({ playerId: player.id });
    }
  }, [player, invalidateCache]);
  const [gridLayouts, setGridLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)), // TODO: persist in hasura
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
    function handleLayoutChange(layouts: Layouts) {
      const parsedLayouts = JSON.parse(JSON.stringify(layouts));
      // TODO: save parsedLayouts to hasura
      setGridLayouts(parsedLayouts);
    }
    if (changed) handleLayoutChange(current.layouts);
  }, [current, changed]);

  function handleReset() {
    setGridLayouts(JSON.parse(JSON.stringify(initLayouts)));

    setTimeout(() => {
      setOwnLayout(false);
      setChanged(false);
      // resetLayouts();
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
        w="100%"
        justifyContent={'end'}
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
          xl: [30, 30],
          lg: [30, 30],
          md: [30, 30],
          sm: [30, 30],
          xs: [30, 30],
          xxs: [30, 30],
        }}
        containerPadding={{
          xl: [30, 30],
          lg: [30, 30],
          md: [20, 20],
          sm: [20, 20],
          xs: [15, 15],
          xxs: [15, 15],
        }}
      >
        {/* <DashboardSection key="latest" id="latest" containerQuery={queryData}> */}
        <Box key="hero" className="gridItem">
          <GridItem>
            <PlayerHero player={player} isOwnProfile={isOwnProfile} />
          </GridItem>
        </Box>
        <Box key="colors" className="gridItem">
          <GridItem>
            <PlayerColorDisposition player={player} />
          </GridItem>
        </Box>
        <Box key="skills" className="gridItem">
          <GridItem>
            <PlayerSkills player={player} />
          </GridItem>
        </Box>
        <Box key="type" className="gridItem">
          <GridItem>
            <PlayerType player={player} />
          </GridItem>
        </Box>
        <Box key="memberships" className="gridItem">
          <GridItem>
            <PlayerMemberships player={player} />
          </GridItem>
        </Box>
        {/* 
        <Box key="gallery" className="gridItem">
            <GridItem >
        <PlayerGallery player={player} />
            </GridItem>
        </Box>
        */}
      </ResponsiveGridLayout>
    </Box>
  );
};

type QueryParams = { username: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const playerUsernames = await getTopPlayerUsernames();

  return {
    paths: playerUsernames.map((username) => ({
      params: { username },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const username = context.params?.username;
  if (username == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let player = await getPlayer(username);
  if (player == null) {
    player = await getPlayer(username.toLowerCase());
    if (player != null) {
      return {
        redirect: {
          destination: `/player/${username.toLowerCase()}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      player: player || null, // must be serializable
      key: username,
    },
    revalidate: 1,
  };
};
