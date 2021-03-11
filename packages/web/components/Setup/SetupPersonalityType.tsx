/* eslint no-bitwise: "off" */

import {
  Flex,
  Image,
  MetaButton,
  MetaHeading,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { MetaGameAliases } from 'graphql/getPersonalityInfo'
import { PersonalityOption } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { SetStateAction,useState } from 'react';

import { ColorBar } from './ColorBar';

export type SetupPersonalityTypeProps = {
  // component parts: white, red, etc.
  personalityParts: Array<PersonalityOption>;
  // final combinations: Jund Shard, Izzet Syndicate, etc.
  // keyed on a bitmask of the format 0bWUBRG
  personalityTypes: { [x: number]: PersonalityOption };
  colorMask: number | undefined;
  setColorMask: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

export const SetupPersonalityType: (
  React.FC<SetupPersonalityTypeProps>
) = ({
  personalityParts,
  personalityTypes,
  colorMask,
  setColorMask,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();
  const [updateAboutYouRes, updateAboutYou] = (
    useUpdateAboutYouMutation()
  );
  // the mask of the currently focused item, if any
  const [focused, setFocused] = (
    useState<SetStateAction<number | null>>(null)
  );

  const handleNextPress = async () => {
    if (!user) return;

    if (user.player?.ColorAspect?.mask !== colorMask) {
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
          description: (
            'Unable to update personality type. The octo is sad. 😢'
          ),
          status: 'error',
          isClosable: true,
        });
        return;
      }
    }

    onNextPress();
  };

  // mask should always only have at most a single bit set
  const toggleMaskElement = (mask = 0): void => {
    setColorMask((current = 0) => {
      if ((mask & current) > 0) { // if the bit in mask is set
        return current & ~mask;   // unset it
      }
      return current | mask;      // otherwise set it
    })
  };

  return (
    <FlexContainer maxW='100%'>
      <Flex direction='column'>
        <MetaHeading mb={5} textAlign="center">
          Person&#xAD;ality Type
        </MetaHeading>
        <Text mb={10}>
          Please select your personality components below.
          Not sure what type you are?
          <Text as="span"> </Text>
          <MetaLink
            href="//metafam.github.io/5-color-radar/#/test/"
            isExternal
          >
            Take a quick test.
          </MetaLink>
        </Text>
      </Flex>
      <FlexContainer
        grow={1} spacing={8} maxW='70rem'
        direction='row' wrap='wrap'
      >
        {Object.entries(MetaGameAliases).map(
          ([orig, { image, label }]) => {
            const option = personalityParts.find(p => p.name === orig)
            const { mask = 0 } = (option ?? {})
            const selected = (((colorMask ?? 0) & mask) > 0)

            return (
              <FlexContainer
                key={mask}
                direction='row'
                p={6} m={2} spacing={4}
                borderRadius='0.5rem'
                cursor='pointer'
                tabIndex={0}
                onClick={() => toggleMaskElement(mask)}
                onFocus={() => setFocused(mask)}
                onBlur={() => setFocused(null)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleNextPress()
                  if (mask === focused && e.key === ' ') {
                    toggleMaskElement(mask)
                  }
                }}
                transition='background 0.25s, filter 0.5s'
                bgColor={
                  selected ? 'purpleBoxDark' : 'purpleBoxLight'
                }
                _hover={{
                  filter: 'hue-rotate(25deg)',
                }}
                _focus={{
                  borderColor: '#FFFFFF55',
                  outline: 'none',
                }}
                borderWidth={2}
                borderColor={
                  selected ? 'purple.400' : 'transparent'
                }
              >
                <Image
                  w='100%' maxW={16} h={16}
                  src={image} alt={label}
                  filter='drop-shadow(0px 0px 6px black)'
                />
                <FlexContainer align="stretch" ml={2}>
                  <Text
                    color='white' fontWeight='bold'
                    style={{ textTransform: 'uppercase' }}
                  >
                    {label}
                  </Text>
                  <Text color='blueLight'>{option?.description}</Text>
                </FlexContainer>
              </FlexContainer>
            )
          }
        )}
      </FlexContainer>

      <ColorBar
        mask={colorMask}
        types={personalityTypes}
        parts={personalityParts}
      />

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
