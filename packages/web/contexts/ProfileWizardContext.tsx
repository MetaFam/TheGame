import { useToast } from '@metafam/ds';
import { HasuraProfileProps, Maybe, Optional } from '@metafam/utils';
import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import { CeramicError } from 'lib/errors';
import { useProfileField, useWeb3 } from 'lib/hooks';
import { useSaveToComposeDB } from 'lib/hooks/useSaveToComposeDB';
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { errorHandler } from 'utils/errorHandler';

import { useSetupFlow } from './SetupContext';

export type ProfileWizardContextType<T = string> = {
  current: T;
  dirty: boolean;
  errored: boolean;
  field: keyof HasuraProfileProps | 'roles' | 'skills';
  loading: boolean;
  onSubmit: SubmitHandler<any>;
  setter: (arg: T | ((prev: Optional<Maybe<T>>) => Maybe<T>)) => void;
  status?: Maybe<string | ReactElement>;
};

export const ProfileWizardContext = createContext<ProfileWizardContextType>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  undefined!,
);

export type ProfileWizardContextProviderOptions = PropsWithChildren<{
  field: keyof HasuraProfileProps | 'roles' | 'skills';
  query: string;
  fetching?: boolean;
  onClose?: () => void;
}>;

export const ProfileWizardContextProvider: React.FC<
  ProfileWizardContextProviderOptions
> = ({ children, field, query, fetching = false, onClose = null }) => {
  const { onNextPress } = useSetupFlow();
  const toast = useToast();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const { connected } = useWeb3();

  const { value: existing, user } = useProfileField({
    field,
  });

  const formMethods = useForm<any>();
  const {
    setValue,
    watch,
    formState: { errors, dirtyFields },
    // This is set to any because HasuraProfileProps wasn't working
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = formMethods;
  const current = watch(field, existing);
  const dirty = current !== existing || dirtyFields[field];

  useEffect(() => {
    setValue(field, existing);
  }, [existing, field, setValue]);

  const saveToComposeDB = useSaveToComposeDB({ query, setStatus });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  const persist = useCallback(
    async (values: any) => {
      const mutationPayload: Record<string, unknown> = {
        input: {
          content: values,
        },
      };

      setStatus('Saving to Ceramic…');
      await saveToComposeDB({ values: mutationPayload });

      if (user) {
        setStatus('Invalidating Cache…');
        await invalidateCache({ playerId: user.id });
      }
    },
    [invalidateCache, saveToComposeDB, user],
  );

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      try {
        if (!dirty) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else if (persist) {
          setStatus('Saving…');
          await persist(values);
        }

        (onClose ?? onNextPress).call(this);
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
    [dirty, onClose, onNextPress, persist, toast],
  );

  const setter = useCallback(
    (val: unknown) => {
      let next = val;
      if (val instanceof Function) {
        next = val(current);
      }
      setValue(field, next);
    },
    [current, field, setValue],
  );

  return (
    <FormProvider {...formMethods}>
      <ProfileWizardContext.Provider
        value={{
          current,
          dirty,
          errored: !!errors[field],
          field,
          loading: !connected || fetching,
          onSubmit,
          setter,
          status,
        }}
      >
        {children}
      </ProfileWizardContext.Provider>
    </FormProvider>
  );
};

export const useProfileContext = (): ProfileWizardContextType =>
  useContext(ProfileWizardContext);
