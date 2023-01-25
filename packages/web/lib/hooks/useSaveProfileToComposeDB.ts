import { Maybe } from '@metafam/utils';
import { mutationComposeDBCreateProfileUsername } from 'graphql/composeDB/mutations/profile';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { ReactElement, useCallback } from 'react';

import { useWeb3 } from './useWeb3';

export const useSaveProfileToComposeDB = ({
  setStatus = () => {},
}: {
  debug?: boolean;
  setStatus?: (msg?: Maybe<ReactElement | string>) => void;
  fields?: Array<string>;
} = {}) => {
  const { composeDBClient } = useWeb3();

  const save = useCallback(
    async ({ username }: { username: string }) => {
      if (!composeDBClient) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }

      if (!composeDBClient.context.authenticated) {
        try {
          setStatus('Authenticating DID…');
          // assuming this obviates the need for setDID(did) call
          await composeDBClient.context.ceramic.did?.authenticate();
        } catch (err) {
          handleCeramicAuthenticationError(err as Error);
        }
      }
      // execute the mutation
      try {
        const response = await composeDBClient.executeQuery(
          mutationComposeDBCreateProfileUsername,
          {
            input: {
              content: {
                username,
              },
            },
          },
        );
        if (response.errors) {
          setStatus('There was an error saving this field');
          console.error(response.errors);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [composeDBClient, setStatus],
  );

  return save;
};
