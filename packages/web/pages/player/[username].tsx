import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  Flex,
  LoadingState,
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
import { getPersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import { useProfileField, useUser, useWeb3 } from 'lib/hooks';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, {
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

export const PlayerPage: React.FC<Props> = ({
  player,
  personalityInfo,
}): ReactElement => {
  const router = useRouter();
  const { user } = useUser();
  const { value: banner } = useProfileField({
    field: 'bannerImageURL',
    player,
    owner: !!user && user.id === player?.id,
    getter: getPlayerBannerFull,
  });

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!player) return <Page404 />;

  return (
    <PageContainer pt={0} px={[0, 4, 8]}>
      <HeadComponent
        title={`MetaGame Profile: ${getPlayerName(player)}`}
        description={(getPlayerDescription(player) ?? '').replace('\n', ' ')}
        url={getPlayerURL(player, { rel: false })}
        img={getPlayerImage(player)}
      />
      <Box
        bg={`url(${banner}) no-repeat`}
        bgSize="cover"
        bgPos="center"
        h={72}
        pos="absolute"
        w="full"
      />
      <Flex w="full" h="full" pt="3rem" direction="column" align="center">
        <Grid {...{ player, personalityInfo }} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

const makeLayouts = (canEdit: boolean, layouts: Layouts): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) =>
        item.i === 'hero' ? { ...item, isResizable: canEdit } : item,
      ),
    ]),
  );

const onRemoveBoxFromLayouts = (boxKey: string, layouts: Layouts): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.filter((item) => item.i !== boxKey),
    ]),
  );

const addBoxToLayouts = (
  boxType: BoxType,
  boxMetadata: BoxMetadata,
  layouts: Layouts,
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => {
      const heroItem = items.find(
        (item) => item.i === getBoxKey(BoxType.PLAYER_HERO, {}),
      );
      return [
        key,
        [
          ...items,
          {
            ...getBoxLayoutItemDefaults(boxType),
            x: 0,
            y: heroItem ? heroItem.y + heroItem.h : 0,
            i: getBoxKey(boxType, boxMetadata),
          },
        ],
      ];
    }),
  );

const HEIGHT_MODIFIER = 0.57; // not sure why 0.57 but for some reason it works!

const updateHeightsInLayouts = (
  layouts: Layouts,
  heights: { [boxKey: string]: number },
): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) => {
        const itemHeight =
          (HEIGHT_MODIFIER * (heights[item.i] || 0)) / GRID_ROW_HEIGHT;
        const boxType = getBoxTypeFromKey(item.i);
        return boxType === BoxType.PLAYER_ADD_BOX
          ? item
          : {
              ...item,
              h: itemHeight >= 1 ? itemHeight : 1,
            };
      }),
    ]),
  );

const getBoxKeyFromTarget = (target: HTMLElement | null): string =>
  (target?.offsetParent as HTMLElement)?.offsetParent?.id ?? '';

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

const useItemHeights = (items: HTMLElement[]): { [boxKey: string]: number } => {
  const [heights, setHeights] = useState<{ [boxKey: string]: number }>({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((oldHeights) => {
        const newHeights = { ...oldHeights };
        entries.forEach((entry) => {
          newHeights[getBoxKeyFromTarget(entry.target as HTMLElement)] =
            entry.contentRect.height;
        });
        return newHeights;
      });
    });
    const newHeights: { [boxKey: string]: number } = {};
    items.forEach((item) => {
      const target = item.children[0] as HTMLElement;
      if (target) {
        newHeights[
          getBoxKeyFromTarget(target)
        ] = target.getBoundingClientRect().height;
        observer.observe(target);
      }
    });
    setHeights(newHeights);
    return () => {
      observer.disconnect();
    };
  }, [items]);

  return heights;
};

