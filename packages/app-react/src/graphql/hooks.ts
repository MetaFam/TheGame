import { useEffect } from 'react';

import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import { localQueries } from '../apollo';
import queries from './queries';

export function useMyPlayer() {
  const authStateQuery = useQuery(localQueries.get_authState);
  const [getMyPlayer, myPlayerQuery] = useLazyQuery(queries.get_MyPlayer);

  const playerId = authStateQuery.data?.playerId;

  useEffect(() => {
    if(playerId) {
      getMyPlayer({
        variables: {
          player_id: playerId,
        },
      });
    }
  }, [playerId]);

  return myPlayerQuery;
}
