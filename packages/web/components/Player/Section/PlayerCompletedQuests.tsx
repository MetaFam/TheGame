import { Link, Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import {
  PlayerFragmentFragment,
  QuestCompletionFragmentFragment,
} from 'graphql/autogen/types';
import { getAcceptedQuestsByPlayerQuery } from 'graphql/getQuests';
import React, { useEffect, useState } from 'react';
import { BoxType } from 'utils/boxTypes';

// TODO Fake data
type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerCompletedQuests: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const [quests, setQuests] = useState<Array<QuestCompletionFragmentFragment>>(
    [],
  );

  useEffect(() => {
    const loadQuests = async () => {
      const response = await getAcceptedQuestsByPlayerQuery(player?.id);
      if (response.length) {
        setQuests(response);
      }
    };
    loadQuests();
  }, [player?.id]);

  return (
    <ProfileSection
      title="Completed Quests"
      isOwnProfile={isOwnProfile}
      canEdit={canEdit}
      boxType={BoxType.PLAYER_ACHIEVEMENTS}
    >
      {quests.length ? (
        quests.map((quest, i) => (
          <Link href={`/quest/${quest.quest_id}`}>{`${i + 1}. ${
            quest.completed?.title
          }`}</Link>
        ))
      ) : (
        <Text>No completed quests yet</Text>
      )}
    </ProfileSection>
  );
};
