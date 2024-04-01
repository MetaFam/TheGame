import { isAddress } from '@ethersproject/address';
import {
  ComposeDBField,
  ComposeDBImageMetadata,
  composeDBProfileFieldFiveColorDisposition,
  dispositionFor,
  HasuraImageFieldKey,
  isHasuraImageField,
  Maybe,
  profileMapping,
} from '@metafam/utils';
import GuildCoverImageFull from 'assets/guild-background-full.jpeg';
import GuildCoverImageSmall from 'assets/guild-background-small.jpeg';
import PlayerCoverImageSmall from 'assets/player-background-small.jpg';
import { AccountType_Enum, Player } from 'graphql/autogen/types';
import { GuildPlayer, Patron, PlayerProfile } from 'graphql/types';
import { toSvg } from 'jdenticon';

import { optimizedImage } from './imageHelpers';

export const getPlayerImage = (
  player?: Maybe<Player | GuildPlayer | Patron>,
) => {
  const key = 'profileImageURL';
  const link = optimizedImage(key, player?.profile?.[key]);
  const svg = toSvg(getPlayerName(player), 200);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const profileIcon = URL.createObjectURL(blob);

  return { profileIcon, link };
};

export const getPlayerBanner = (player: Maybe<Player>): string => {
  const key = 'bannerImageURL';
  return (
    optimizedImage(key, player?.profile?.[key], { height: 100 }) ??
    PlayerCoverImageSmall.src
  );
};

export const getPlayerBannerFull = (player?: Maybe<Player>): string => {
  const key = 'bannerImageURL';
  return optimizedImage(key, player?.profile?.[key]) || '';
};

export const getPlayerBackgroundFull = (player?: Maybe<Player>): string => {
  const key = 'backgroundImageURL';
  return optimizedImage(key, player?.profile?.[key]) || '';
};

export const getGuildCoverImageFull = (): string => GuildCoverImageFull.src;

export const getGuildCoverImageSmall = (): string => GuildCoverImageSmall.src;

export const getPlayerUsername = (player?: Maybe<Player>): string | undefined =>
  formatIfAddress(player?.profile?.username ?? undefined);

export const getPlayerURL = (
  player?: Maybe<Player | GuildPlayer>,
  opts: { rel?: boolean; default?: string } = {},
) => {
  let { username } = player?.profile ?? {};
  username ??= player?.ethereumAddress;
  const { rel: relative = true } = opts;
  if (username) {
    const path = `/player/${username}`;
    return `${relative ? '' : 'https://my.metagame.wtf'}${path}`;
  }
  return opts.default;
};

export const getPlayerName = (
  player?: Maybe<Player | GuildPlayer | Patron>,
): string | undefined =>
  player?.profile?.name ||
  formatIfAddress(player?.profile?.username ?? undefined) ||
  formatAddress(player?.ethereumAddress);

export const getPlayerDescription = (
  player?: Maybe<Player>,
): string | undefined => player?.profile?.description ?? undefined;

export const getPlayerMeetwithWalletCalendarUrl = (
  player?: Maybe<Player>,
): string | undefined =>
  player?.accounts?.find((acc) => acc.type === AccountType_Enum.Meetwithwallet)
    ?.identifier || undefined;

export const formatAddress = (address = ''): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

export const formatIfAddress = (username = ''): string =>
  isAddress(username) ? formatAddress(username) : username;

export const hasImage = (player?: Maybe<Player | GuildPlayer>): boolean =>
  !!player?.profile?.profileImageURL;

export const hasuraToComposeDBProfile = (
  profile: PlayerProfile,
  images: Record<HasuraImageFieldKey, Maybe<ComposeDBImageMetadata>>,
) => {
  // todo we should be able to make this typesafe
  const composeDBPayload: Record<string, unknown> = {};

  Object.entries(profileMapping).forEach(([hasuraID, composeDBID]) => {
    const composeDBKey = composeDBID as ComposeDBField;
    const hasuraKey = hasuraID as keyof typeof profileMapping;
    if (isHasuraImageField(hasuraKey)) {
      const imageMetadata = images[hasuraKey as HasuraImageFieldKey];
      if (imageMetadata) {
        composeDBPayload[composeDBKey] = imageMetadata;
      }
    } else {
      const hasuraValue = profile[hasuraKey];
      if (hasuraValue != null) {
        if (composeDBKey === composeDBProfileFieldFiveColorDisposition) {
          const maskString = dispositionFor(hasuraValue as number);
          if (maskString) {
            composeDBPayload[composeDBKey] = maskString;
          }
        } else {
          composeDBPayload[composeDBKey] = hasuraValue;
        }
      }
    }
  });

  return composeDBPayload;
};
