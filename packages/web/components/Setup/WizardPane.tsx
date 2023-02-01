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
import { ConnectToProgress } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useProfileContext } from 'contexts/ProfileWizardContext';
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

export type WizardPaneProps = {
  title?: string | ReactElement;
  prompt?: string | ReactElement;
  buttonLabel?: string | ReactElement;
  onClose?: () => void;
  children: ReactNode;
};

export type WizardPaneOnSaveProps = {
  query: string;
  values: Record<string, unknown>;
  setStatus: (msg: string) => void;
};

export type PaneProps = WizardPaneProps & {
  fetching?: boolean;
  authenticating?: boolean;
  onSave?: ({
    query,
    values,
    setStatus,
  }: WizardPaneOnSaveProps) => Promise<void>;
  children: ReactNode;
};

export const WizardPane = ({
  title,
  prompt,
  buttonLabel,
  onClose,
  fetching = false,
  children,
}: PaneProps) => {
  const { nextButtonLabel } = useSetupFlow();
  const { connecting, connected, chainId } = useWeb3();
  const {
    handleSubmit,
    formState: { errors, isValidating: validating },
  } = useFormContext();
  const { errored, field, onSubmit, status } = useProfileContext();

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
      <FormControl isInvalid={errored} isDisabled={!connected || fetching}>
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
