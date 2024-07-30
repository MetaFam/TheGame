import { Optional } from '@metafam/utils';
import { CONFIG } from 'config';
import { useEffect, useMemo } from 'react';

import { Player } from '#graphql/autogen/hasura-sdk';
import { errorHandler } from '#utils/errorHandler';

const BRIGHTID_CONTEXT = 'MetaGame';
const DEEPLINK_ENDPOINT = `brightid://link-verification/${CONFIG.brightIdNodeURL}/${BRIGHTID_CONTEXT}`;
const UNIVERSAL_LINK_ENDPOINT = `${CONFIG.brightIdAppURL}/link-verification/${CONFIG.brightIdNodeURL}/${CONFIG.brightIdNodeURL}/${BRIGHTID_CONTEXT}`;
const VERIFICATION_ENDPOINT = `${CONFIG.brightIdAppURL}/node/v5/verifications/${BRIGHTID_CONTEXT}`;
const POLL_INTERVAL = 5000;

type BrightIdVerificationStatus =
  | {
      unique: boolean;
      app?: string;
      context?: string;
      contextIds: Array<string>;
    }
  | null
  | undefined;

const isStatusVerified = (
  status: BrightIdVerificationStatus,
  contextId: string,
): boolean =>
  status?.unique === true || status?.contextIds.includes(contextId) === true;

export const useBrightIdStatus = ({
  player,
}: {
  player?: Player;
}): Optional<{
  verified: boolean;
  deeplink: string;
  universalLink: string;
}> =>
  useMemo(() => {
    if (player) {
      const contextId = player.id;
      const verified = isStatusVerified(player.brightid_status, contextId);
      const deeplink = `${DEEPLINK_ENDPOINT}/${contextId}`;
      const universalLink = `${UNIVERSAL_LINK_ENDPOINT}/${contextId}`;
      return { verified, deeplink, universalLink };
    }
    return undefined;
  }, [player]);

const fetchVerificationData = async (
  contextId: string,
): Promise<BrightIdVerificationStatus> => {
  try {
    const response = await fetch(`${VERIFICATION_ENDPOINT}/${contextId}`);
    if (!response.ok) return null;
    const responseData = await response.json();
    return responseData.data;
  } catch (err) {
    errorHandler(err as Error);
    return null;
  }
};

export const useBrightIdUpdated = ({
  player,
  poll,
}: {
  player: Player;
  poll: boolean;
}): void => {
  const contextId = player?.id;

  useEffect(() => {
    if (!contextId || !poll) return () => undefined;

    let isSubscribed = true;

    const update = () => {
      fetchVerificationData(contextId).then((status) => {
        const isVerified = isStatusVerified(status, contextId);
        if (isSubscribed && isVerified) {
          window.location.reload();
        }
      });
    };

    const interval = setInterval(update, POLL_INTERVAL);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [contextId, poll]);
};
