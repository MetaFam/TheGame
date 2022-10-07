import { graphql } from '@quest-chains/sdk';
import { useEffect, useMemo, useState } from 'react';

import { UserStatusType } from './useUserStatus';

type UserProgresstype = {
  progress: {
    total: number;
    inReviewCount: number;
    completeCount: number;
  };
  canMint: boolean;
};

export const useUserProgress = (
  address: string | undefined | null,
  questChain: graphql.QuestChainInfoFragment | null,
  userStatus: UserStatusType,
): UserProgresstype => {
  const [progress, setProgress] = useState({
    total: 0,
    inReviewCount: 0,
    completeCount: 0,
  });
  useEffect(() => {
    if (questChain) {
      if (questChain?.quests) {
        const inReviewCount = questChain.quests.filter(
          (quest) =>
            !quest.paused &&
            userStatus[quest.questId]?.status === graphql.Status.Review,
        ).length;
        const completeCount = questChain.quests.filter(
          (quest) =>
            !quest.paused &&
            userStatus[quest.questId]?.status === graphql.Status.Pass,
        ).length;

        setProgress({
          inReviewCount: inReviewCount || 0,
          completeCount: completeCount || 0,
          total: questChain.quests.filter((q) => !q.paused).length || 0,
        });
      }
    }
  }, [questChain, userStatus]);

  const canMint = useMemo(
    () =>
      !!address &&
      !!questChain?.token &&
      !questChain.token.owners.find((o) => o.id === address.toLowerCase()) &&
      progress.completeCount > 0 &&
      progress.completeCount === progress.total,
    [questChain, address, progress],
  );

  return { progress, canMint };
};
