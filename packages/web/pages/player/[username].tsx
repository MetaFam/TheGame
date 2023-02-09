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
  useUpdatePlayerProfileLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { useProfileField, useUser } from 'lib/hooks';
import { useGetPlayerProfileFromComposeDB } from 'lib/hooks/ceramic/useGetPlayerProfileFromComposeDB';
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
import { getENSForAddress, getPlayerData } from 'utils/ensHelpers';
import {
  getPlayerBackgroundFull,
  getPlayerBannerFull,
  getPlayerDescription,
  getPlayerImage,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

type Props = {
  player: Player;
  ens?: string;
};

export const PlayerPage: React.FC<Props> = ({ player }) => {
  const router = useRouter();
  const { user } = useUser();
  const [userENS, setENS] = useState('');
  const [linkURL, setLinkURL] = useState<string>();
  const [header, setHeader] = useState('');
  const [playerData, setPlayerData] = useState<Player>(player);

  const username = router.query.username as string;

  const { data: profileInfo, isValidating } = useSWR(
    username && username.includes('.') ? username : null,
    getPlayerData,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (playerData) return;
    if (profileInfo && profileInfo.playerProfile && profileInfo.ens) {
      setPlayerData(profileInfo.playerProfile as Player);
      setENS(profileInfo.ens);
    }
  }, [profileInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const { result: composeDBProfileData } = useGetPlayerProfileFromComposeDB();

  if (composeDBProfileData != null) {
    // eslint-disable-next-line no-param-reassign
    player.profile = {
      id: 'dummy',
      player,
      playerId: player.id,
      ...composeDBProfileData,
    };
  }

  // TODO create a button that migrates a user's data explicitly from
  // hasura to composeDB. Also use this bannerImageURL for backgroundImageURL
  // if it exists

  const { value: bannerURL } = useProfileField({
    field: 'bannerImageURL',
    player: playerData,
    getter: getPlayerBannerFull,
  });

  const { value: background } = useProfileField({
    field: 'backgroundImageURL',
    player: playerData,
    getter: getPlayerBackgroundFull,
  });

  const metagamer = useMemo(
    () =>
      player?.guilds.some(
        ({ Guild: { guildname } }) => guildname === 'metafam',
      ),
    [player],
  );

  useEffect(() => {
    const resolveName = async () => {
      if (user && !userENS && router.pathname === '/me') {
        setPlayerData((await getPlayer(user?.ethereumAddress)) as Player);
        setENS((await getENSForAddress(user?.ethereumAddress)) || '');
      }
      setHeader(await getPlayerName(playerData));
    };
    const getURL = async () => {
      setLinkURL(await getPlayerURL(playerData));
    };
    getURL();
    resolveName();
  }, [user, playerData, router]); // eslint-disable-line react-hooks/exhaustive-deps

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (isValidating && !playerData) return <LoadingState />;
  if (
    !profileInfo?.playerProfile &&
    username &&
    username.includes('.') &&
    !isValidating
  )
    return <Page404 />;
  if (!playerData && router.pathname === '/me') return <Page404 />;

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
        description={(getPlayerDescription(playerData) ?? '').replace(
          '\n',
          ' ',
        )}
        url={linkURL}
        img={getPlayerImage(playerData)}
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
        {playerData && <Grid {...{ player: playerData, ens: userENS }} />}
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
