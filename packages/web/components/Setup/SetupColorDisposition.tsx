import {
  Button,
  Flex,
  Image,
  MetaButton,
  MetaHeading,
  ModalFooter,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { ColorBar } from 'components/Player/ColorBar';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  Maybe,
  useInsertCacheInvalidationMutation,
} from 'graphql/autogen/types';
import {
  getPersonalityInfo,
  images as BaseImages,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { useUser } from 'lib/hooks';
import { useProfileField } from 'lib/store';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSaveCeramicProfile } from 'utils/cacheHelper';
import { isEmpty } from 'utils/objectHelpers';

export type SetupColorDispositionProps = {
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupColorDisposition: React.FC<SetupColorDispositionProps> = ({
  isEdit,
  onClose,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const [status, setStatus] = useState<Maybe<ReactElement | string>>(null);
  const { value: existingMask } = useProfileField<number>({
    field: 'colorMask',
    player: user,
    owner: true,
  });
  const [mask, setMask] = useState(existingMask);
  const params = useRouter();
  const saveToCeramic = useSaveCeramicProfile({ debug: !!params.query.debug });
  const [, invalidateCache] = useInsertCacheInvalidationMutation();
  const [{ types, parts }, setPersonalityInfo] = useState<PersonalityInfo>({
    types: {},
    parts: [],
  });
  const isWizard = !isEdit;

  useEffect(() => {
    const fetchInfo = async () =>
      setPersonalityInfo(await getPersonalityInfo());

    fetchInfo();
  }, []);

  const handleNextPress = async () => {
    await save();
    onNextPress();
  };

  const save = async () => {
    setStatus('Saving to Ceramic…');
    await saveToCeramic({
      values: { colorMask: mask ?? undefined },
      setStatus,
    });

    if (user) {
      setStatus('Invalidating Cache…');
      await invalidateCache({ playerId: user.id });
    }
  };

  // newMask should always only have at most a single bit
  // set — the one being toggled
  const toggleMaskElement = (newMask = 0): void => {
    setMask((current = 0) => {
      // eslint-disable-next-line no-param-reassign
      current ??= 0; // in case of null
      if ((newMask & current) > 0) {
        // if the bit in mask is set
        return current & ~newMask; // unset it
      }
      return current | newMask; // otherwise set it
    });
  };

  return (
    <FlexContainer
      as="form"
      onSubmit={async (evt) => {
        evt.preventDefault();
        await save();
        onClose?.();
      }}
    >
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
      <FlexContainer
        grow={1}
        spacing={8}
        maxW="70rem"
        direction="row"
        wrap="wrap"
        id="colors"
      >
        {!isEmpty(types) &&
          Object.entries(BaseImages)
            .reverse()
            .map(([orig, image], idx) => {
              const option = types?.[parseInt(orig, 10)];
              const { mask: thisMask = 0 } = option ?? {};
              const selected = ((mask ?? 0) & thisMask) > 0;

              return (
                <Button
                  key={thisMask}
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
                  onClick={() => toggleMaskElement(thisMask)}
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
                    alt={option?.name}
                    filter="drop-shadow(0px 0px 3px black)"
                  />
                  <FlexContainer align="stretch" ml={2}>
                    <Text color="white" casing="uppercase" textAlign="left">
                      {option?.name}
                    </Text>
                    <Text
                      color="blueLight"
                      fontWeight="normal"
                      whiteSpace="initial"
                      textAlign="left"
                    >
                      {option?.description}
                    </Text>
                  </FlexContainer>
                </Button>
              );
            })}
      </FlexContainer>

      <ColorBar
        mask={mask ?? null}
        mt={8}
        w="min(90vw, 30rem)"
        personalityInfo={{ types, parts }}
      />

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <Wrap justify="center" align="center" flex={1}>
            <WrapItem>
              <MetaButton type="submit" isDisabled={!!status}>
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
          isDisabled={mask === undefined}
          isLoading={!!status}
          loadingText={status?.toString() ?? undefined}
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
