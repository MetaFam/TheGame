import { ComposeDBProfile, Maybe } from '@metafam/utils';
import { useLinkOwnCeramicNodeMutation } from 'graphql/autogen/types';
import {
  ComposeDBCreateProfileResponseData,
  ComposeDBMutationValues,
} from 'graphql/types';
import { CeramicError, handleCeramicAuthenticationError } from 'lib/errors';
import { useCallback, useState } from 'react';

import { useUser } from '../useUser';
import { useComposeDB } from './useComposeDB';

export type SaveToComposeDBStatus = 'authenticating' | 'querying' | undefined;

export const useSaveToComposeDB = () => {
  const { composeDBClient, connect } = useComposeDB();

  // When saving to ComposeDB, it's essential that we have the most recent value for user.ceramicProfileId so that we don't inadvertently create duplicate profile models. Thus, we specify 'network-only' to ALWAYS fetch the latest value of 'user' from Hasura.
  // Ideally, we should be invalidating the urql cache when persisting the ceramicProfileId below, but that would require switching over to Normalized caching (https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/) which could be a big lift requiring a bunch of testing
  // This is likely causing the warning "Cannot update a component while rendering a different component"
  const { user } = useUser({ requestPolicy: 'network-only' });

  const [, linkNode] = useLinkOwnCeramicNodeMutation();

  const [status, setStatus] = useState<SaveToComposeDBStatus>();

  const save = useCallback(
    async (values: ComposeDBProfile) => {
      if (!composeDBClient) {
        throw new CeramicError(
          'Unable to connect to the Ceramic API to save changes.',
        );
      }
      if (!user) {
        throw new Error('No wallet connected');
      }

      if (!composeDBClient.context.isAuthenticated()) {
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
          const { data } = await linkNode({ documentId });
          if (!data?.linkCeramicProfileNode?.verified) {
            throw new CeramicError(
              `Could not link Ceramic node "${documentId}" to player`,
            );
          }
          return documentId;
        }
        throw new CeramicError(
          'No document ID was available in the createProfile response!',
        );
      }
      return user.ceramicProfileId;
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
