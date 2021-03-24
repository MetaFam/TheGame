import {
  Heading,
  Box, MetaButton,
  Select,
  VStack,
  Switch,
  Text,
} from '@metafam/ds';
import React from 'react';
import { Order_By, GetQuestsQueryVariables, QuestStatus_Enum } from 'graphql/autogen/types';
import { useUser } from '../../lib/hooks';
import { QuestAggregates } from '../../lib/hooks/quests';

type Props = {
  aggregates: QuestAggregates;
  queryVariables: GetQuestsQueryVariables
  setQueryVariable: (_: string, __: any) => void;
};

export const QuestFilter: React.FC<Props> = ({ aggregates, queryVariables, setQueryVariable }) => {

  const { user } = useUser();
  const myId = user?.id;

  return (
    <Box>
      <Heading>
        Filters
      </Heading>
      <MetaButton
        as="a"
        href="/quest/create"
        fontFamily="mono"
      >
        New Quest
      </MetaButton>
      <VStack>
        <Select
          value={queryVariables.limit as number}
          onChange={(e) => setQueryVariable('limit', Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
        <Select
          value={queryVariables.order as string}
          onChange={(e) => setQueryVariable('order', e.target.value)}
        >
          <option value={Order_By.Desc}>Newest</option>
          <option value={Order_By.Asc}>Oldest</option>
        </Select>
        <Select
          value={queryVariables.status as string}
          onChange={(e) => setQueryVariable('status', e.target.value)}
        >
          <option value={QuestStatus_Enum.Open}>Open</option>
          <option value={QuestStatus_Enum.Closed}>Closed</option>
        </Select>
        <Select
          value={queryVariables.guild_id as string}
          onChange={(e) => setQueryVariable('guild_id', e.target.value)}
        >
          <option value="">All guilds</option>
          {aggregates.guilds && aggregates.guilds.map(
            (g: { id: string, name: string }) => (
              <option value={g.id}>{g.name}</option>
            ))
          }
        </Select>
        {myId &&
        <>
          <Text>Created by me</Text>
          <Switch
            value={myId && queryVariables.created_by_player_id === myId}
            onChange={() => setQueryVariable('created_by_player_id', queryVariables.created_by_player_id ? '' : myId)}
          />
        </>
        }
      </VStack>
    </Box>
  );
}
