import { Maybe } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { ReactElement, useCallback } from 'react';

export type SaveToComposeDBProps = {
  mutationQuery: string;
  values: Record<string, unknown>;
};

export const useSaveToComposeDB = ({
  setStatus = () => {},
}: {
  setStatus?: (msg?: Maybe<ReactElement | string>) => void;
}) => {
  const { composeDBClient, connect } = useComposeDB();

  const save = useCallback(
    async ({ mutationQuery, values }: SaveToComposeDBProps) => {
      if (!composeDBClient) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }

      if (!composeDBClient.context.authenticated) {
        try {
          setStatus('Authenticating DID…');
          await connect();
        } catch (err) {
          handleCeramicAuthenticationError(err as Error);
        }
      }
      // execute the mutation
      const response = await composeDBClient.executeQuery(
        mutationQuery,
        values,
      );
      if (response.errors) {
        throw response.errors[0];
      }
    },
    [composeDBClient, connect, setStatus],
  );

  return save;
};
