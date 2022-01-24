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
import Page404 from 'pages/404';
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import {
  BoxMetadata,
  BoxType,
  getBoxKey,
  getBoxTypeFromKey,
} from 'utils/boxTypes';

import {
  getPlayerBannerFull,
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const PlayerPage: React.FC<Props> = ({ player }): ReactElement => {
  if (!player) return <Error statusCode={404} />;

  return (
    <PageContainer pt={0} px={[0, 4, 8]} mt="-4.5rem">
      <HeadComponent
        title={`MetaGame Profile: ${getPlayerName(player)}`}
        description={(getPlayerDescription(player) ?? '').replace('\n', ' ')}
        url={getPlayerURL(player, { rel: false })}
        img={getPlayerImage(player)}
      />
      <Box
        bg={`url(${getPlayerBannerFull(player)}) no-repeat`}
        bgSize="cover"
        bgPos="center"
        h={72}
        pos="absolute"
        w="full"
      />
      <Flex w="full" h="full" pt="3rem" direction="column" align="center">
        <Grid {...{ player }} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

const makeLayouts = (editable: boolean, layouts: Layouts) => {
  const newLayouts: Layouts = {};
  Object.keys(layouts).forEach((key) => {
    newLayouts[key] = layouts[key].map((item) =>
      item.i === 'hero' ? { ...item, isResizable: editable } : item,
    );
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

const updateHeightsInLayouts = (
  pastLayouts: Layouts,
  heights: { [boxKey: string]: number },
): Layouts => {
  const layouts = { ...pastLayouts };
  Object.keys(layouts).map((key) => {
    layouts[key] = layouts[key].map((item) => {
      const itemHeight = (0.57 * (heights[item.i] || 0)) / GRID_ROW_HEIGHT;
      const boxType = getBoxTypeFromKey(item.i);
      return boxType === BoxType.PLAYER_ADD_BOX
        ? item
        : {
            ...item,
            h: itemHeight >= 1 ? itemHeight : 1,
          };
    });
    return key;
  });
  return layouts;
};

const getBoxKeyFromTarget = (target: HTMLDivElement | null): string =>
  (target?.offsetParent as HTMLDivElement)?.offsetParent?.id || '';

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

const useItemHeights = (
  ref: React.MutableRefObject<(HTMLDivElement | null)[]>,
  layoutItems: LayoutItem[],
): { [boxKey: string]: number } => {
  const [heights, setHeights] = useState<{ [boxKey: string]: number }>({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((oldHeights) => {
        const newHeights = { ...oldHeights };
        entries.forEach((entry) => {
          newHeights[getBoxKeyFromTarget(entry.target as HTMLDivElement)] =
            entry.contentRect.height;
        });
        return newHeights;
      });
    });
    if (ref.current) {
      const newHeights: { [boxKey: string]: number } = {};
      ref.current.map((item) => {
        const target = item?.children[0] as HTMLDivElement;
        if (target) {
          newHeights[
            getBoxKeyFromTarget(target)
          ] = target.getBoundingClientRect().height;
          observer.observe(target);
        }
        return item;
      });
      setHeights(newHeights);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, layoutItems]);

  return heights;
};

export const Grid: React.FC<Props> = ({ player: initPlayer }): ReactElement => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const { user, fetching } = useUser();
  const { connected } = useWeb3();
  const [player, setPlayer] = useState(initPlayer);

  useEffect(() => {
    if (!fetching && user?.player && user?.id === player?.id) {
      setPlayer(user?.player);
      if (connected) {
        setIsOwnProfile(true);
      }
    }
  }, [user, fetching, connected, player?.id]);

  useEffect(() => {
    if (player?.id) {
      invalidateCache({ playerId: player.id });
    }
  }, [player?.id, invalidateCache]);

  const toast = useToast();

  const [
    { fetching: fetchingSaveRes },
    saveLayoutData,
  ] = useUpdatePlayerProfileLayoutMutation();
  const [saving, setSaving] = useState(false);

  const savedLayoutData = useMemo<ProfileLayoutData>(
    () =>
      player?.profile_layout
        ? JSON.parse(player.profile_layout)
        : {
            layouts: DEFAULT_PLAYER_LAYOUTS,
            layoutItems: DEFAULT_LAYOUT_ITEMS,
          },
    [player?.profile_layout],
  );

  const [
    { layoutItems: currentLayoutItems, layouts: currentLayouts },
    setCurrentLayoutData,
  ] = useState<ProfileLayoutData>(savedLayoutData);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, currentLayoutItems.length);
  }, [currentLayoutItems]);

  const heights = useItemHeights(itemsRef, currentLayoutItems);

  useEffect(() => {
    const layouts = updateHeightsInLayouts(currentLayouts, heights);
    if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
      setCurrentLayoutData(({ layoutItems }) => ({
        layouts,
        layoutItems,
      }));
    }
  }, [currentLayouts, heights]);

  const [changed, setChanged] = useState(false);

  const [editable, setEditable] = useState(false);

  // const handleDefault = useCallback(() => {
  //   setCurrentLayoutData({
  //     layouts: updateHeightsInLayouts(DEFAULT_PLAYER_LAYOUTS, heights),
  //     layoutItems: DEFAULT_LAYOUT_ITEMS,
  //   });
  // }, [heights]);

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
        toast({
          title: 'Error',
          description: `Unable to save layout. Error: ${error}`,
          status: 'error',
          isClosable: true,
        });
        handleReset();
      } else {
        setCurrentLayoutData(layoutData);
      }
      setSaving(false);
    },
    [handleReset, saveLayoutData, toast, user],
  );

  const toggleEditLayout = useCallback(async () => {
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
      await persistLayoutData(layoutData);
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

  if (!player) return <Page404 />;

  return (
    <Box
      className="gridWrapper"
      width="100%"
      height="100%"
      sx={wrapperSX}
      maxW="96rem"
      mb="12rem"
      pt={isOwnProfile ? 0 : '4rem'}
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
              aria-label="Edit Layout"
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
        layouts={displayLayouts}
        breakpoints={{ lg: 1180, md: 900, sm: 0 }}
        cols={{ lg: 3, md: 2, sm: 1 }}
        rowHeight={GRID_ROW_HEIGHT}
        isDraggable={!!editable}
        isResizable={false}
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
        {currentLayoutItems.map(({ boxKey, boxType, boxMetadata }, i) =>
          boxType === BoxType.PLAYER_ADD_BOX ? (
            <Flex key={boxKey} className="gridItem" id={boxKey}>
              <PlayerAddSection
                player={player}
                boxList={availableBoxList}
                onAddBox={onAddBox}
                ref={(e) => {
                  itemsRef.current[i] = e;
                }}
              />
            </Flex>
          ) : (
            <Flex key={boxKey} className="gridItem" id={boxKey}>
              <PlayerSection
                boxType={boxType}
                boxMetadata={boxMetadata}
                player={player}
                isOwnProfile={isOwnProfile}
                canEdit={editable}
                removeBox={onRemoveBox}
                ref={(e) => {
                  itemsRef.current[i] = e;
                }}
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
    fallback: 'blocking',
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

  const player = await getPlayer(username);

  return {
    props: {
      player: player ?? null, // must be serializable
      key: username.toLowerCase(),
      hideTopMenu: !player,
    },
    revalidate: 1,
  };
};
