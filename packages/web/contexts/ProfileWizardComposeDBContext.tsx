import { useToast } from '@metafam/ds';
import { ComposeDBProfileFieldMutationValue, Maybe } from '@metafam/utils';
import { CeramicError } from 'lib/errors';
import { useSaveToComposeDB } from 'lib/hooks/useSaveToComposeDB';
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import { SubmitHandler } from 'react-hook-form';
import { errorHandler } from 'utils/errorHandler';

import { useSetupFlow } from './SetupContext';

export type ProfileWizardComposeDBContextType<
  T = ComposeDBProfileFieldMutationValue,
> = {
  onSubmit: SubmitHandler<Record<string, T>>;
  status?: Maybe<string | ReactElement>;
};

const ProfileWizardComposeDBContext =
  createContext<ProfileWizardComposeDBContextType | null>(null);

export type ProfileWizardComposeDBContextProviderOptions = PropsWithChildren<{
  mutationQuery: string;
  isDirty: boolean;
  onClose?: () => void;
}>;

export function ProfileWizardComposeDBContextProvider<T>({
  children,
  mutationQuery,
  isDirty,
  onClose = undefined,
}: ProfileWizardComposeDBContextProviderOptions) {
  const toast = useToast();
  const { onNextPress } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();

  const saveToComposeDB = useSaveToComposeDB({
    query: mutationQuery,
    setStatus,
  });

  const persist = useCallback(
    async (values: T) => {
      const mutationPayload: Record<string, unknown> = {
        input: {
          content: values,
        },
      };

      setStatus('Saving to Ceramic…');
      await saveToComposeDB({ values: mutationPayload });
    },
    [saveToComposeDB],
  );

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      try {
        if (!isDirty) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else if (persist) {
          setStatus('Saving…');
          await persist(values);
        }

        (onClose ?? onNextPress)();
      } catch (err) {
        const heading = err instanceof CeramicError ? 'Ceramic Error' : 'Error';
        toast({
          title: heading,
          description: (err as Error).message,
          status: 'error',
          isClosable: true,
          duration: 12000,
        });
        errorHandler(err as Error);
        setStatus(null);
      }
    },
    [isDirty, onClose, onNextPress, persist, toast],
  );

  return (
    <ProfileWizardComposeDBContext.Provider
      value={{
        onSubmit,
        status,
      }}
    >
      {children}
    </ProfileWizardComposeDBContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext<ProfileWizardComposeDBContextType>(
    ProfileWizardComposeDBContext as unknown as React.Context<ProfileWizardComposeDBContextType>,
  );
  if (!context) {
    throw new Error(
      'useProfileContext must be used under ProfileWizardContextProvider',
    );
  }
  return context;
}
