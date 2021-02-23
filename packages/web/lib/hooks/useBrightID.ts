import { generateDeeplink, verifyContextId } from 'brightid_sdk';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useEffect, useState } from 'react';

const BRIGHTID_CONTEXT = 'MetaGame';

type BrightIdVerificationStatus = {
  unique: boolean;
  app: string;
  context: string;
  contextIds: Array<string>;
};

type BrightIDOpts = {
  player: PlayerFragmentFragment;
};

export const useBrightID = ({
  player,
}: BrightIDOpts): {
  loading: boolean;
  verified: boolean;
  deeplink: string;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const contextId = player.id;
  const deeplink = generateDeeplink(BRIGHTID_CONTEXT, contextId);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (contextId) {
        const verificationStatus: BrightIdVerificationStatus = await verifyContextId(
          BRIGHTID_CONTEXT,
          contextId,
        );
        setVerified(verificationStatus.unique);
      }
      setLoading(false);
    }
    load();
  }, [contextId]);

  return { verified, loading, deeplink };
};
