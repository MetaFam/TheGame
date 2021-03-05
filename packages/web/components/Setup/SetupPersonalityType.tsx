import {
  Flex,
  HStack,
  Image,
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { PersonalityOption } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export type SetupPersonalityTypeProps = {
  // component parts: white, red, etc.
  personalityParts: Array<PersonalityOption>;
  // final combinations: Jund Shard, Izzet Syndicate, etc.
  // keyed on a bitmask of the format 0bWUBRG
  personalityTypes: { [x: number]: PersonalityOption };
  colorMask: number | undefined;
  setColorMask: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type BitToggleType = {
  mask: number;
}

export const SetupPersonalityType: React.FC<SetupPersonalityTypeProps> = ({
  personalityParts,
  personalityTypes,
  colorMask,
  setColorMask,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();

  const handleNextPress = async () => {
    if (!user) return;

    // eslint-disable-next-line no-console
    console.info({ player: user.player, personalityTypes });

    if (user.player?.ColorAspect.mask !== colorMask) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          color_mask: colorMask,
        },
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Unable to update personality type. The octo is sad. 😢',
          status: 'error',
          isClosable: true,
        });
      }
    }

    onNextPress();
  };

  // id should always only have a single bit set
  const toggleMaskElement: BitToggleType = (mask = 0) => {
    setColorMask((current = 0) => {
      // eslint-disable-next-line no-bitwise
      if ((mask & current) > 0) { // if the bit in mask is set, unset it
        return current | ~mask
      } else {                    // otherwise set it
        return mask | mask
      }
    })
  } 

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Personality Type
      </MetaHeading>
      <Text mb={10}>
        Please select your personality type below. Not sure what type you are?
        <Text as="span"> </Text>
        <MetaLink href="//metafam.github.io/5-color-radar/#/test/" isExternal>
          Take a quick test.
        </MetaLink>
      </Text>
      <FlexContainer spacing={8} direction='row' wrap='wrap'>
        {personalityParts.map((p: PersonalityOption) => (
          <Flex
            key={p.mask}
            p={6}
            m={1}
            spacing={4}
            borderRadius="0.5rem"
            cursor="pointer"
            onClick={() => toggleMaskElement(p.mask)}
            transition="background 0.25s"
            bgColor={
              // eslint-disable-next-line no-bitwise
              Number.isInteger(colorMask) && (colorMask ?? 0 & p.mask) > 0 // ToDo: implement
              ? 'purpleBoxDark'
              : 'purpleBoxLight'
            }
            _hover={{ bgColor: 'purpleBoxDark' }}
            border="2px"
            borderColor={
              // eslint-disable-next-line no-bitwise
              Number.isInteger(colorMask) && (colorMask ?? 0 & p.mask) > 0
              ? 'purple.400'
              : 'transparent'
            }
          >
            <Image
              w="100%"
              maxW="4rem"
              src={p.image}
              alt={p.name}
              filter='drop-shadow(0px 0px 6px black)'
              //style={{ mixBlendMode: 'color-dodge' }}
            />
            <FlexContainer align="stretch" ml={2}>
              <Text color="white" fontWeight="bold">
                {p.label}
              </Text>
              <Text color="blueLight">{p.description}</Text>
            </FlexContainer>
          </Flex>
        ))}
      </FlexContainer>

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isDisabled={colorMask === undefined}
        isLoading={updateAboutYouRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
