import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import {
  ProfileValueType,
  useProfileField,
  useSaveCeramicProfile,
} from 'lib/hooks';
import React, { useCallback } from 'react';

import { WizardPane, WizardPaneProps } from './WizardPane';

export const ProfileWizardPane = <T extends ProfileValueType>({
  field,
  children,
  ...props
}: WizardPaneProps<T>) => {
  const { value, user } = useProfileField<T>({
    field,
  });
  const saveToCeramic = useSaveCeramicProfile({
    fields: [field],
  });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  const onSave = useCallback(
    async ({
      values,
      setStatus,
    }: {
      values: Record<string, unknown>;
      setStatus: (msg: string) => void;
    }) => {
      setStatus('Saving to Ceramic…');
      await saveToCeramic({ values });

      if (user) {
        setStatus('Invalidating Cache…');
        await invalidateCache({ playerId: user.id });
      }
    },
    [invalidateCache, saveToCeramic, user],
  );

  return (
    <WizardPane<T> {...{ field, onSave, value, ...props }}>
      {children}
    </WizardPane>
  );
};
