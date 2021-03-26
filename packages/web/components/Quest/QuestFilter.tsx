import {
  Flex,
  MetaButton,
  Select,
  Switch,
  Text,
Wrap, WrapItem,
} from '@metafam/ds';
import { GetQuestsQueryVariables, Order_By, QuestFragmentFragment, QuestStatus_Enum } from 'graphql/autogen/types';
import React from 'react';

import { useUser } from '../../lib/hooks';
import { QuestAggregates } from '../../lib/hooks/quests';

type Props = {
  quests: QuestFragmentFragment[];
  aggregates: QuestAggregates;
  queryVariables: GetQuestsQueryVariables
  setQueryVariable: (_: string, __: any) => void;
};

/* TODO
- text search
- remove limit
 */
export const QuestFilter: React.FC<Props> = ({ quests, aggregates, queryVariables, setQueryVariable }) => {
  const { user } = useUser();
  const myId = user?.id;

  return (
    <Wrap justify="space-between">
      <WrapItem>
        <Wrap>
          <WrapItem>
            <Select
              value={queryVariables.limit as number}
              onChange={(e) => setQueryVariable('limit', Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
          </WrapItem>
          <WrapItem>
            <Select
              value={queryVariables.order as string}
              onChange={(e) => setQueryVariable('order', e.target.value)}
            >
              <option value={Order_By.Desc}>Newest</option>
              <option value={Order_By.Asc}>Oldest</option>
            </Select>
          </WrapItem>
          <WrapItem>
            <Select
              value={queryVariables.status as string}
              onChange={(e) => setQueryVariable('status', e.target.value)}
            >
              <option value={QuestStatus_Enum.Open}>Open</option>
              <option value={QuestStatus_Enum.Closed}>Closed</option>
            </Select>
          </WrapItem>
          <WrapItem>
            <Select
              value={queryVariables.guild_id as string || ''}
              onChange={(e) => setQueryVariable('guild_id', e.target.value)}
            >
              <option value="">All guilds</option>
              {aggregates.guilds && aggregates.guilds.map(
                (g: { id: string, name: string }) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))
              }
            </Select>
          </WrapItem>

          {myId &&
          <WrapItem>
            <Flex align="center">
              <MetaButton
                size="md"
                colorScheme="cyan"
                variant="outline"
                px={4}
                onClick={() => setQueryVariable('created_by_player_id', queryVariables.created_by_player_id ? '' : myId)}
              >
                <Text mr={2}>Created by me</Text>
                <Switch
                  isChecked={myId && queryVariables.created_by_player_id === myId}
                  isReadOnly
                  onClick={() => {
                    setQueryVariable('created_by_player_id', queryVariables.created_by_player_id ? '' : myId)
                    return false // prevent cascade
                  }}
                />
              </MetaButton>
            </Flex>
          </WrapItem>
          }
        </Wrap>
      </WrapItem>
      {quests &&
      <WrapItem>
        <Text align="center">{quests.length} quests</Text>
      </WrapItem>
      }
    </Wrap>
  );
}
