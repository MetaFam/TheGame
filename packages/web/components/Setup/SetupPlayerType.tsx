import { MetaButton, MetaHeading, SimpleGrid, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { PlayerType } from 'graphql/types';
import React from 'react';

export const SetupPlayerType: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    playerTypes,
    playerType,
    setPlayerType,
  } = useSetupFlow();
  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Player Type
      </MetaHeading>
      <Text mb={10}>
        Please read the features of each player type below. And select the one
        that suits you best.
      </Text>
      <SimpleGrid columns={[1, null, 2, 3]} spacing="8">
        {playerTypes.map((p: PlayerType) => (
          <FlexContainer
            key={p.id}
            p={6}
            bgColor={
              playerType && playerType.id === p.id
                ? 'purpleBoxDark'
                : 'purpleBoxLight'
            }
            borderRadius="0.5rem"
            _hover={{ bgColor: 'purpleBoxDark' }}
            transition="background 0.25s"
            cursor="pointer"
            onClick={() => setPlayerType(p)}
            align="stretch"
            border={
              playerType && playerType.id === p.id
                ? '2px solid #5a32e6'
                : 'none'
            }
          >
            <Text color="white" fontWeight="bold" mb={4}>
              {p.name}
            </Text>
            <Text color="blueLight">{p.description}</Text>
          </FlexContainer>
        ))}
      </SimpleGrid>

      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
