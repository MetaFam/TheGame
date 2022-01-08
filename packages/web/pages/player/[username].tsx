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
  useToast,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import {
  ALL_BOXES,
  DEFAULT_BOXES,
  DEFAULT_PLAYER_LAYOUTS,
  getBoxLayoutItemDefaults,
  GRID_ROW_HEIGHT,
  gridConfig,
  MULTIPLE_ALLOWED_BOXES,
} from 'components/Player/Section/config';
import { PlayerAddSection } from 'components/Player/Section/PlayerAddSection';
import { PlayerSection } from 'components/Profile/PlayerSection';
import { HeadComponent } from 'components/Seo';
import {
  useInsertCacheInvalidationMutation,
  useUpdatePlayerProfileLayoutMutation,
} from 'graphql/autogen/types';
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
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { BoxMetadata, BoxType, getBoxKey } from 'utils/boxTypes';
import {
  getPlayerCoverImageFull,
  getPlayerDescription,
  getPlayerImage,
} from 'utils/playerHelpers';

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
        pt="8rem"
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

const removeBoxFromLayouts = (
  boxKey: string,
  pastLayouts: Layouts,
): Layouts => {
  const layouts = { ...pastLayouts };
  Object.keys(layouts).map((key) => {
    layouts[key] = layouts[key].filter((item) => item.i !== boxKey);
    return key;
  });
  return layouts;
};

const addBoxToLayouts = (
  boxType: BoxType,
  boxMetadata: BoxMetadata,
  pastLayouts: Layouts,
): Layouts => {
  const layouts = { ...pastLayouts };
  Object.keys(layouts).map((key) => {
    const heroItem = layouts[key].find(
      (item) => item.i === getBoxKey(BoxType.PLAYER_HERO, {}),
    );
    layouts[key].push({
      ...getBoxLayoutItemDefaults(boxType),
      x: 0,
      y: heroItem ? heroItem.y + heroItem.h : 0,
      i: getBoxKey(boxType, boxMetadata),
    });
    return key;
  });
  return layouts;
};

type LayoutItem = {
  boxKey: string;
  boxType: BoxType;
  boxMetadata: BoxMetadata;
};

const DEFAULT_LAYOUT_ITEMS = DEFAULT_BOXES.map((boxType) => ({
  boxType,
  boxMetadata: {},
  boxKey: getBoxKey(boxType, {}),
}));

