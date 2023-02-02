import { ComposeDBField, Optional } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { ComposeDBDocumentQueryResult } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);
// todo load from hasura as a fallback ?
export const useQueryFromComposeDB = <T>({
  indexName,
  field,
}: {
  indexName: string;
  field: ComposeDBField;
}) => {
  const { composeDBClient } = useComposeDB();

  const [result, setResult] = useState<Optional<T>>();
  const [error, setError] = useState<Optional<Error>>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (composeDBClient) {
      const query = `
      query {
        ${indexName}(first: 1) {
          edges {
            node {
              ${field}
            }
          }
        }
      }`;

      setFetching(true);
      composeDBClient
        .executeQuery(query)
        .then((response) => {
          if (response.data != null) {
            const responseData = response.data[
              indexName
            ] as ComposeDBDocumentQueryResult<T>;
            const fieldValue = responseData.edges[0]?.node[field];
            setResult(fieldValue);
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
  }, [composeDBClient, indexName, field]);

  return { error, fetching, result };
};
