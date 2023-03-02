import { ListItem, MetaTag } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { formatAddress, getPlayerName } from 'utils/playerHelpers';

type Props = {
  player: Player;
  submittedAt: string;
};

export const QuestCompletionItem: React.FC<Props> = ({
  player,
  submittedAt,
}) => {
  const [playerName, setPlayerName] = useState<string>(
    formatAddress(player?.ethereumAddress),
  );

  useEffect(() => {
    const getPlayer = async () => {
      setPlayerName(await getPlayerName(player));
    };
    getPlayer();
  }, [player]);

  return (
    <ListItem pb={1}>
      {playerName}
      <MetaTag ml={2}>{moment(submittedAt).format('MMM D h:mma')}</MetaTag>
    </ListItem>
  );
};
