import React from 'react';
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
import EmptyImg from 'assets/empty.svg'

export type SetupPersonalityTypeProps = {
  // component parts: white, red, etc.
  personalityParts: Array<PersonalityOption>;
  // final combinations: Jund Shard, Izzet Syndicate, etc.
  // keyed on a bitmask of the format 0bWUBRG
  personalityTypes: { [x: number]: PersonalityOption };
  colorMask: number | undefined;
  setColorMask: React.Dispatch<React.SetStateAction<number | undefined>>;
};

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

    if (user.player?.ColorAspect?.mask !== colorMask) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          color_mask: colorMask,
        },
      });

      if (error) {
        console.error(error);

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

  // mask should always only have at most a single bit set
  const toggleMaskElement = (mask: number = 0): void => {
    setColorMask((current = 0) => {
      // eslint-disable-next-line no-bitwise
      if ((mask & current) > 0) {
        return current & ~mask  // if the bit in mask is set, unset it
      }
      return current | mask     // otherwise set it
    })
  } 

  const ColorBar = ({ mask }: { mask: number | undefined }) => (
    <Flex direction='column' mt={10} maxW='100%'>
      <Flex maxW='100%' w='30rem' minH='1.5rem' mb='1rem'>
        {personalityParts.map((part) => {
          if (((mask ?? 0) & part.mask) > 0) {
            return (
              <Flex grow={1} justify='center' opacity={0.75} key={part.mask}>
                <Image
                  src={EmptyImg}
                  h={6}
                  style={{
                    WebkitMaskImage: `url(${part.image})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                />
              </Flex>
            );
          }
        })}
      </Flex>
      <Flex maxW='100%' w='30rem' border='2px' minH='calc(1.5rem + 4px)' borderRadius={3}>
        {personalityParts.map((part) => {
          if (((mask ?? 0) & part.mask) > 0) {
            return (
              <Flex
                key={part.mask}
                grow={1}
                h='1.5rem'
              >
                <svg viewBox='0 0 100 100' preserveAspectRatio='none' width='100%'>
                  <defs>
                    <linearGradient id="shading" gradientTransform="rotate(90)">
                      <stop offset="5%" stopColor="black" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="white" stopOpacity={0.25} />
                    </linearGradient>
                  </defs>
                  <rect width='100%' height='100%' fill={part.name.toLowerCase()}/>
                  <rect width='100%' height='100%' fill='url(#shading)'/>
                </svg>
              </Flex>
            );
          }
        })}
      </Flex>
      <FlexContainer mt={1}>
        <q>{personalityTypes[mask ?? 0].name}</q>
      </FlexContainer>
    </Flex>
  )

  return (
    <FlexContainer minH='50vh' maxW='100%'>
      <Flex direction='column'>
        <MetaHeading mb={5} textAlign="center">
          Person&#xAD;ality Type
        </MetaHeading>
        <Text mb={10}>
          Please select your personality components below. Not sure what type you are?
          <Text as="span"> </Text>
          <MetaLink href="//metafam.github.io/5-color-radar/#/test/" isExternal>
            Take a quick test.
          </MetaLink>
        </Text>
      </Flex>
      <FlexContainer alignContent='center' grow={1} spacing={8} direction='row' wrap='wrap' maxW='70rem'>
        {personalityParts.map((p: PersonalityOption) => (
          <Flex
            key={p.mask}
            p={6}
            m={2}
            spacing={4}
            borderRadius="0.5rem"
            cursor="pointer"
            onClick={() => toggleMaskElement(p.mask)}
            transition="background 0.25s"
            bgColor={
              // eslint-disable-next-line no-bitwise
              (((colorMask ?? 0) & p.mask) > 0)
              ? 'purpleBoxDark'
              : 'purpleBoxLight'
            }
            _hover={{ bgColor: 'purpleBoxDark', bgBlendMode: 'lighten' }}
            border="2px"
            borderColor={
              // eslint-disable-next-line no-bitwise
              (((colorMask ?? 0) & p.mask) > 0)
              ? 'purple.400'
              : 'transparent'
            }
          >
            <Image
              w="100%"
              maxW="4rem"
              h={16}
              src={p.image}
              alt={p.name}
              filter='drop-shadow(0px 0px 6px black)'
              //style={{ mixBlendMode: 'color-dodge' }}
            />
            <FlexContainer align="stretch" ml={2}>
              <Text
                color="white" fontWeight="bold"
                style={{ textTransform: 'uppercase' }}
              >
                {p.label}
              </Text>
              <Text color="blueLight">{p.description}</Text>
            </FlexContainer>
          </Flex>
        ))}
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
