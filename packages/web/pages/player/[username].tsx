import { Box, Flex, LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { EditableGridLayout } from 'components/EditableGridLayout';
import { PlayerSection } from 'components/Player/PlayerSection';
import {
  ALL_BOXES,
  DEFAULT_PLAYER_LAYOUT_DATA,
} from 'components/Player/Section/config';
import { HeadComponent } from 'components/Seo';
import { ethers } from 'ethers';
import {
  Player,
  useInsertCacheInvalidationMutation as useInvalidateCache,
  useUpdatePlayerProfileLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import { useProfileField, useUser } from 'lib/hooks';
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
import { LayoutData } from 'utils/boxTypes';
import { getAddressForENS, getENSForAddress } from 'utils/ensHelpers';
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
};

export const PlayerPage: React.FC<Props> = ({ player, ens }): ReactElement => {
  const router = useRouter();
  const { user } = useUser();
  const [userENS, setENS] = useState('');
  const [linkURL, setLinkURL] = useState<string>();

  const { value: bannerURL } = useProfileField({
    field: 'bannerImageURL',
    player,
    getter: getPlayerBannerFull,
  });
  const { value: background } = useProfileField({
    field: 'backgroundImageURL',
    player,
    getter: getPlayerBackgroundFull,
  });
  const [, invalidateCache] = useInvalidateCache();

  useEffect(() => {
    const resolveName = async () => {
      if (user && !ens) {
        const name = await getENSForAddress(user?.ethereumAddress);
        if (name) {
          setENS(name);
        }
      }
      if (ens) {
        setENS(ens);
      }
    };
    const getURL = async () => {
      const url = await getPlayerURL(player);
      setLinkURL(url);
    };
    getURL();
    resolveName();
  }, [user, ens, player]);

  useEffect(() => {
    if (player?.id) {
      invalidateCache({ playerId: player.id });
    }
  }, [player?.id, invalidateCache]);

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!player) return <Page404 />;

  const banner = background ? '' : bannerURL;

  return (
    <PageContainer
      p={0}
      h="100%"
      position="relative"
      {...(background
        ? {
            bg: `url('${background}') no-repeat`,
            bgSize: 'cover',
            bgPos: 'center',
            bgAttachment: 'fixed',
          }
        : {})}
    >
      <HeadComponent
        title={`MetaGame Profile: ${getPlayerName(player)}`}
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
        {...(background
          ? {
              bg: `url('${background}') no-repeat`,
              bgSize: 'cover',
              bgPos: 'center',
              bgAttachment: 'fixed',
            }
          : {})}
      >
        <Grid {...{ player, ens: userENS }} />
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

export const Grid: React.FC<Props> = ({ player }): ReactElement => {
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
  // Used to detect whether ENS is available
  let user;

  if (username == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If username in url includes a . attempt to resolve ENS
  if (username.includes('.')) {
    const address = await getAddressForENS(username);
    user.address = address?.toLowerCase() || username;
    user.ens = username;
  }
  if (ethers.utils.isAddress(username.toLowerCase())) {
    user.address = username.toLocaleLowerCase();
    const ens = await getENSForAddress(username.toLocaleLowerCase());
    user.ens = ens || username;
  }
  if (
    !username.includes('.') &&
    !ethers.utils.isAddress(username.toLowerCase())
  ) {
    user.address = username;
    user.ens = username;
  }

  const player = await getPlayer(user);

  return {
    props: {
      player: player ?? null, // must be serializable
      key: username.toLowerCase(),
      hideTopMenu: !player,
    },
    revalidate: 1,
  };
};

