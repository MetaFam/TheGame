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
import { PersonalityType } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export type SetupPersonalityTypeProps = {
  personalityTypeChoices: Array<PersonalityType>;
  personalityType: PersonalityType | undefined;
  setPersonalityType: React.Dispatch<
    React.SetStateAction<PersonalityType | undefined>
  >;
}

export const SetupPersonalityType: React.FC<SetupPersonalityTypeProps> = ({
  personalityTypeChoices, personalityType, setPersonalityType
}) => {
  const {
    onNextPress,
    nextButtonLabel,
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();

  const handleNextPress = async () => {
    if (!user) return;

    if (user.player?.EnneagramType?.name !== personalityType?.name) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          enneagram: personalityType?.name
        }
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Unable to update personality type. The octo is sad 😢',
          status: 'error',
          isClosable: true,
        });
        return;
      }
    }

    onNextPress();
  };

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Personality Type
      </MetaHeading>
      <Text mb={10}>
        {`Please select your personality type below. Not sure what type you are? `}
        <MetaLink href="https://enneagramtest.net/" isExternal>
          Take a quick test.
        </MetaLink>
      </Text>
      <SimpleGrid columns={[1, null, 2, 3]} spacing="8">
        {personalityTypeChoices.map((p: PersonalityType) => (
          <HStack
            key={p.id}
            p={6}
            spacing={4}
            bgColor={
              personalityType && personalityType.id === p.id
                ? 'purpleBoxDark'
                : 'purpleBoxLight'
            }
            borderRadius="0.5rem"
            _hover={{ bgColor: 'purpleBoxDark' }}
            transition="background 0.25s"
            cursor="pointer"
            onClick={() => setPersonalityType(p)}
            border="2px"
            borderColor={
              personalityType && personalityType.id === p.id
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
        isDisabled={!personalityType}
        isLoading={updateAboutYouRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
