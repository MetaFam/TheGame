import { ModelManager } from '@glazed/devtools';
import { DIDDataStore } from '@glazed/did-datastore';
import { TileLoader } from '@glazed/tile-loader';
import {
  Button,
  Flex,
  Image,
  MetaButton,
  MetaHeading,
  ModalFooter,
  Spinner,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { extendedProfileModel } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { ColorBar } from 'components/Player/ColorBar';
import { useSetupFlow } from 'contexts/SetupContext';
import { Maybe } from 'graphql/autogen/types';
import {
  getPersonalityInfo,
  images as BaseImages,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { useUser, useWeb3 } from 'lib/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { dispositionFor } from 'utils/playerHelpers';

export type SetupPersonalityTypeProps = {
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupPersonalityType: React.FC<SetupPersonalityTypeProps> = ({
  isEdit,
  onClose,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const { player } = user ?? {};
  const { ceramic } = useWeb3();
  const toast = useToast();
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const [colorMask, setColorMask] = useState<Maybe<number> | undefined>(
    player?.profile?.colorMask,
  );
  const [{ types, parts }, setPersonalityInfo] = useState<PersonalityInfo>({
    types: {},
    parts: [],
  });
  const isWizard = !isEdit;

  const load = () => {
    if (player) {
      if (colorMask === undefined && player.profile?.colorMask != null) {
        setColorMask(player.profile.colorMask);
      }
    }
  };
  useEffect(load, [player, colorMask]);

  useEffect(() => {
    const fetchInfo = async () =>
      setPersonalityInfo(await getPersonalityInfo());

    fetchInfo();
  }, []);

  const handleNextPress = async () => {
    setStatus('Saving…');

    save();

    onNextPress();
  };

  const save = async () => {
    if (!user) return;

    if (!ceramic) {
      toast({
        title: 'Ceramic Error',
        description: 'Ceramic is not defined. Cannot update.',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    if (user.player?.profile?.colorMask !== colorMask) {
      try {
        if (!ceramic.did?.authenticated) {
          setStatus(<Text>Authenticating DID…</Text>);
          await ceramic.did?.authenticate();
        }

        setStatus(<Text>Saving Color Disposition…</Text>);

        const cache = new Map();
        const loader = new TileLoader({ ceramic, cache });
        const manager = new ModelManager(ceramic);
        manager.addJSONModel(extendedProfileModel);

        const store = new DIDDataStore({
          ceramic,
          loader,
          model: await manager.toPublished(),
        });

        const colorDisposition = dispositionFor(colorMask);
        await store.merge('extendedProfile', { colorDisposition });
      } catch (err) {
        console.warn(err); // eslint-disable-line no-console
        toast({
          title: 'Error',
          description: `Unable to update personality type. Error: ${
            (err as Error).message
          }`,
          status: 'error',
          isClosable: true,
        });
        setStatus(null);
      }
    }
  };

  // mask should always only have at most a single bit set
  const toggleMaskElement = (mask = 0): void => {
    setColorMask((current = 0) => {
      // eslint-disable-next-line no-param-reassign
      current ??= 0; // in case of null
      if ((mask & current) > 0) {
        // if the bit in mask is set
        return current & ~mask; // unset it
      }
      return current | mask; // otherwise set it
    });
  };

  return (
    <FlexContainer spacing={8}>
      <Flex direction="column">
        {isWizard && (
          <MetaHeading mb={5} textAlign="center">
            Person&#xAD;ality Type
          </MetaHeading>
        )}
        <Text mb={10} color={isWizard ? 'current' : 'white'}>
          Please select your personality components below. Not sure what type
          you are?
          <Text as="span"> Take </Text>
          <MetaLink
            href="//dysbulic.github.io/5-color-radar/#/explore/"
            isExternal
          >
            a quick exam
          </MetaLink>
          <Text as="span"> or </Text>
          <MetaLink
            href="//dysbulic.github.io/5-color-radar/#/test/"
            isExternal
          >
            a longer quiz
          </MetaLink>
          .
        </Text>
      </Flex>
      <Wrap spacing={2} justify="center" maxW="70rem">
        {Object.keys(types).length &&
          Object.entries(BaseImages)
            .reverse()
            .map(([orig, image], idx) => {
              const option = types[parseInt(orig, 10)];
              const { mask = 0 } = option ?? {};
              const selected = ((colorMask ?? 0) & mask) > 0;

              return (
                <WrapItem>
                  <Button
                    key={mask}
                    display="flex"
                    direction="row"
                    justifyContent="start"
                    p={6}
                    m={2}
                    h="auto"
                    w={{ base: '100%', md: 'auto' }}
                    spacing={4}
                    borderRadius={8}
                    cursor="pointer"
                    onClick={() => toggleMaskElement(mask)}
                    autoFocus={idx === 0} // Doesn't work
                    ref={(input) => {
                      if (idx === 0 && !input?.getAttribute('focused-once')) {
                        input?.focus();
                        input?.setAttribute('focused-once', 'true');
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (isWizard) handleNextPress();
                        if (isEdit) save();
                        e.preventDefault();
                      }
                    }}
                    transition="background 0.25s, filter 0.5s"
                    bgColor={selected ? 'purpleBoxDark' : 'purpleBoxLight'}
                    _hover={{
                      filter: 'hue-rotate(25deg)',
                    }}
                    _focus={{
                      borderColor: '#FFFFFF55',
                      outline: 'none',
                    }}
                    _active={{
                      bg: selected ? 'purpleBoxDark' : 'purpleBoxLight',
                    }}
                    borderWidth={2}
                    borderColor={selected ? 'purple.400' : 'transparent'}
                  >
                    <Image
                      w="100%"
                      maxW={16}
                      h={16}
                      mr={2}
                      src={image}
                      alt={option.name}
                      filter="drop-shadow(0px 0px 3px black)"
                    />
                    <FlexContainer align="stretch" ml={2}>
                      <Text color="white" casing="uppercase" textAlign="left">
                        {option.name}
                      </Text>
                      <Text
                        color="blueLight"
                        fontWeight="normal"
                        whiteSpace="initial"
                        textAlign="left"
                      >
                        {option.description}
                      </Text>
                    </FlexContainer>
                  </Button>
                </WrapItem>
              );
            })}
      </Wrap>

      <ColorBar
        mask={colorMask ?? null}
        mt={8}
        w="min(90vw, 30rem)"
        personalityInfo={{ types, parts }}
      />

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <MetaButton
                isDisabled={!!status}
                onClick={async () => {
                  await save();
                  onClose();
                }}
              >
                {!status ? (
                  'Save Changes'
                ) : (
                  <Flex align="center">
                    <Spinner mr={3} />
                    {typeof status === 'string' ? (
                      <Text>{status}</Text>
                    ) : (
                      status
                    )}
                  </Flex>
                )}
              </MetaButton>
            </WrapItem>
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
          </Wrap>
        </ModalFooter>
      )}

      {isWizard && (
        <MetaButton
          onClick={handleNextPress}
          mt={10}
          isDisabled={colorMask === undefined}
          isLoading={!!status}
          loadingText={status?.toString() ?? undefined}
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
