import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  MetaHeading,
  Spinner,
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

export type MaybeModalProps = {
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
};

export type WizardPaneProps = {
  field: string;
  title?: string | ReactElement;
  prompt?: string | ReactElement;
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
};

export type PaneProps<T = string> = WizardPaneProps & {
  value: Maybe<T>;
  fetching?: boolean;
  authenticating?: boolean;
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

export const WizardPane = <T,>({
  field,
  title,
  prompt,
  buttonLabel,
  onClose,
  onSave,
  value: existing,
  authenticating = false,
  fetching = false,
  children,
}: PropsWithChildren<PaneProps<T>>) => {
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
        setStatus(null);
      }
    },
    [current, existing, onClose, onNextPress, onSave, toast],
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
    <FlexContainer as="form" onSubmit={handleSubmit(onSubmit)} color="white">
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
      <FormControl
        isInvalid={!!errors[field]}
        isDisabled={authenticating || fetching}
      >
        {(authenticating || fetching || validating) && (
          <Flex justify="center" align="center" my={8}>
            <Spinner thickness="4px" speed="1.25s" size="lg" mr={4} />
            <Text>
              {(() => {
                if (authenticating) return 'Authenticating…';
                if (validating) return 'Validating…';
                return 'Loading Current Value…';
              })()}
            </Text>
          </Flex>
        )}
        <Box my={5}>
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

      <Wrap align="center">
        <WrapItem>
          <StatusedSubmitButton
            label={buttonLabel ?? nextButtonLabel}
            {...{ status }}
          />
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
