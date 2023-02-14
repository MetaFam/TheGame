import { ComposeDBProfile, Maybe } from '@metafam/utils';
import { useComposeDB } from 'contexts/ComposeDBContext';
import { useLinkOwnCeramicNodeMutation } from 'graphql/autogen/types';
import {
  ComposeDBCreateProfileResponseData,
  ComposeDBMutationValues,
} from 'graphql/types';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { useCallback, useState } from 'react';

import { useUser } from '../useUser';

export type SaveToComposeDBProps = {
  values: ComposeDBProfile;
};

export type SaveToComposeDBStatus = 'authenticating' | 'querying' | undefined;

export const useSaveToComposeDB = () => {
  const { composeDBClient, connect } = useComposeDB();
  const { user } = useUser();
  const [, linkNode] = useLinkOwnCeramicNodeMutation();

  const [status, setStatus] = useState<SaveToComposeDBStatus>();

  const save = useCallback(
    async ({ values }: SaveToComposeDBProps) => {
      if (!composeDBClient) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }
      if (!user) {
        throw new Error('No wallet connected');
      }

      if (!composeDBClient.context.authenticated) {
        try {
          setStatus('authenticating');
          await connect();
        } catch (err) {
          handleCeramicAuthenticationError(err as Error);
        }
      }

      // determine if this is a create or update query
      const mutationQuery = buildQuery(user.ceramicProfileId);
      const mutationPayload: ComposeDBMutationValues = {
        input: {
          content: values,
        },
      };
      if (user.ceramicProfileId) {
        mutationPayload.input.id = user.ceramicProfileId;
      }
      setStatus('querying');
      // execute the mutation
      const response = await composeDBClient.executeQuery(
        mutationQuery,
        mutationPayload,
      );
      setStatus(undefined);
      if (response.errors) {
        throw response.errors[0];
      }

      // if a node was just created, persist in Hasura
      if (!user.ceramicProfileId) {
        const queryResponse = response.data?.[
          user.ceramicProfileId ? 'updateProfile' : 'createProfile'
        ] as ComposeDBCreateProfileResponseData;
        const documentId = queryResponse?.document.id;
        if (documentId) {
          await linkNode({ documentId });
        } else {
          throw new CeramicError(
            'No document ID was available in the createProfile response!',
          );
        }
      }
    },
    [composeDBClient, connect, linkNode, user],
  );

  return { save, status };
};

const buildQuery = (existingCeramicNodeId?: Maybe<string>) => {
  const query = existingCeramicNodeId
    ? `
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      document {
        id
      }
    }
  }`
    : `
  mutation createProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      document {
        id
      }
    }
  }`;

  return query;
};
