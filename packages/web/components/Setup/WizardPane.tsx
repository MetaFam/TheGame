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
import { Maybe } from '@metafam/utils';
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

export type WizardPaneSubmitProps = {
  status?: Maybe<string | ReactElement>;
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
};

export type WizardPaneProps<T> = WizardPanePromptProps &
  WizardPaneSubmitProps & {
    field: string;
    onSubmit: (values: Record<string, T>) => Promise<void>;
    children: ReactNode;
  };

export type WizardPaneOnSaveProps = {
  query: string;
  values: Record<string, unknown>;
  setStatus: (msg: string) => void;
};

export type PaneProps<T> = WizardPaneProps<T> & {
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
  status,
  onClose,
  buttonLabel,
  onSubmit,
  fetching = false,
  children,
}: PaneProps<T>) => {
  const { connecting, connected, chainId } = useWeb3();
  const {
    handleSubmit,
    formState: { errors, isValidating: validating },
  } = useFormContext();

  const wrongChain = chainId != null && chainId !== '0x1';
  if ((!connecting && !connected) || wrongChain) {
    return <WalletNotConnected {...{ wrongChain }} />;
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
                if (!connected) return 'Connecting wallet…';
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
      <WizardPaneSubmit {...{ status, onClose, buttonLabel }} />
    </FlexContainer>
  );
};

export const WalletNotConnected: React.FC<{ wrongChain: boolean }> = ({
  wrongChain,
}) => (
  <FlexContainer>
    {wrongChain ? <MetaHeading color="white">Wrong Chain</MetaHeading> : null}
    <ConnectToProgress header="" />
  </FlexContainer>
);

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

export const WizardPaneSubmit: React.FC<WizardPaneSubmitProps> = ({
  status,
  buttonLabel,
  onClose,
}) => {
  const { nextButtonLabel } = useSetupFlow();
  return (
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
  );
};
