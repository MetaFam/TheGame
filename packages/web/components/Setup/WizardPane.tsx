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
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { ComposeDBProfileFieldMutationValue, Maybe } from '@metafam/utils';
import { ConnectToProgress } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useSetupFlow } from 'contexts/SetupContext';
import { useWeb3 } from 'lib/hooks';
import type { ReactNode } from 'react';
import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

export type MaybeModalProps = {
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
  title?: string | ReactElement;
};

export type WizardPanePromptProps = {
  title?: string | ReactElement;
  prompt?: string | ReactElement;
};

export type WizardPaneProps<T = ComposeDBProfileFieldMutationValue> =
  WizardPanePromptProps & {
    field: string;
    buttonLabel?: string | ReactElement;
    onSubmit: (values: Record<string, T>) => Promise<void>;
    status?: Maybe<string | ReactElement>;
    onClose?: () => void;
    children: ReactNode;
  };

export type WizardPaneOnSaveProps = {
  query: string;
  values: Record<string, unknown>;
  setStatus: (msg: string) => void;
};

export type PaneProps<T = ComposeDBProfileFieldMutationValue> =
  WizardPaneProps<T> & {
    fetching?: boolean;
    authenticating?: boolean;
    onSave?: ({
      query,
      values,
      setStatus,
    }: WizardPaneOnSaveProps) => Promise<void>;
    children: ReactNode;
  };

export const WizardPane = <T,>({
  field,
  title,
  prompt,
  buttonLabel,
  onSubmit,
  status,
  onClose,
  fetching = false,
  children,
}: PaneProps<T>) => {
  const { nextButtonLabel } = useSetupFlow();
  const { connecting, connected, chainId } = useWeb3();
  const {
    handleSubmit,
    formState: { errors, isValidating: validating },
  } = useFormContext();

  if ((!connecting && !connected) || (chainId != null && chainId !== '0x1')) {
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
      <WizardPanePrompt {...{ title, prompt }} />
      <FormControl
        isInvalid={!!errors[field]}
        isDisabled={!connected || fetching}
      >
        {(!connected || fetching || validating) && (
          <Flex justify="center" align="center" my={8}>
            <Spinner thickness="4px" speed="1.25s" size="lg" mr={4} />
            <Text>
              {(() => {
                if (!connected) return 'Connecting to Ceramic…';
                if (validating) return 'Validating…';
                return 'Loading Current Value…';
              })()}
            </Text>
          </Flex>
        )}
        <Box my={5}>
          <>
            {children}
            <FormErrorMessage style={{ justifyContent: 'center' }}>
              {errors[field]?.message?.toString()}
            </FormErrorMessage>
          </>
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

export const WizardPanePrompt: React.FC<WizardPanePromptProps> = ({
  title,
  prompt,
}) => (
  <>
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
  </>
);
