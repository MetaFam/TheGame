import { ComposeClient } from '@composedb/client';
import { Box, Flex, LoadingState, useDisclosure } from '@metafam/ds';
import { composeDBDefinition, Maybe } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import { EditableGridLayout } from 'components/EditableGridLayout';
import { PlayerSection } from 'components/Player/PlayerSection';
import { ComposeDBPromptModal } from 'components/Player/Profile/ComposeDBPromptModal';
import {
  ALL_BOXES,
  DEFAULT_PLAYER_LAYOUT_DATA,
} from 'components/Player/Section/config';
import { HeadComponent } from 'components/Seo';
import { CONFIG } from 'config';
import {
  PlayerHydrationContextProvider,
  usePlayerHydrationContext,
} from 'contexts/PlayerHydrationContext';
import {
  Player,
  useUpdatePlayerProfileLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { buildPlayerProfileQuery } from 'graphql/composeDB/queries/profile';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { ComposeDBProfileQueryResult } from 'graphql/types';
import { useUser } from 'lib/hooks';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
import { hydratePlayerProfile } from 'lib/hooks/ceramic/useGetPlayerProfileFromComposeDB';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';
import { LayoutData } from 'utils/boxTypes';
import { getENSAndPlayer } from 'utils/ensHelpers';
import {
  getPlayerBackgroundFull,
  getPlayerBannerFull,
  getPlayerDescription,
  getPlayerImage,
} from 'utils/playerHelpers';

export type PlayerPageProps = {
  player: Maybe<Player>;
  isHydratedFromComposeDB?: boolean;
};

export const PlayerPage: React.FC<PlayerPageProps> = ({
  player: playerFromProps,
  isHydratedFromComposeDB = false,
}): ReactElement => {
  const router = useRouter();

  const username = router.query.username as string;

  // if the given player is not known and the username contains a dot,
  // try looking up an ENS address
  const { data: playerData, isValidating } = useSWR(
    username && username.includes('.') && !playerFromProps ? username : null,
    getENSAndPlayer,
    {
      revalidateOnFocus: false,
    },
  );

  if (router.isFallback || (isValidating && !playerData)) {
    return <LoadingState />;
  }

  const player = playerFromProps || playerData?.player;

  if (!player) return <Page404 />;

  return (
    <PlayerHydrationContextProvider
      player={player}
      isHydratedAlready={isHydratedFromComposeDB}
    >
      <PlayerPageContent ens={playerData?.ens || undefined} />
    </PlayerHydrationContextProvider>
  );
};

const PlayerPageContent: React.FC<{ ens?: string }> = ({ ens }) => {
  const router = useRouter();

  const { hydratedPlayer, hydrateFromComposeDB } = usePlayerHydrationContext();
  const { user, fetching } = useUser();

  const username = router.query.username as string;
  const [player, setPlayer] = useState(hydratedPlayer);

  const linkURL = usePlayerURL(player);
  const header = usePlayerName(player);

  const isCurrentPlayerPage =
    router.pathname === '/me' ||
    user?.profile?.username === username ||
    user?.ethereumAddress === username;

  // if this is not the current user's page AND there is no player prop (meaning a
  // page was not server-side-rendered for this player), AND the path isn't an
  // ENS name, fetch the player
  useEffect(() => {
    if (
      !isCurrentPlayerPage &&
      !username?.includes('.') &&
      hydratedPlayer == null
    ) {
      getPlayer(username).then((fetchedPlayer) => {
        if (fetchedPlayer != null) {
          setPlayer(fetchedPlayer);
        }
      });
    }
  }, [isCurrentPlayerPage, hydratedPlayer, router.pathname, username]);

  // if the username contains a dot, look up the player's ETH address and player with ENS
  const { data: ensAndPlayer, isValidating } = useSWR(
    username && username.includes('.') ? username : null,
    getENSAndPlayer,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (ensAndPlayer?.player) {
      setPlayer(ensAndPlayer.player);
    }
  }, [ensAndPlayer?.player]);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const isOwnProfile = useMemo(
    () => !fetching && !!user && user.id === player.id,
    [user, fetching, player.id],
  );

  const handleMigrationCompleted = useCallback(
    (streamID: string) => {
      hydrateFromComposeDB(streamID);
    },
    [hydrateFromComposeDB],
  );

  // TODO create a button that migrates a user's data explicitly from
  // hasura to composeDB. Also use this bannerImageURL for backgroundImageURL
  // if it exists
  const bannerURL = getPlayerBannerFull(player);
  const background = getPlayerBackgroundFull(player);

  const metagamer = useMemo(
    () =>
      player?.guilds.some(
        ({ Guild: { guildname } }) => guildname === 'metafam',
      ),
    [player],
  );

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (isValidating && !player) return <LoadingState />;
  if (
    (!player && username && username.includes('.') && !isValidating) ||
    (!player && router.pathname === '/me')
  )
    return <Page404 />;

  const banner = metagamer && background ? '' : bannerURL;

  return (
    <PageContainer
      p={0}
      h="100%"
      position="relative"
      {...(metagamer && background
        ? {
            bg: `url('${background}') no-repeat`,
            bgSize: 'cover',
            bgPos: 'center',
            bgAttachment: 'fixed',
          }
        : {})}
    >
      <HeadComponent
        title={`MetaGame Profile: ${header}`}
        description={(getPlayerDescription(player) ?? '').replace('\n', ' ')}
        url={linkURL}
        img={getPlayerImage(player)}
      />
      {banner != null ? (
        <Box
          bg={`url('${banner}') no-repeat`}
          bgSize="cover"
          bgPos="center"
          h={72}
          pos="absolute"
          w="full"
          top={0}
        />
      ) : null}
      <Flex
        w="full"
        h="min-content"
        direction="column"
        align="center"
        pt={12}
        px={[0, 4, 8]}
        {...(metagamer && background
          ? {
              bg: `url('${background}') no-repeat`,
              bgSize: 'cover',
              bgPos: 'center',
              bgAttachment: 'fixed',
            }
          : {})}
      >
        {player && <Grid {...{ player, ens, isOwnProfile, user }} />}
      </Flex>
      {isOwnProfile && user?.profile && !user.ceramicProfileId ? (
        <ComposeDBPromptModal
          player={user}
          {...{ isOpen, handleMigrationCompleted, onClose }}
        />
      ) : null}
    </PageContainer>
  );
};

