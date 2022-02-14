import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  MetaHeading,
  Spinner,
  Stack,
  StatusedSubmitButton,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import {
  CeramicError,
  ProfileValueType,
  useProfileField,
  useSaveCeramicProfile,
  useUser,
} from 'lib/hooks';
import {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Control, useForm, UseFormRegisterReturn } from 'react-hook-form';

export type MaybeModalProps = {
  onClose?: () => void;
};

export type WizardPaneProps = {
  field: string;
  title?: string | ReactElement;
  prompt?: string | ReactElement;
  onClose?: () => void;
};

export type WizardPaneCallbackProps<T = string> = {
  register: (
    field: string,
    opts: Record<string, unknown>,
  ) => UseFormRegisterReturn;
  control: Control;
  loading: boolean;
  errored: boolean;
  dirty: boolean;
  current: T;
  setter: (arg: T | ((prev: T) => T)) => void;
};

export const ProfileWizardPane = <T extends ProfileValueType>({
  field,
  title,
  prompt,
  onClose,
  children,
}: PropsWithChildren<WizardPaneProps>) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const { user } = useUser();
  const { value: existing } = useProfileField<T>({
    field,
    player: user,
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValidating: validating },
  } = useForm();
  const current = watch(field, existing);
  const saveToCeramic = useSaveCeramicProfile({
    setStatus,
    fields: [field],
  });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const toast = useToast();

  useEffect(() => {
    setValue(field, existing);
  }, [existing, field, setValue]);

  const onSubmit = useCallback(
    async (values) => {
      try {
        if (current === existing) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else {
          setStatus('Saving to Ceramic…');
          await saveToCeramic({ values });

          if (user) {
            setStatus('Invalidating Cache…');
            await invalidateCache({ playerId: user.id });
          }
        }

        onNextPress();
      } catch (err) {
        const heading = err instanceof CeramicError ? 'Ceramic Error' : 'Error';
        toast({
          title: heading,
          description: (err as Error).message,
          status: 'error',
          isClosable: true,
          duration: 12000,
        });
        setStatus(null);
      }
    },
    [
      current,
      existing,
      invalidateCache,
      onNextPress,
      saveToCeramic,
      toast,
      user,
    ],
  );

  const setter = useCallback(
    (val: T | ((val: T) => T)) => {
      let next = val;
      if (val instanceof Function) {
        next = val(current);
      }
      setValue(field, next);
    },
    [current, field, setValue],
  );

  return (
    <FlexContainer as="form" onSubmit={handleSubmit(onSubmit)}>
      {title && (
        <MetaHeading mb={5} textAlign="center">
          {title}
        </MetaHeading>
      )}
      {typeof prompt === 'string' ? (
        <Text mb={10} textAlign="center">
          {prompt}
        </Text>
      ) : (
        prompt
      )}
      <FormControl isInvalid={!!errors[field]} isDisabled={!user}>
        {!user && (
          <Flex justify="center" my={4}>
            <Spinner thickness="4px" speed="1.25s" size="lg" mr={4} />
            <Text>Loading Current Value…</Text>
          </Flex>
        )}
        {validating && (
          <Stack align="center" mb={4}>
            <Spinner thickness="4px" speed="1.25s" size="lg" />
            <Text>Validating…</Text>
          </Stack>
        )}
        {typeof children === 'function'
          ? children.call(null, {
              register,
              control,
              loading: !user,
              errored: !!errors[field],
              dirty: current !== existing,
              current,
              setter,
            })
          : children}
        <Box>
          <FormErrorMessage style={{ justifyContent: 'center' }}>
            {errors[field]?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>

      <Wrap>
        <WrapItem>
          <StatusedSubmitButton label={nextButtonLabel} {...{ status }} />
        </WrapItem>
        {onClose && (
          <WrapItem>
            <Button
              variant="ghost"
              onClick={onClose}
              color="white"
              _hover={{ bg: '#FFFFFF11' }}
              _active={{ bg: '#FF000011' }}
            >
              Close
            </Button>
          </WrapItem>
        )}
      </Wrap>
    </FlexContainer>
  );
};
