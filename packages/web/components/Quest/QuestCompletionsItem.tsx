import { Avatar, HStack, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { CompletionStatusTag } from 'components/Quest/QuestTags';
import { Player, QuestCompletionStatus_Enum } from 'graphql/autogen/types';
import { usePlayerName } from 'lib/hooks/player/usePlayerName';
import { usePlayerURL } from 'lib/hooks/player/usePlayerURL';
import moment from 'moment';

type Props = {
  player: Player;
  submittedAt: string;
  status: QuestCompletionStatus_Enum;
};

export const QuestCompletionsItem: React.FC<Props> = ({
  player,
  submittedAt,
  status,
}) => {
  const playerName = usePlayerName(player);
  const linkURL = usePlayerURL(player);

  return (
    <HStack px={4} py={4}>
      <Avatar name={playerName} />
      <CompletionStatusTag {...{ status }} />
      <Text>
        <i>
          by{' '}
          <MetaLink as={linkURL} href="/player/[username]">
            {playerName}
          </MetaLink>
        </i>
      </Text>
      <Text>{moment(submittedAt).fromNow()}</Text>
    </HStack>
  );
};
