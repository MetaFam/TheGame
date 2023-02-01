import { ComposeDBField, Optional } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { ComposeDBDocumentQueryResult } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';

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

      composeDBClient.executeQuery(query).then((response) => {
        if (response.data != null) {
          const responseData = response.data[
            indexName
          ] as ComposeDBDocumentQueryResult<T>;
          const fieldValue = responseData.edges[0]?.node[field];
          setResult(fieldValue);
        } else if (response.errors) {
          setError(response.errors[0]);
        } else {
          setError(
            new CeramicError(
              'An unexpected error occurred when querying Ceramic.',
            ),
          );
        }
      });
    }
  }, [composeDBClient, indexName, field]);

  return { error, result };
};
