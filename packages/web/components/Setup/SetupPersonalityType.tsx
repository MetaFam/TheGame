/* eslint no-bitwise: "off" */
import {
  Box,
  Flex,
  Image,
  MetaButton,
  MetaHeading,
  SVG,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { MetaGameAlternates } from 'graphql/getPersonalityInfo'
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
          description: 'Unable to update personality type. The octo is sad. 😢',
          status: 'error',
          isClosable: true,
        });
        return;
      }
    }

    onNextPress();
  };

  // This is just verbose, so I am pulling it out to
  // save space in the main template
  const maskImageStyle = (
    ({ url }: { url: string }): Record<string, string> => ({
      maskImage: `url(${url})`,
      maskSize: 'contain',
      maskPosition: 'center',
      maskRepeat: 'no-repeat',
      WebkitMaskImage: `url(${url})`,
      WebkitMaskSize: 'contain',
      WebkitMaskPosition: 'center',
      WebkitMaskRepeat: 'no-repeat',
    })
  );


  // mask should always only have at most a single bit set
  const toggleMaskElement = (mask = 0): void => {
    setColorMask((current = 0) => {
      if ((mask & current) > 0) { // if the bit in mask is set
        return current & ~mask;   // unset it
      }
      return current | mask;      // otherwise set it
    })
  };

  /* The color bar is below the attribute selection screen,
   * and shows an equally proportioned set of colors with
   * monochrome icons above them.
   */
  const ColorBar = ({ mask = 0 }: { mask: number | undefined }) => (
    <Flex direction='column' mt={10} maxW='100%'>
      <Flex maxW='100%' w='30rem' minH='1.5rem' mb='1rem'>
        {personalityParts.map((part) => (
          ((mask & part.mask) > 0) // if the bit is set
          ? (
            <Flex
              key={part.mask}
              grow={1} justify='center'
              opacity={0.75}
            >
              <Box
                bgColor='white'
                h={6} w={6}
                style={maskImageStyle({
                  url: MetaGameAlternates[part.name].image
                })}
              />
            </Flex>
          ) : ( null )
        ))}
      </Flex>
      <Flex
        minH='calc(1.5rem + 4px)' maxW='100%' w='30rem'
        border='2px' borderRadius={3}
      >
        {personalityParts.map((part) => (
          ((mask & part.mask) > 0)
          ? (
            <Flex
              key={part.mask}
              grow={1}
              h='1.5rem'
            >
              <SVG
                viewBox='0 0 100 100'
                preserveAspectRatio='none'
                w='100%'
              >
                <defs>
                  <linearGradient
                    id="shading"
                    gradientTransform="rotate(90)"
                  >
                    <stop
                      offset="5%"
                      stopColor="black" stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="white" stopOpacity={0.25}
                    />
                  </linearGradient>
                </defs>
                <rect
                  width='100%' height='100%'
                  fill={part.name.toLowerCase()}
                />
                <rect
                  width='100%' height='100%'
                  fill='url(#shading)'
                />
              </SVG>
            </Flex>
          ) : ( null )
        ))}
      </Flex>
      <FlexContainer mt={1}>
        <q>{personalityTypes[mask].name}</q>
      </FlexContainer>
    </Flex>
  )

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
          <MetaLink href="//metafam.github.io/5-color-radar/#/test/" isExternal>
            Take a quick test.
          </MetaLink>
        </Text>
      </Flex>
      <FlexContainer
        grow={1} spacing={8} maxW='70rem'
        direction='row' wrap='wrap'
      >
        {Object.entries(MetaGameAlternates).map(
          ([orig, { image, label }]) => {
            const option = personalityParts.find(p => p.name === orig)

            return (
              <Flex
                key={option?.mask}
                p={6}
                m={2}
                spacing={4}
                borderRadius='0.5rem'
                cursor='pointer'
                onClick={() => toggleMaskElement(option?.mask)}
                align='center'
                transition="background 0.25s"
                bgColor={
                  (((colorMask ?? 0) & (option?.mask ?? 0)) > 0)
                  ? 'purpleBoxDark'
                  : 'purpleBoxLight'
                }
                _hover={{
                  bgColor: 'purpleBoxDark',
                  filter: 'brighten(0.9)',
                }}
                border='2px'
                borderColor={
                  (((colorMask ?? 0) & (option?.mask ?? 0)) > 0)
                  ? 'purple.400'
                  : 'transparent'
                }
              >
                <Image
                  w="100%"
                  maxW="4rem"
                  h={16}
                  src={image}
                  alt={label}
                  filter='drop-shadow(0px 0px 6px black)'
                />
                <FlexContainer align="stretch" ml={2}>
                  <Text
                    color="white" fontWeight="bold"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {label}
                  </Text>
                  <Text color="blueLight">{option?.description}</Text>
                </FlexContainer>
              </Flex>
            )
          }
        )}
      </FlexContainer>

      <ColorBar mask={colorMask}/>

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