export default PlayerPage;

type GridProps = {
  player: Player;
  ens?: string;
  user: Maybe<Player>;
  isOwnProfile: boolean;
};

export const Grid: React.FC<GridProps> = ({
  player,
  ens,
  user,
  isOwnProfile,
}): ReactElement => {
  const [{ fetching: persisting }, saveLayoutData] = useUpdateLayout();

  const savedLayoutData = useMemo<LayoutData>(
    () =>
      player.profileLayout
        ? JSON.parse(player.profileLayout)
        : DEFAULT_PLAYER_LAYOUT_DATA,
    [player.profileLayout],
  );

  const persistLayoutData = useCallback(
    async (layoutData: LayoutData) => {
      if (!user) throw new Error('User is not set.');

      const { error } = await saveLayoutData({
        playerId: user.id,
        profileLayout: JSON.stringify(layoutData),
      });

      if (error) throw error;
    },
    [saveLayoutData, user],
  );

  return (
    <EditableGridLayout
      {...{
        player,
        defaultLayoutData: DEFAULT_PLAYER_LAYOUT_DATA,
        savedLayoutData,
        showEditButton: isOwnProfile,
        persistLayoutData,
        persisting,
        allBoxOptions: ALL_BOXES,
        displayComponent: PlayerSection,
        pt: isOwnProfile ? 0 : '4rem',
        ens,
      }}
    />
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
  let hydratedPlayer;

  if (player?.ceramicProfileId) {
    const composeDBClient = new ComposeClient({
      ceramic: CONFIG.ceramicURL,
      definition: composeDBDefinition,
    });
    const query = buildPlayerProfileQuery(player.ceramicProfileId);
    const response = await composeDBClient.executeQuery(query);

    if (response.errors) {
      console.error(`Could not hydrate player ${username} from composeDB`);
      console.error(response.errors);
    } else if (response.data != null) {
      const composeDBProfileData = (
        response.data as ComposeDBProfileQueryResult
      ).node;
      hydratedPlayer = hydratePlayerProfile(player, composeDBProfileData);
    }
  }

  return {
    props: {
      player: hydratedPlayer ?? player ?? null, // must be serializable
      isHydratedFromComposeDB: hydratedPlayer != null,
      key: username.toLowerCase(),
      hideTopMenu: false,
    },
    revalidate: 1,
  };
};