export const Grid: React.FC<Props> = ({
  player: initPlayer,
  personalityInfo,
}): ReactElement => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const { user, fetching } = useUser();
  const { connected } = useWeb3();
  const [player, setPlayer] = useState(initPlayer);

  useEffect(() => {
    if (!fetching && user && user.id === player.id) {
      setPlayer(user);
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
      player?.profileLayout
        ? JSON.parse(player.profileLayout)
        : {
            layouts: DEFAULT_PLAYER_LAYOUTS,
            layoutItems: DEFAULT_LAYOUT_ITEMS,
          },
    [player?.profileLayout],
  );

  const [
    { layoutItems: currentLayoutItems, layouts: currentLayouts },
    setCurrentLayoutData,
  ] = useState<ProfileLayoutData>(savedLayoutData);

  const itemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, currentLayoutItems.length);
  }, [currentLayoutItems]);

  const heights = useItemHeights(itemsRef.current);

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

  const [canEdit, setCanEdit] = useState(false);

  const handleCancel = useCallback(() => {
    setCurrentLayoutData(savedLayoutData);
    setCanEdit(false);
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
        handleCancel();
      } else {
        setCurrentLayoutData(layoutData);
      }
      setSaving(false);
    },
    [handleCancel, saveLayoutData, toast, user],
  );

  const toggleEditLayout = useCallback(async () => {
    if (canEdit) {
      const layoutData = {
        layouts: onRemoveBoxFromLayouts(
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
    setCanEdit(!canEdit);
    setChanged(false);
  }, [canEdit, currentLayouts, currentLayoutItems, persistLayoutData]);

  const handleLayoutChange = useCallback(
    (_layoutItems: Layout[], layouts: Layouts) => {
      setCurrentLayoutData({ layouts, layoutItems: currentLayoutItems });
      setChanged(true);
    },
    [currentLayoutItems],
  );

  const wrapperSX = useMemo(() => gridConfig.wrapper(canEdit), [canEdit]);

  const displayLayouts = useMemo(() => makeLayouts(canEdit, currentLayouts), [
    canEdit,
    currentLayouts,
  ]);

  const onRemoveBox = useCallback(
    (boxKey: string): void => {
      const layoutData = {
        layouts: onRemoveBoxFromLayouts(boxKey, currentLayouts),
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
          justifyContent="end"
          variant="ghost"
          zIndex={10}
          isAttached
          h="3rem"
          mb="1rem"
        >
          {changed && canEdit && (
            <MetaButton
              aria-label="Cancel edit layout"
              colorScheme="purple"
              _hover={{ background: 'purple.600' }}
              textTransform="uppercase"
              px={12}
              letterSpacing="0.1em"
              size="lg"
              fontSize="sm"
              onClick={handleCancel}
              leftIcon={<DeleteIcon />}
            >
              Cancel
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
            color={canEdit ? 'red.400' : 'pinkShadeOne'}
            leftIcon={<EditIcon />}
            transition="color 0.2s ease"
            isLoading={saving || fetchingSaveRes}
            onClick={toggleEditLayout}
          >
            <ResponsiveText
              content={{
                base: canEdit ? 'Save' : 'Edit',
                md: `${canEdit ? 'Save' : 'Edit'} layout`,
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
        isDraggable={!!canEdit}
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
        {currentLayoutItems.map(({ boxKey, boxType, boxMetadata }, i) => (
          <Flex key={boxKey} className="gridItem" id={boxKey}>
            {boxType === BoxType.PLAYER_ADD_BOX ? (
              <PlayerAddSection
                boxList={availableBoxList}
                {...{ player, onAddBox, personalityInfo }}
                ref={(e) => {
                  itemsRef.current[i] = e as HTMLElement;
                }}
              />
            ) : (
              <PlayerSection
                {...{
                  boxType,
                  boxMetadata,
                  player,
                  isOwnProfile,
                  personalityInfo,
                  canEdit,
                  onRemoveBox,
                }}
                ref={(e) => {
                  itemsRef.current[i] = e as HTMLElement;
                }}
              />
            )}
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
  const personalityInfo = await getPersonalityInfo();

  return {
    props: {
      personalityInfo,
      player: player ?? null, // must be serializable
      key: username.toLowerCase(),
      hideTopMenu: !player,
    },
    revalidate: 1,
  };
};
