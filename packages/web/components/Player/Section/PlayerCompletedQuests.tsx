import { Box, Button, ExternalLinkIcon, Link, Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import {
  PlayerFragmentFragment,
  QuestCompletionFragmentFragment,
  QuestCompletionStatus_Enum,
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
        setQuests(
          response.filter(
            (quest) => quest.status === QuestCompletionStatus_Enum.Accepted,
          ),
        );
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
        <Box display="flex" flexDirection="column">
          {quests.map((quest, i) => (
            <Box mb={2}>
              <Link key={quest.id} href={`/quest/${quest.questId}`}>
                <Text fontSize="xl">{quest.completed?.title}</Text>
              </Link>
              {quest.submissionLink && (
                <Button
                  mt={2}
                  variant="ghost"
                  h={8}
                  p="xs"
                  color="#D59BD5"
                  backgroundColor={'rgba(255, 255, 255, 0.04);'}
                  _hover={{ bg: '#FFFFFF11' }}
                  _active={{ bg: '#FF000011' }}
                  rightIcon={<ExternalLinkIcon boxSize={3} />}
                >
                  <Link key={quest.id} href={quest.submissionLink} isExternal>
                    <Text fontSize="xs">See proof of delivery</Text>
                  </Link>
                </Button>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Text>No completed quests yet</Text>
      )}
    </ProfileSection>
  );
};
