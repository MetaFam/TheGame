import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  Flex,
  MetaButton,
  ResponsiveText,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import {
  getBoxLayoutItemDefaults,
  gridConfig,
  initLayouts,
} from 'components/Player/Section/config';
import { PlayerSection } from 'components/Player/Section/PlayerSection';
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
import Error from 'next/error';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { BoxType } from 'utils/boxTypes';
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

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }): ReactElement => {
  if (!player) {
    return <Error statusCode={404} />;
  }
  return (
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
        p="4"
        pt="8"
        direction="column"
        align="center"
      >
        <Grid player={player} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

const makeLayouts = (editable: boolean, layouts: Layouts) => {
  const newLayouts: Layouts = {};
  Object.keys(layouts).map((key) => {
    newLayouts[key] = layouts[key].map((item) =>
      item.i === 'hero' ? { ...item, isResizable: editable } : item,
    );
    return key;
  });
  return newLayouts;
};

const ALL_BOXES = [
  BoxType.PLAYER_HERO,
  BoxType.PLAYER_SKILLS,
  BoxType.PLAYER_COLOR_DISPOSITION,
  BoxType.PLAYER_TYPE,
  BoxType.PLAYER_NFT_GALLERY,
  BoxType.PLAYER_DAO_MEMBERSHIPS,
  BoxType.PLAYER_ACHIEVEMENTS,
  BoxType.PLAYER_ROLES,
];

const DEFAULT_BOXES = [
  BoxType.PLAYER_HERO,
  BoxType.PLAYER_SKILLS,
  BoxType.PLAYER_COLOR_DISPOSITION,
  BoxType.PLAYER_TYPE,
  BoxType.PLAYER_NFT_GALLERY,
  BoxType.PLAYER_DAO_MEMBERSHIPS,
];

const removeBoxFromLayouts = (
  boxType: BoxType,
  pastLayouts: Layouts,
): Layouts => {
  const layouts = { ...pastLayouts };
  Object.keys(layouts).map((key) => {
    layouts[key] = layouts[key].filter(
      (item) => (item.i as BoxType) !== boxType,
    );
    return key;
  });
  return layouts;
};

const addBoxToLayouts = (boxType: BoxType, pastLayouts: Layouts): Layouts => {
  const layouts = { ...pastLayouts };
  Object.keys(layouts).map((key) => {
    const heroItem = layouts[key].find(
      (item) => item.i === BoxType.PLAYER_HERO,
    );
    layouts[key].push({
      ...getBoxLayoutItemDefaults(boxType),
      x: 0,
      y: heroItem ? heroItem.y + heroItem.h : 0,
    });
    return key;
  });
  return layouts;
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
  const [savedLayouts, setSavedLayouts] = useState<Layouts>(
    JSON.parse(JSON.stringify(initLayouts)), // TODO: persist in hasura
  );
  const [currentLayouts, setCurrentLayouts] = useState<Layouts>(
    JSON.parse(JSON.stringify(initLayouts)),
  );
  const [changed, setChanged] = useState(false);

  const [editable, setEditable] = useState(false);

  const toggleEditLayout = useCallback(() => {
    if (editable) {
      const layouts = removeBoxFromLayouts(
        BoxType.PLAYER_ADD_BOX,
        currentLayouts,
      );
      setCurrentLayouts(layouts);
      setSavedLayouts(layouts);
    } else {
      const layouts = addBoxToLayouts(BoxType.PLAYER_ADD_BOX, currentLayouts);
      setCurrentLayouts(layouts);
    }
    setEditable(!editable);
    setChanged(false);
  }, [editable, currentLayouts]);

  const toggleScrollLock = () => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      if (body) body.classList.toggle('dashboard-edit');
    }
    return null;
  };

  const handleLayoutChange = useCallback((layouts: Layouts) => {
    const parsedLayouts = JSON.parse(JSON.stringify(layouts));
    setCurrentLayouts(parsedLayouts);
    setChanged(true);
  }, []);

  const handleReset = useCallback(() => {
    const parsedLayouts = JSON.parse(JSON.stringify(savedLayouts));
    const layouts = addBoxToLayouts(BoxType.PLAYER_ADD_BOX, parsedLayouts);
    setCurrentLayouts(layouts);

    setTimeout(() => {
      setChanged(false);
    }, 300);
  }, [savedLayouts]);

  const wrapperSX = useMemo(() => gridConfig.wrapper(editable), [editable]);

  const displayLayouts = useMemo(() => makeLayouts(editable, currentLayouts), [
    editable,
    currentLayouts,
  ]);

  const onRemoveBox = useCallback(
    (boxType: BoxType): void => {
      const layouts = removeBoxFromLayouts(boxType, currentLayouts);
      setCurrentLayouts(layouts);
      setChanged(true);
    },
    [currentLayouts],
  );

  const onAddBox = useCallback(
    (boxType: BoxType): void => {
      const layouts = addBoxToLayouts(boxType, currentLayouts);
      setCurrentLayouts(layouts);
      setChanged(true);
    },
    [currentLayouts],
  );

  const boxes = useMemo(() => {
    const boxIds = new Set<BoxType>();
    Object.keys(currentLayouts).map((key) => {
      const layout = currentLayouts[key];
      layout.forEach((item) => boxIds.add(item.i as BoxType));
      return key;
    });
    const boxIdArray = Array.from(boxIds);
    return boxIdArray.length > 0 ? boxIdArray : DEFAULT_BOXES;
  }, [currentLayouts]);

  const availableBoxList = useMemo(
    () => ALL_BOXES.filter((box) => !boxes.includes(box)),
    [boxes],
  );

  return (
    <Box
      className="gridWrapper"
      width="100%"
      height="100%"
      sx={wrapperSX}
      maxW="96rem"
      mb="12rem"
      pt={isOwnProfile ? '0rem' : '10rem'}
    >
      {isOwnProfile && (
        <ButtonGroup
          w="100%"
          px="2rem"
          justifyContent={'end'}
          variant="ghost"
          zIndex={10}
          isAttached
          mb="7rem"
        >
          {changed && editable && (
            <MetaButton
              aria-label="Edit layout"
              colorScheme="purple"
              _hover={{ background: 'purple.600' }}
              textTransform="uppercase"
              px={12}
              letterSpacing="0.1em"
              size="lg"
              fontSize="sm"
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
            <ResponsiveText
              content={{
                base: editable ? 'Save' : 'Edit',
                md: `${editable ? 'Save' : 'Edit'} layout`,
              }}
            />
          </MetaButton>
        </ButtonGroup>
      )}

      <ResponsiveGridLayout
        className="grid"
        onLayoutChange={(_layout, layouts) => {
          handleLayoutChange(layouts);
        }}
        verticalCompact
        layouts={displayLayouts}
        breakpoints={{ lg: 1180, md: 900, sm: 768, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 3, md: 2, sm: 1, xxs: 1 }}
        rowHeight={32}
        isDraggable={!!editable}
        isResizable={!!editable}
        onDragStart={toggleScrollLock}
        onDragStop={toggleScrollLock}
        onResizeStart={toggleScrollLock}
        onResizeStop={toggleScrollLock}
        transformScale={1}
        margin={{
          lg: [30, 30],
          md: [30, 30],
          sm: [30, 30],
          xxs: [30, 30],
        }}
        containerPadding={{
          lg: [30, 30],
          md: [20, 20],
          sm: [20, 20],
          xxs: [15, 15],
        }}
      >
        {boxes.map((item) => (
          <Flex key={item} className="gridItem">
            <PlayerSection
              boxType={item}
              player={player}
              isOwnProfile={isOwnProfile}
              canEdit={editable}
              removeBox={onRemoveBox}
              availableBoxList={availableBoxList}
              setNewBox={onAddBox}
            />
          </Flex>
        ))}
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
