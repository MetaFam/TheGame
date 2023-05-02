/* eslint-disable no-console */
import { Box, Flex, LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { EditableGridLayout } from 'components/EditableGridLayout';
import { PlayerSection } from 'components/Player/PlayerSection';
import {
  ALL_BOXES,
  DEFAULT_PLAYER_LAYOUT_DATA,
} from 'components/Player/Section/config';
import { HeadComponent } from 'components/Seo';
import {
  Player,
  useInsertCacheInvalidationMutation as useInvalidateCache,
  useUpdatePlayerProfileLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { useProfileField, useUser } from 'lib/hooks';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
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

type Props = {
  player: Player;
  ens?: string;
};

export const PlayerPage: React.FC<Props> = ({ player: propPlayer }) => {
  const router = useRouter();
  console.debug('HERE #1');
  const username = router.query.username as string;
  console.debug('HERE #2');
  const [player, setPlayer] = useState(propPlayer);
  console.debug('HERE #3');

  const { user } = useUser();
  console.debug('HERE #4');

  const linkURL = usePlayerURL(player);
  console.debug('HERE #5');
  const header = usePlayerName(player);
  console.debug('HERE #6');

  const isCurrentPlayerPage =
    router.pathname === '/me' ||
    user?.profile?.username === username ||
    user?.ethereumAddress === username;
  console.debug('HERE #7');

  // if this is not the current user's page AND there is no player prop (meaning a
  // page was not server-side-rendered for this player), AND the path isn't an
  // ENS name, fetch the player
  useEffect(() => {
    if (
      !isCurrentPlayerPage &&
      !username?.includes('.') &&
      propPlayer == null
    ) {
      getPlayer(username).then((fetchedPlayer) => {
        if (fetchedPlayer != null) {
          setPlayer(fetchedPlayer);
        }
      });
    }
  }, [isCurrentPlayerPage, propPlayer, username]);
  console.debug('HERE #8');

  // if the username contains a dot, look up the player's ETH address and player with ENS
  const { data: ensAndPlayer, isValidating } = useSWR(
    username && username.includes('.') ? username : null,
    getENSAndPlayer,
    {
      revalidateOnFocus: false,
    },
  );
  console.debug('HERE #9');
  const ens = ensAndPlayer?.ens ?? undefined;
  console.debug('HERE #10');
  useEffect(() => {
    if (ensAndPlayer?.player) {
      setPlayer(ensAndPlayer.player);
    }
  }, [ensAndPlayer?.player]);
  console.debug('HERE #11');

  const { value: bannerURL } = useProfileField({
    field: 'bannerImageURL',
    player,
    getter: getPlayerBannerFull,
  });
  console.debug('HERE #12');

  const { value: background } = useProfileField({
    field: 'backgroundImageURL',
    player,
    getter: getPlayerBackgroundFull,
  });
  console.debug('HERE #13');

  const [, invalidateCache] = useInvalidateCache();
  console.debug('HERE #14');
  const metagamer = useMemo(
    () =>
      player?.guilds.some(
        ({ Guild: { guildname } }) => guildname === 'metafam',
      ),
    [player],
  );
  console.debug('HERE #15');

  useEffect(() => {
    if (player?.id) {
      invalidateCache({ playerId: player.id });
    }
  }, [player?.id, invalidateCache]);
  console.debug('HERE #16');

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
      {banner && (
        <Box
          bg={`url('${banner}') no-repeat`}
          bgSize="cover"
          bgPos="center"
          h={72}
          pos="absolute"
          w="full"
          top={0}
        />
      )}

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
        {player && <Grid {...{ player, ens }} />}
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

export const Grid: React.FC<Props> = ({ player, ens }): ReactElement => {
  const { user, fetching } = useUser();
  const [{ fetching: persisting }, saveLayoutData] = useUpdateLayout();

  const isOwnProfile = useMemo(
    () => !fetching && !!user && user.id === player.id,
    [user, fetching, player.id],
  );

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

  return {
    props: {
      player: player ?? null, // must be serializable.
      key: username.toLowerCase(),
      hideTopMenu: false,
    },
    revalidate: 1,
  };
};
