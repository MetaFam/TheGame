import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  MetaButton,
  MetaHeading,
  Spinner,
  Stack,
  StatusedSubmitButton,
  Text,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import cursiveTitle from 'assets/cursive-title-small.png';
import discord from 'assets/discord.svg';
import { FlexContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useSetupFlow } from 'contexts/SetupContext';
import { CeramicError, useWeb3 } from 'lib/hooks';
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
  value: Optional<Maybe<T>>;
  fetching?: boolean;
  authenticating?: boolean;
  onSave?: ({
    values,
    setStatus,
  }: {
    values: Record<string, unknown>;
    setStatus?: (msg: string) => void;
  }) => Promise<void>;
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
  setter: (arg: T | ((prev: Optional<Maybe<T>>) => Maybe<T>)) => void;
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
}: PropsWithChildren<PaneProps<T>>) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValidating: validating, dirtyFields },
  } = useForm();
  const current = watch(field, existing);
  const dirty = current !== existing || dirtyFields[field];
  const { connecting, connected, connect } = useWeb3();
  const toast = useToast();

  useEffect(() => {
    setValue(field, existing);
  }, [existing, field, setValue]);

  const onSubmit = useCallback(
    async (values) => {
      try {
        if (!dirty) {
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

  if (!connecting && !connected) {
    return (
      <Stack mt={['-12rem', '-8rem']}>
        <Image w="min(40rem, 100%)" maxW="130%" src={cursiveTitle} />
        <Box align="center" mt="10vh ! important">
          <MetaButton onClick={connect} px={[8, 12]}>
            Connect To Progress
          </MetaButton>
        </Box>
        <Flex justify="center" mt="2rem ! important">
          <Tooltip label="Join Our Discord" hasArrow>
            <MetaButton
              as="a"
              target="_blank"
              href="//discord.gg/metagame"
              p={3}
              mr={5}
              sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
            >
              <Image src={discord} boxSize={6} mr={1.5} /> Get Help
            </MetaButton>
          </Tooltip>
          <Tooltip label="Read Our Wiki" hasArrow>
            <MetaButton
              as="a"
              target="_blank"
              href="//wiki.metagame.wtf"
              p={3}
              sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
            >
              <chakra.span fontSize="150%">📚</chakra.span> Learn More
            </MetaButton>
          </Tooltip>
        </Flex>
      </Stack>
    );
  }

  return (
    <FlexContainer as="form" onSubmit={handleSubmit(onSubmit)} color="white">
      <HeadComponent title={`MetaGame: Setting ${title}`} />
      {title && (
        <MetaHeading mt={8} mb={1} textAlign="center">
          {title}
        </MetaHeading>
      )}
      {prompt && (
        <Box maxW="25rem">
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
