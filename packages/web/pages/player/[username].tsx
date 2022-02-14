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
import { Maybe } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import {
  ALL_BOXES,
  DEFAULT_LAYOUT_ITEMS,
  DEFAULT_PLAYER_LAYOUTS,
  GRID_ROW_HEIGHT,
  gridConfig,
  MULTIPLE_ALLOWED_BOXES,
  ProfileLayoutData,
} from 'components/Player/Section/config';
import { PlayerAddSection } from 'components/Player/Section/PlayerAddSection';
import { PlayerSection } from 'components/Profile/PlayerSection';
import { HeadComponent } from 'components/Seo';
import {
  Player,
  useInsertCacheInvalidationMutation,
  useUpdatePlayerProfileLayoutMutation,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { useProfileField, useUser, useWeb3 } from 'lib/hooks';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
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
  BoxTypes,
  createBoxKey,
  getBoxKey,
} from 'utils/boxTypes';
import { addBoxToLayouts, updatedLayouts } from 'utils/layoutHelpers';
import {
  getPlayerBannerFull,
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  player: Player;
};

export const PlayerPage: React.FC<Props> = ({ player }): ReactElement => {
  const router = useRouter();
  const { value: banner } = useProfileField({
    field: 'bannerImageURL',
    player,
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
        top={0}
      />
      <Flex w="full" h="full" pt="3rem" direction="column" align="center">
        <Grid {...{ player }} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

const makeLayouts = (editing: boolean, layouts: Layouts): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([key, items]) => [
      key,
      items.map((item) =>
        item.i === 'hero' ? { ...item, isResizable: editing } : item,
      ),
    ]),
  );

const onRemoveBoxFromLayouts = (key: string, layouts: Layouts): Layouts =>
  Object.fromEntries(
    Object.entries(layouts).map(([id, items]) => [
      id,
      items.filter((item) => item.i !== key),
    ]),
  );

const useItemHeights = (items: Array<Maybe<HTMLElement>>) => {
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((oldHeights) => {
        const entryHeights = Object.fromEntries(
          entries.map((entry) => [
            getBoxKey(entry.target as HTMLElement),
            entry.contentRect.height,
          ]),
        );
        return { ...oldHeights, ...entryHeights };
      });
    });

    const newHeights: Record<string, number> = {};
    items.forEach((item) => {
      if (item) {
        const target = item.children[0] as HTMLElement;
        const key = getBoxKey(target);
        if (key && target) {
          newHeights[key] = target.scrollHeight;
          observer.observe(target);
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Missing:`, target, key);
        }
      }
    });
    setHeights(newHeights);

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return heights;
};

export const Grid: React.FC<Props> = ({ player: initPlayer }): ReactElement => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const { user, fetching } = useUser();
  const { connected } = useWeb3();
  const [player /* , setPlayer */] = useState(initPlayer);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!fetching && user && user.id === player.id) {
      // setPlayer(user);
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

  const [
    { fetching: fetchingSaveRes },
    saveLayoutData,
  ] = useUpdatePlayerProfileLayoutMutation();

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

  const itemsRef = useRef<Array<Maybe<HTMLElement>>>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, currentLayoutItems.length);
  }, [currentLayoutItems]);

  const heights = useItemHeights(itemsRef.current);

  useEffect(() => {
    const layouts = updatedLayouts(currentLayouts, heights);
    if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
      setCurrentLayoutData(({ layoutItems }) => ({
        layouts,
        layoutItems,
      }));
    }
  }, [currentLayouts, heights]);

  const [changed, setChanged] = useState(false);

  const [editing, setEditing] = useState(false);

  const handleCancel = useCallback(() => {
    setCurrentLayoutData(savedLayoutData);
    setEditing(false);
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
      } else {
        setCurrentLayoutData(layoutData);
      }
      setSaving(false);
    },
    [saveLayoutData, toast, user],
  );

  const toggleEditLayout = useCallback(async () => {
    if (editing) {
      const layoutData = {
        layouts: onRemoveBoxFromLayouts(
          createBoxKey(BoxTypes.PLAYER_ADD_BOX),
          currentLayouts,
        ),
        layoutItems: currentLayoutItems.filter(
          (item) => item.type !== BoxTypes.PLAYER_ADD_BOX,
        ),
      };
      await persistLayoutData(layoutData);
    } else {
      const layoutData = {
        layouts: addBoxToLayouts(BoxTypes.PLAYER_ADD_BOX, {}, currentLayouts),
        layoutItems: [
          ...currentLayoutItems,
          {
            type: BoxTypes.PLAYER_ADD_BOX,
            key: createBoxKey(BoxTypes.PLAYER_ADD_BOX),
          },
        ],
      };
      setCurrentLayoutData(layoutData);
    }
    setEditing((e) => !e);
    setChanged(false);
  }, [editing, currentLayouts, currentLayoutItems, persistLayoutData]);

  const handleLayoutChange = useCallback(
    (_layoutItems: Layout[], layouts: Layouts) => {
      setCurrentLayoutData({ layouts, layoutItems: currentLayoutItems });
      setChanged(true);
    },
    [currentLayoutItems],
  );

  const wrapperSX = useMemo(() => gridConfig.wrapper(editing), [editing]);

  const displayLayouts = useMemo(() => makeLayouts(editing, currentLayouts), [
    editing,
    currentLayouts,
  ]);

  const onRemoveBox = useCallback(
    (boxKey: string): void => {
      const layoutData = {
        layouts: onRemoveBoxFromLayouts(boxKey, currentLayouts),
        layoutItems: currentLayoutItems.filter((item) => item.key !== boxKey),
      };
      setCurrentLayoutData(layoutData);
      setChanged(true);
    },
    [currentLayouts, currentLayoutItems],
  );

  const onAddBox = useCallback(
    (type: BoxType, metadata: BoxMetadata): void => {
      const key = createBoxKey(type, metadata);
      if (currentLayoutItems.find((item) => item.key === key)) {
        return;
      }
      const layoutData = {
        layouts: addBoxToLayouts(type, metadata, currentLayouts),
        layoutItems: [...currentLayoutItems, { type, metadata, key }],
      };

      setCurrentLayoutData(layoutData);
      setChanged(true);
    },
    [currentLayouts, currentLayoutItems],
  );

  const availableBoxes = useMemo(
    () =>
      ALL_BOXES.filter(
        (box) =>
          !currentLayoutItems.map(({ type }) => type).includes(box) ||
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
          {changed && editing && (
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
            color={editing ? 'red.400' : 'pinkShadeOne'}
            leftIcon={<EditIcon />}
            transition="color 0.2s ease"
            isLoading={saving || fetchingSaveRes}
            onClick={toggleEditLayout}
          >
            <ResponsiveText
              content={{
                base: editing ? 'Save' : 'Edit',
                md: `${editing ? 'Save' : 'Edit'} layout`,
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
        isDraggable={!!editing}
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
        {currentLayoutItems.map(({ key, type, metadata }, i) => (
          <Flex {...{ key }} className="gridItem" id={key}>
            {type === BoxTypes.PLAYER_ADD_BOX ? (
              <PlayerAddSection
                boxes={availableBoxes}
                {...{ player, onAddBox }}
                ref={(e: Maybe<HTMLElement>) => {
                  itemsRef.current[i] = e;
                }}
              />
            ) : (
              <PlayerSection
                {...{
                  type,
                  metadata,
                  player,
                  isOwnProfile,
                  editing,
                  onRemoveBox,
                }}
                ref={(e: Maybe<HTMLElement>) => {
                  itemsRef.current[i] = e;
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
  const names = await getTopPlayerUsernames();

  return {
    paths: names
      .map(({ username, address }) => {
        const out = [];
        if (username) {
          out.push({ params: { username } });
        }
        out.push({ params: { username: address } });
        return out;
      })
      .flat(),
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
