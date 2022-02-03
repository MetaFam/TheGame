import { Box, Button, ExternalLinkIcon, Link, Stack, Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import {
  PlayerFragmentFragment,
  QuestCompletionFragmentFragment,
  QuestCompletionStatus_Enum,
} from 'graphql/autogen/types';
import { getAcceptedQuestsByPlayerQuery } from 'graphql/getQuests';
import React, { useEffect, useState } from 'react';
import { BoxType } from 'utils/boxTypes';

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
      try {
        const response = await getAcceptedQuestsByPlayerQuery(player?.id);
        if (response.length) {
          setQuests(
            response.filter(
              (quest) => quest.status === QuestCompletionStatus_Enum.Accepted,
            ),
          );
        }
      } catch (error) {
        console.error("Couldn't fetch quests", error);
      }
    };
    loadQuests();
  }, [player?.id]);

  return (
    <ProfileSection
      title="Completed Quests"
      {...{ isOwnProfile, canEdit }}
      boxType={BoxType.PLAYER_ACHIEVEMENTS}
      modalTitle={`Completed Quests (${quests.length})`}
      modalText={quests.length ? 'Show All' : ''}
      modal={<AllQuests quests={quests} />}
      subheader='A quest is considered "complete" when it is accepted by the
      quest owner.'
    >
      {quests.length ? (
        <Stack>
          <QuestList quests={quests.slice(0, 4)} />
        </Stack>
      ) : (
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No completed quests found for {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}
    </ProfileSection>
  );
};

interface QuestProps {
  quests: Array<QuestCompletionFragmentFragment>;
  mb?: number;
}

const QuestList: React.FC<QuestProps> = ({ quests, mb = 2 }) => (
  <>
    {quests.map((quest) => (
      <Box mb={mb}>
        <Link href={`/quest/${quest.questId}`} color="white">
          <Text fontSize="xl">{quest.completed?.title}</Text>
        </Link>
        {quest.submissionLink && (
          <Link href={quest.submissionLink} isExternal>
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
              <Text fontSize="xs">See proof of delivery</Text>
            </Button>
          </Link>
        )}
      </Box>
    ))}
  </>
);

const AllQuests: React.FC<QuestProps> = ({ quests }) => (
  <QuestList {...{ quests }} mb={6} />
);
