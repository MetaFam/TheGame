import {
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
import { PersonalityPartInfo } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export type SetupPersonalityTypeProps = {
  // component parts: white, red, etc.
  personalityParts: Array<PersonalityPartInfo>;
  // final combinations: Jund Shard, Izzet Syndicate, etc.
  // keyed on a bitmask of the form 0bWUBRG
  personalityTypes: { [x: number]: PersonalityPartInfo };
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

    // eslint-disable-next-line no-console
    console.info({ player: user.player, personalityTypes });

    // if (user.player?.Color !== personalityType?.color_mask) {
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
    // }

    onNextPress();
  };

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
      <SimpleGrid columns={[1, null, 2, 3]} spacing={8}>
        {personalityParts.map((p: PersonalityPartInfo) => (
          <HStack
            key={p.mask}
            p={6}
            spacing={4}
            bgColor={
              // eslint-disable-next-line no-bitwise
              colorMask && (colorMask & p.mask) > 0 // ToDo: implement
                ? 'purpleBoxDark'
                : 'purpleBoxLight'
            }
            borderRadius="0.5rem"
            _hover={{ bgColor: 'purpleBoxDark' }}
            transition="background 0.25s"
            cursor="pointer"
            // eslint-disable-next-line no-bitwise
            onClick={() => setColorMask((m) => (m ?? 0) & p.mask)}
            border="2px"
            borderColor={
              // eslint-disable-next-line no-bitwise
              colorMask && (colorMask & p.mask) > 0
                ? 'purple.400'
                : 'transparent'
            }
          >
            <Image
              w="100%"
              maxW="4rem"
              src={p.image}
              alt={p.name}
              style={{ mixBlendMode: 'color-dodge' }}
            />
            <FlexContainer align="stretch">
              <Text color="white" fontWeight="bold">
                {p.name}
              </Text>
              <Text color="blueLight">{p.description}</Text>
            </FlexContainer>
          </HStack>
        ))}
      </SimpleGrid>

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
