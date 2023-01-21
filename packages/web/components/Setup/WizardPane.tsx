import { ImageSources } from '@datamodels/identity-profile-basic';
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
import type {
  HasuraImageSourcedProps,
  HasuraProfileProps,
  Maybe,
  Optional,
} from '@metafam/utils';
import { ConnectToProgress } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useSetupFlow } from 'contexts/SetupContext';
import { CeramicError } from 'lib/errors';
import { useWeb3 } from 'lib/hooks';
import type { ReactNode } from 'react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Control, useForm, UseFormRegisterReturn } from 'react-hook-form';
import { errorHandler } from 'utils/errorHandler';

export type MaybeModalProps = {
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
  title?: string | ReactElement;
};

export type WizardPaneProps<T = string> = {
  field: keyof HasuraProfileProps | 'roles' | 'skills';
  title?: string | ReactElement;
  prompt?: string | ReactElement;
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
  children: ReactNode | ((props: WizardPaneCallbackProps<T>) => ReactNode);
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
  setter: (arg: T | null | ((prev: Optional<Maybe<T>>) => Maybe<T>)) => void;
};

export type PaneProps<T = string> = WizardPaneProps<T> & {
  value: Optional<Maybe<T>>;
  fetching?: boolean;
  authenticating?: boolean;
  onSave?: ({
    values,
    images,
    setStatus,
  }: {
    values: Record<string, unknown>;
    images: Record<string, Maybe<ImageSources>>;
    setStatus: (msg: string) => void;
  }) => Promise<void>;
  children: ReactNode | ((props: WizardPaneCallbackProps<T>) => ReactNode);
};

export const WizardPane = <T,>({
  field,
  title,
  prompt,
  buttonLabel,
  onClose,
  onSave,
  value: existing,
  fetching = false,
  children,
}: PaneProps<T>) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValidating: validating, dirtyFields },
    // This is set to any because HasuraProfileProps wasn't working
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>();
  const current = watch(field, existing);
  const dirty = current !== existing || dirtyFields[field];
  const { connecting, connected, chainId } = useWeb3();
  const toast = useToast();

  useEffect(() => {
    setValue(field, existing);
  }, [existing, field, setValue]);

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      try {
        if (!dirty) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else if (onSave) {
          setStatus('Saving…');
          const images: HasuraImageSourcedProps = {};
          // handle image upload of profileImageURL to web3.storage

          if (values.profileImageURL === null) {
            // remove image from ceramic
            images.profileImageURL = null;
            // eslint-disable-next-line no-param-reassign
            delete values.profileImageURL;
          } else if (values.profileImageURL) {
            const formData = new FormData();

            // 'profile' is the key for ceramic, equivalent to profileImageURL in Hasura
            formData.append('profile', values.profileImageURL.file);
            const result = await fetch(`/api/storage`, {
              method: 'POST',
              body: formData,
              credentials: 'include',
            });
            const response = await result.json();
            const { error } = response;
            if (result.status >= 400 || error) {
              throw new Error(
                `web3.storage ${result.status} response: "${
                  error ?? result.statusText
                }"`,
              );
            }
            images.profileImageURL = {
              original: {
                src: `ipfs://${response.profile}`,
                mimeType: values.profileImageURL.file.type,
                width: values.profileImageURL.width,
                height: values.profileImageURL.height,
              },
            } as ImageSources;
            // eslint-disable-next-line no-param-reassign
            delete values.profileImageURL;
          }
          await onSave({ values, images, setStatus });
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
    [dirty, onClose, onNextPress, onSave, toast],
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

  if ((!connecting && !connected) || chainId !== '0x1') {
    return (
      <FlexContainer>
        <MetaHeading color="white">Wrong Chain</MetaHeading>
        <ConnectToProgress header="" />
      </FlexContainer>
    );
  }

  return (
    <FlexContainer
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      color="white"
      align="center"
      pb={8}
    >
      <HeadComponent title={`MetaGame: Setting ${title}`} />
      {title && <MetaHeading textAlign="center">{title}</MetaHeading>}
      {prompt && (
        <Box maxW="25rem" {...(title ? {} : { mt: [0, -4] })}>
          {typeof prompt === 'string' ? (
            <Text mb={0} textAlign="center">
              {prompt}
            </Text>
          ) : (
            prompt
          )}
        </Box>
      )}
      <FormControl
        isInvalid={!!errors[field]}
        isDisabled={!connected || fetching}
      >
        {(!connected || fetching || validating) && (
          <Flex justify="center" align="center" my={8}>
            <Spinner thickness="4px" speed="1.25s" size="lg" mr={4} />
            <Text>
              {(() => {
                if (!connected) return 'Authenticating…';
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
                loading: !connected || fetching,
                errored: !!errors[field],
                dirty,
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
            px={[8, 12]}
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
