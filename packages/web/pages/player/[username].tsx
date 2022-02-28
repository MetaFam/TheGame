import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Box,
  ButtonGroup,
  CloseIcon,
  ConfirmModal,
  EditIcon,
  Flex,
  LoadingState,
  MetaButton,
  RepeatClockIcon,
  ResponsiveText,
  useBreakpointValue,
  useToast,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import {
  ALL_BOXES,
  DEFAULT_PLAYER_LAYOUT_DATA,
  GRID_ROW_HEIGHT,
  gridConfig,
  MULTIPLE_ALLOWED_BOXES,
  ProfileLayoutData,
} from 'components/Player/Section/config';
import { PlayerAddSection } from 'components/Player/Section/PlayerAddSection';
import { PlayerSection } from 'components/Profile/PlayerSection';
import { HeadComponent } from 'components/Seo';
import deepEquals from 'deep-equal';
import {
  Player,
  useInsertCacheInvalidationMutation as useInvalidateCache,
  useUpdatePlayerProfileLayoutMutation as useUpdateLayout,
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
import {
  addBoxToLayouts,
  disableAddBox,
  enableAddBox,
  isSameLayouts,
  removeBoxFromLayouts,
  updatedLayouts,
} from 'utils/layoutHelpers';
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
  const [, invalidateCache] = useInvalidateCache();

  useEffect(() => {
    if (player?.id) {
      invalidateCache({ playerId: player.id });
    }
  }, [player?.id, invalidateCache]);

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
      <Flex w="full" h="full" pt={12} direction="column" align="center">
        <Grid {...{ player }} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

const useItemHeights = (items: Array<Maybe<HTMLElement>>) => {
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((oldHeights) => {
        const entryHeights = Object.fromEntries(
          entries.map(({ target }) => [
            getBoxKey(target as HTMLElement),
            target.scrollHeight, // entry.contentRect.height,
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

export const Grid: React.FC<Props> = ({ player }): ReactElement => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { user, fetching } = useUser();
  const { connected } = useWeb3();
  const [saving, setSaving] = useState(false);
  const [exitAlertCancel, setExitAlertCancel] = useState<boolean>(false);
  const [exitAlertReset, setExitAlertReset] = useState<boolean>(false);
  const [changed, setChanged] = useState(false);
  const [editing, setEditing] = useState(false);
  const itemsRef = useRef<Array<Maybe<HTMLElement>>>([]);
  const heights = useItemHeights(itemsRef.current);
  const mobile = useBreakpointValue({ base: true, sm: false });
  const toast = useToast();

  const [{ fetching: updating }, saveLayoutData] = useUpdateLayout();

  useEffect(() => {
    if (!fetching && user && user.id === player.id && connected) {
      setIsOwnProfile(true);
    }
  }, [user, fetching, connected, player?.id]);

  const savedLayoutData = useMemo<ProfileLayoutData>(
    () =>
      player?.profileLayout
        ? JSON.parse(player.profileLayout)
        : DEFAULT_PLAYER_LAYOUT_DATA,
    [player?.profileLayout],
  );

  const [currentLayoutData, setCurrentLayoutData] = useState<ProfileLayoutData>(
    savedLayoutData,
  );

  const {
    layoutItems: currentLayoutItems,
    layouts: currentLayouts,
  } = currentLayoutData;

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, currentLayoutItems.length);
  }, [currentLayoutItems]);

  useEffect(() => {
    const layouts = updatedLayouts(currentLayouts, heights);
    if (!deepEquals(layouts, currentLayouts)) {
      setCurrentLayoutData(({ layoutItems }) => ({
        layouts,
        layoutItems,
      }));
    }
  }, [currentLayouts, heights]);

  const handleReset = useCallback(() => {
    setCurrentLayoutData(enableAddBox(DEFAULT_PLAYER_LAYOUT_DATA));
    setExitAlertReset(false);
  }, []);

  const handleCancel = useCallback(() => {
    setCurrentLayoutData(savedLayoutData);
    setEditing(false);
    setExitAlertCancel(false);
  }, [savedLayoutData]);

  const isDefaultLayout = useMemo(
    () => isSameLayouts(DEFAULT_PLAYER_LAYOUT_DATA, currentLayoutData),
    [currentLayoutData],
  );

  const persistLayoutData = useCallback(
    async (layoutData: ProfileLayoutData) => {
      if (!user) throw new Error('User is not set.');

      const { error } = await saveLayoutData({
        playerId: user.id,
        layout: JSON.stringify(layoutData),
      });

      if (error) throw error;
    },
    [saveLayoutData, user],
  );

  const toggleEditLayout = useCallback(async () => {
    try {
      let layoutData = DEFAULT_PLAYER_LAYOUT_DATA;
      if (editing) {
        setSaving(true);
        layoutData = disableAddBox(currentLayoutData);
        await persistLayoutData(layoutData);
      } else {
        layoutData = enableAddBox(currentLayoutData);
      }
      setCurrentLayoutData(layoutData);
      setEditing((e) => !e);
      setChanged(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: `Unable to save layout. Error: ${(err as Error).message}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  }, [editing, currentLayoutData, persistLayoutData, toast]);

  const handleLayoutChange = useCallback(
    (_items: Array<Layout>, layouts: Layouts) => {
      const oldData = {
        layouts: currentLayouts,
        layoutItems: currentLayoutItems,
      };
      const newData = { layouts, layoutItems: currentLayoutItems };
      // automatic height adjustments dirty `changed`
      setChanged(changed || (editing && !isSameLayouts(oldData, newData)));
      setCurrentLayoutData(newData);
    },
    [currentLayouts, currentLayoutItems, editing, changed],
  );

  const wrapperSX = useMemo(() => gridConfig.wrapper(editing), [editing]);

  const onRemoveBox = useCallback(
    (boxKey: string): void => {
      const layoutData = {
        layouts: removeBoxFromLayouts(currentLayouts, boxKey),
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
        layouts: addBoxToLayouts(currentLayouts, type, metadata),
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
          w="full"
          mb={4}
          px={8}
          justifyContent="end"
          variant="ghost"
          zIndex={10}
          isAttached
          size={mobile ? 'xs' : 'md'}
        >
          {changed && editing && !isDefaultLayout && (
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
              isLoading={saving || updating}
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
      )}
      <ResponsiveGridLayout
        className="gridItems"
        onLayoutChange={handleLayoutChange}
        layouts={currentLayouts}
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
