import {
  Button,
  Flex,
  Image,
  MetaButton,
  MetaHeading,
  ModalFooter,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { ColorBar } from 'components/Player/ColorBar';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateAboutYouMutation } from 'graphql/autogen/types';
import {
  getPersonalityInfo,
  images as BaseImages,
} from 'graphql/queries/enums/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

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
  const toast = useToast();
  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();
  const [loading, setLoading] = useState(false);
  const [personalityTypes, setPersonalityTypes] = useState<{
    [x: number]: PersonalityOption;
  }>([]);
  const isWizard = !isEdit;

  const [colorMask, setColorMask] = useState<number | undefined>(
    user?.player?.color_aspect?.mask,
  );

  const load = () => {
    const { player } = user ?? {};
    if (player) {
      if (colorMask === undefined && player.color_aspect !== null) {
        setColorMask(player.color_aspect?.mask);
      }
    }
  };

  useEffect(load, [user, colorMask]);

  useEffect(() => {
    async function fetchMyAPI() {
      const { types } = await getPersonalityInfo();
      setPersonalityTypes(types);
    }

    fetchMyAPI();
  }, []);

  const handleNextPress = async () => {
    setLoading(true);

    save();

    onNextPress();
  };

  const save = async () => {
    if (!user) return;
    if (user.player?.color_aspect?.mask !== colorMask) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          color_mask: colorMask,
        },
      });

      if (error) {
        console.warn(error); // eslint-disable-line no-console
        toast({
          title: 'Error',
          description: 'Unable to update personality type. The octo is sad. 😢',
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  // mask should always only have at most a single bit set
  const toggleMaskElement = (mask = 0): void => {
    setColorMask((current = 0) => {
      if ((mask & current) > 0) {
        // if the bit in mask is set
        return current & ~mask; // unset it
      }
      return current | mask; // otherwise set it
    });
  };

  return (
    <FlexContainer>
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
        {Object.keys(personalityTypes).length &&
          Object.entries(BaseImages)
            .reverse()
            .map(([orig, image], idx) => {
              const option = personalityTypes[parseInt(orig, 10)];
              const { mask = 0 } = option ?? {};
              const selected = ((colorMask ?? 0) & mask) > 0;

              return (
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
              );
            })}
      </FlexContainer>

      <ColorBar mask={colorMask} mt={8} w="min(90vw, 30rem)" />

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              save();
              onClose();
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{ bg: 'none' }}
          >
            Close
          </Button>
        </ModalFooter>
      )}

      {isWizard && (
        <MetaButton
          onClick={handleNextPress}
          mt={10}
          isDisabled={colorMask === undefined}
          isLoading={updateAboutYouRes.fetching || loading}
          loadingText="Saving"
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
