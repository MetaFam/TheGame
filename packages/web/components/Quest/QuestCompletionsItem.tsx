import { Avatar, HStack, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { CompletionStatusTag } from 'components/Quest/QuestTags';
import { Player } from 'graphql/autogen/types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  formatAddress,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

type Props = {
  player: Player;
  submittedAt: string;
  status: any;
};

export const QuestCompletionsItem: React.FC<Props> = ({
  player,
  submittedAt,
  status,
}) => {
  const [playerName, setPlayerName] = useState<string>(
    formatAddress(player?.ethereumAddress),
  );
  const [linkURL, setLinkURL] = useState<string>();

  useEffect(() => {
    const getPlayer = async () => {
      setPlayerName(await getPlayerName(player));
      setLinkURL(await getPlayerURL(player));
    };
    getPlayer();
  }, [player]);

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
