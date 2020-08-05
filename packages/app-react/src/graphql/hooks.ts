import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';

import { localQueries } from '../apollo';
import { GetPlayerFromId } from './queries';

export function useMyPlayer() {
  const authStateQuery = useQuery(localQueries.GetAuthState);
  const [getMyPlayer, myPlayerQuery] = useLazyQuery(GetPlayerFromId);

  const playerId = authStateQuery.data?.playerId;

  useEffect(() => {
    if (playerId) {
      getMyPlayer({
        variables: {
          player_id: playerId,
        },
      });
    }
  }, [getMyPlayer, playerId]);

  return myPlayerQuery.data?.Player[0];
}
