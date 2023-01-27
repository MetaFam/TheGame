import { Maybe } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { ReactElement, useCallback } from 'react';

export type SaveToComposeDBProps = {
  values: Record<string, unknown>;
};

export const useSaveToComposeDB = ({
  query,
  setStatus = () => {},
}: {
  query: string;
  setStatus?: (msg?: Maybe<ReactElement | string>) => void;
}) => {
  const { composeDBClient, connect } = useComposeDB();

  const save = useCallback(
    async ({ values }: SaveToComposeDBProps) => {
      if (!composeDBClient) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }

      if (!composeDBClient.context.authenticated) {
        try {
          setStatus('Authenticating DID…');
          // what exactly does this do? Presumably we need to create a new session
          // in ComposeDBContext
          await connect();
        } catch (err) {
          handleCeramicAuthenticationError(err as Error);
        }
      }
      // execute the mutation
      const response = await composeDBClient.executeQuery(query, values);
      if (response.errors) {
        throw response.errors[0];
      }
    },
    [composeDBClient, connect, query, setStatus],
  );

  return save;
};
