import {
  HStack,
  Image,
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { SetupContext } from 'contexts/SetupContext';
import { PersonalityType } from 'graphql/types';
import React, { useContext } from 'react';

export const SetupPersonalityType: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    personalityTypes,
    personalityType,
    setPersonalityType,
  } = useContext(SetupContext);
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
        {personalityTypes.map((p: PersonalityType) => (
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
            border={
              personalityType && personalityType.id === p.id
                ? '2px solid #5a32e6'
                : 'none'
            }
          >
            <Image
              w="4rem"
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

      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
