import { ListItem, MetaTag } from '@metafam/ds';
import moment from 'moment';

import { Player } from '#graphql/autogen/hasura-sdk';
import { usePlayerName } from '#lib/hooks/player/usePlayerName';

type Props = {
  player: Player;
  submittedAt: string;
};

export const QuestCompletionItem: React.FC<Props> = ({
  player,
  submittedAt,
}) => {
  const playerName = usePlayerName(player);

  return (
    <ListItem pb={1}>
      {playerName}
      <MetaTag ml={2}>{moment(submittedAt).format('MMM D h:mma')}</MetaTag>
    </ListItem>
  );
};