type ProfileLayoutData = {
  layoutItems: LayoutItem[];
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

  const toast = useToast();

  const [
    { fetching: fetchingSaveRes },
    saveLayoutData,
  ] = useUpdatePlayerProfileLayoutMutation();
  const [saving, setSaving] = useState(false);

  const layoutsFromDB = player.profile_layout
    ? JSON.parse(player.profile_layout)
    : null;

  const [savedLayoutData, setSavedLayoutData] = useState<ProfileLayoutData>(
    layoutsFromDB || {
      layouts: DEFAULT_PLAYER_LAYOUTS,
      layoutItems: DEFAULT_LAYOUT_ITEMS,
    },
  );

  const [
    { layoutItems: currentLayoutItems, layouts: currentLayouts },
    setCurrentLayoutData,
  ] = useState<ProfileLayoutData>(savedLayoutData);

  const [changed, setChanged] = useState(false);

  const [editable, setEditable] = useState(false);

  const handleReset = useCallback(() => {
    const layoutData = {
      layouts: addBoxToLayouts(
        BoxType.PLAYER_ADD_BOX,
        {},
        savedLayoutData.layouts,
      ),
      layoutItems: [
        ...savedLayoutData.layoutItems,
        {
          boxType: BoxType.PLAYER_ADD_BOX,
          boxMetadata: {},
          boxKey: getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
        },
      ],
    };
    setCurrentLayoutData(layoutData);

    setTimeout(() => {
      setChanged(false);
    }, 300);
  }, [savedLayoutData]);

  const persistLayoutData = useCallback(
    async (layoutData: ProfileLayoutData) => {
      if (!user) return;

      setSaving(true);
      const { error } = await saveLayoutData({
        playerId: user.id,
        layout: JSON.stringify(layoutData),
      });

      if (error) {
        const errorDetail = 'The octo is sad 😢';
        toast({
          title: 'Error',
          description: `Unable to save layout. ${errorDetail}`,
          status: 'error',
          isClosable: true,
        });
        handleReset();
      } else {
        setCurrentLayoutData(layoutData);
        setSavedLayoutData(layoutData);
      }
      setSaving(false);
    },
    [handleReset, saveLayoutData, toast, user],
  );

  const toggleEditLayout = useCallback(() => {
    if (editable) {
      const layoutData = {
        layouts: removeBoxFromLayouts(
          getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
          currentLayouts,
        ),
        layoutItems: currentLayoutItems.filter(
          (item) => item.boxType !== BoxType.PLAYER_ADD_BOX,
        ),
      };
      persistLayoutData(layoutData);
    } else {
      const layoutData = {
        layouts: addBoxToLayouts(BoxType.PLAYER_ADD_BOX, {}, currentLayouts),
        layoutItems: [
          ...currentLayoutItems,
          {
            boxType: BoxType.PLAYER_ADD_BOX,
            boxMetadata: {},
            boxKey: getBoxKey(BoxType.PLAYER_ADD_BOX, {}),
          },
        ],
      };
      setCurrentLayoutData(layoutData);
    }
    setEditable(!editable);
    setChanged(false);
  }, [editable, currentLayouts, currentLayoutItems, persistLayoutData]);

  const toggleScrollLock = () => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      if (body) body.classList.toggle('dashboard-edit');
    }
    return null;
  };

  const handleLayoutChange = useCallback(
    (_layoutItems: Layout[], layouts: Layouts) => {
      setCurrentLayoutData({ layouts, layoutItems: currentLayoutItems });
      setChanged(true);
    },
    [currentLayoutItems],
  );

  const wrapperSX = useMemo(() => gridConfig.wrapper(editable), [editable]);

  const displayLayouts = useMemo(() => makeLayouts(editable, currentLayouts), [
    editable,
    currentLayouts,
  ]);

  const onRemoveBox = useCallback(
    (boxKey: string): void => {
      const layoutData = {
        layouts: removeBoxFromLayouts(boxKey, currentLayouts),
        layoutItems: currentLayoutItems.filter(
          (item) => item.boxKey !== boxKey,
        ),
      };
      setCurrentLayoutData(layoutData);
      setChanged(true);
    },
    [currentLayouts, currentLayoutItems],
  );

  const onAddBox = useCallback(
    (boxType: BoxType, boxMetadata: BoxMetadata): void => {
      const boxKey = getBoxKey(boxType, boxMetadata);
      if (currentLayoutItems.find((item) => item.boxKey === boxKey)) {
        return;
      }
      const layoutData = {
        layouts: addBoxToLayouts(boxType, boxMetadata, currentLayouts),
        layoutItems: [
          ...currentLayoutItems,
          { boxType, boxMetadata, boxKey: getBoxKey(boxType, boxMetadata) },
        ],
      };

      setCurrentLayoutData(layoutData);
      setChanged(true);
    },
    [currentLayouts, currentLayoutItems],
  );

  const availableBoxList = useMemo(
    () =>
      ALL_BOXES.filter(
        (box) =>
          !currentLayoutItems.map(({ boxType }) => boxType).includes(box) ||
          MULTIPLE_ALLOWED_BOXES.includes(box),
      ),
    [currentLayoutItems],
  );

  return (
    <Box
      className="gridWrapper"
      width="100%"
      height="100%"
      sx={wrapperSX}
      maxW="96rem"
      mb="12rem"
      pt={isOwnProfile ? '0rem' : '4rem'}
    >
      {isOwnProfile && (
        <ButtonGroup
          w="100%"
          px="2rem"
          justifyContent={'end'}
          variant="ghost"
          zIndex={10}
          isAttached
          h="3rem"
          mb="1rem"
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
            isLoading={saving || fetchingSaveRes}
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
        className="gridItems"
        onLayoutChange={(layoutItems, layouts) => {
          handleLayoutChange(layoutItems, layouts);
        }}
        verticalCompact
        layouts={displayLayouts}
        breakpoints={{ lg: 1180, md: 900, sm: 768, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 3, md: 2, sm: 1, xxs: 1 }}
        rowHeight={GRID_ROW_HEIGHT}
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
        {currentLayoutItems.map(({ boxKey, boxType, boxMetadata }) =>
          boxType === BoxType.PLAYER_ADD_BOX ? (
            <Flex key={boxKey} className="gridItem">
              <PlayerAddSection
                player={player}
                boxList={availableBoxList}
                onAddBox={onAddBox}
              />
            </Flex>
          ) : (
            <Flex key={boxKey} className="gridItem">
              <PlayerSection
                boxType={boxType}
                boxMetadata={boxMetadata}
                player={player}
                isOwnProfile={isOwnProfile}
                canEdit={editable}
                removeBox={onRemoveBox}
              />
            </Flex>
          ),
        )}
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
