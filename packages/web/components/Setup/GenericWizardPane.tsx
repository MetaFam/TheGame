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
import { CeramicError } from 'lib/hooks';
import {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Control, useForm, UseFormRegisterReturn } from 'react-hook-form';

import { WizardPaneProps } from './ProfileWizardPane';

export type MaybeModalProps = {
  onClose?: () => void;
};

export type GenericPaneProps<T = string> = WizardPaneProps & {
  value: Maybe<T>;
  fetching: boolean;
  onSave?: ({
    values,
    setStatus,
  }: {
    values: Record<string, unknown>;
    setStatus?: (msg: string) => void;
  }) => void;
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

export const GenericWizardPane = <T,>({
  field,
  title,
  prompt,
  onClose,
  onSave,
  value: existing,
  fetching = false,
  children,
}: PropsWithChildren<GenericPaneProps<T>>) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValidating: validating },
  } = useForm();
  const current = watch(field, existing);
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
        } else if (onSave) {
          setStatus('Saving…');
          await onSave({ values, setStatus });
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
    [current, existing, onNextPress, onSave, toast],
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
    <FlexContainer as="form" onSubmit={handleSubmit(onSubmit)}>
      {title && (
        <MetaHeading mb={5} textAlign="center">
          {title}
        </MetaHeading>
      )}
      {typeof prompt === 'string' ? (
        <Text mb={0} textAlign="center">
          {prompt}
        </Text>
      ) : (
        prompt
      )}
      <FormControl isInvalid={!!errors[field]} isDisabled={fetching}>
        {fetching && (
          <Flex justify="center" align="center" my={8}>
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
        <Box mt={10}>
          {typeof children === 'function'
            ? children.call(null, {
                register,
                control,
                loading: fetching,
                errored: !!errors[field],
                dirty: current !== existing,
                current,
                setter,
              })
            : children}
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
