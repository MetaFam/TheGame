import {
  Box,
  BoxProps,
  Button,
  ExternalLinkIcon,
  Link,
  Stack,
  Text,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  Player,
  QuestCompletionFragment,
  QuestCompletionStatus_Enum,
} from 'graphql/autogen/types';
import { getAcceptedQuestsByPlayerQuery } from 'graphql/getQuests';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerCompletedQuests: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const [quests, setQuests] = useState<Array<QuestCompletionFragment>>([]);

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
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_ACHIEVEMENTS}
      modalTitle={`Completed Quests (${quests.length})`}
      modalPrompt={quests.length ? 'Show All' : undefined}
      modal={<AllQuests {...{ quests }} />}
      subheader="A quest is considered “complete” when it is accepted by the quest owner."
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
  quests: Array<QuestCompletionFragment>;
}

const QuestList: React.FC<QuestProps & BoxProps> = ({
  quests,
  mb = 2,
  ...props
}) => (
  <>
    {quests.map((quest) => (
      <Box {...{ mb, ...props }}>
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
