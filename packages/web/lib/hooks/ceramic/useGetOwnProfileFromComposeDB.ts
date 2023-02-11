import { ComposeDBField, ComposeDBFieldValue, Optional } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { ComposeDBSelfProfileQueryResult } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);

// todo load from hasura as a fallback ?
export const useQuerySelfFromComposeDB = <T extends ComposeDBFieldValue>({
  field,
}: {
  field: ComposeDBField;
}) => {
  const { composeDBClient, connecting, authenticated, connect } =
    useComposeDB();

  const [result, setResult] = useState<Optional<T>>();
  const [error, setError] = useState<Optional<Error>>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (composeDBClient && !authenticated && !connecting) {
      connect();
    }
  }, [authenticated, composeDBClient, connect, connecting]);

  useEffect(() => {
    if (composeDBClient && authenticated) {
      const query = `
      query GetProfileField {
        viewer {
          profile {
            ${field}
          }
        }
      }
      `;

      setFetching(true);
      composeDBClient
        .executeQuery(query)
        .then((response) => {
          if (response.data != null) {
            const data = response.data as ComposeDBSelfProfileQueryResult<T>;
            if (data.viewer.profile?.[field]) {
              setResult(data.viewer.profile[field]);
            }
          } else if (response.errors) {
            setError(response.errors[0]);
          } else {
            setError(genericFetchError);
          }
        })
        .catch((err) => {
          errorHandler(err);
          setError(genericFetchError);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [authenticated, composeDBClient, field]);

  return { error, fetching, result };
};
