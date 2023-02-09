import { ComposeDBField, ComposeDBFieldValue, Optional } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { queryLatestFieldFromModel } from 'graphql/composeDB/queries/profile';
import {
  ComposeDBDocumentNode,
  ComposeDBDocumentQueryResult,
} from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

const genericFetchError = new CeramicError(
  'An unexpected error occurred when querying Ceramic.',
);

export function parseFromModel<T>(
  data: Record<string, unknown>,
  indexName: string,
): ComposeDBDocumentNode<T> | undefined {
  const responseData = data[indexName] as ComposeDBDocumentQueryResult<T>;
  return responseData.edges[0]?.node;
}

export function parseSingleFieldFromModel<T extends ComposeDBFieldValue>(
  data: Record<string, unknown>,
  indexName: string,
  field: ComposeDBField,
): T | undefined {
  return parseFromModel<T>(data, indexName)?.[field];
}

// todo load from hasura as a fallback ?
export const useQueryFromComposeDB = <T extends ComposeDBFieldValue>({
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
      const query = queryLatestFieldFromModel(indexName, field);

      setFetching(true);
      composeDBClient
        .executeQuery(query)
        .then((response) => {
          if (response.data != null) {
            setResult(
              parseSingleFieldFromModel<T>(response.data, indexName, field),
            );
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
