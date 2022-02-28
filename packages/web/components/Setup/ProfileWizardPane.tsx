import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import {
  ProfileValueType,
  useProfileField,
  useSaveCeramicProfile,
} from 'lib/hooks';
import { PropsWithChildren, useCallback } from 'react';

import { WizardPane, WizardPaneProps } from './WizardPane';

export const ProfileWizardPane = <T extends ProfileValueType>({
  field,
  children,
  ...props
}: PropsWithChildren<WizardPaneProps>) => {
  const { value, user } = useProfileField<T>({
    field,
  });
  const saveToCeramic = useSaveCeramicProfile({
    fields: [field],
  });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  const onSave = useCallback(
    async ({ values, setStatus }) => {
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
    <WizardPane {...{ field, onSave, value, ...props }}>{children}</WizardPane>
  );
};
