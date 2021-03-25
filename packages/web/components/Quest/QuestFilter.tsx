import {
  Box,   Heading,
MetaButton,
  Select,
  Switch,
  Text,
  VStack,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import { GetQuestsQueryVariables, Order_By, QuestStatus_Enum,useGetpSeedBalanceQuery } from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { useUser } from '../../lib/hooks';
import { QuestAggregates } from '../../lib/hooks/quests';

const { BN, amountToDecimal } = numbers;

type Props = {
  aggregates: QuestAggregates;
  queryVariables: GetQuestsQueryVariables
  setQueryVariable: (_: string, __: any) => void;
};


export function isAllowedToCreateQuest(
  balance?: string,
): boolean {
  if(!balance) return false;

  const pSEEDDecimals = 18;
  const minimumPooledSeedBalance = new BN(100);
  const pSEEDBalanceInDecimal = amountToDecimal(
    balance,
    pSEEDDecimals,
  );

  const allowed = new BN(pSEEDBalanceInDecimal).gt(minimumPooledSeedBalance);

  return allowed;
}

export const QuestFilter: React.FC<Props> = ({ aggregates, queryVariables, setQueryVariable }) => {
  const router = useRouter();
  const { user } = useUser();
  const [respSeedBalance] = useGetpSeedBalanceQuery({
    variables: {
      address: user?.ethereum_address || '',
    },
    pause: !user?.ethereum_address,
  });
  const canCreateQuest = useMemo(
    () => isAllowedToCreateQuest(respSeedBalance.data?.getTokenBalances?.pSeedBalance),
    [respSeedBalance],
  );
  const myId = user?.id;

  return (
    <Box>
      <Heading>
        Filters
      </Heading>
      <MetaButton
        fontFamily="mono"
        disabled={!canCreateQuest}
        isLoading={respSeedBalance.fetching}
        onClick={() => router.push('/quest/create')}
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
