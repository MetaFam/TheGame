import { graphql } from '@quest-chains/sdk';
import { useEffect, useState } from 'react';

import { useRefresh } from '../useRefresh';

export const useLatestQuestChainData = (
  inputQuestChain: graphql.QuestChainInfoFragment | null,
): {
  questChain: graphql.QuestChainInfoFragment | null;
  refresh: () => void;
  fetching: boolean;
  error: unknown;
} => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [questChain, setQuestChain] =
    useState<graphql.QuestChainInfoFragment | null>(inputQuestChain);

  const [refreshCount, refresh] = useRefresh();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!inputQuestChain?.chainId || !inputQuestChain?.address) return;
      try {
        setFetching(true);
        const data = await graphql.getQuestChainInfo(
          inputQuestChain.chainId,
          inputQuestChain.address,
        );
        if (!isMounted) return;
        setQuestChain(data);
      } catch (err) {
        setError(err);
        setQuestChain(inputQuestChain);
      } finally {
        setFetching(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [refreshCount, inputQuestChain]);

  return {
    questChain,
    fetching,
    error,
    refresh,
  };
};
