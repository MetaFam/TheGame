import {
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export const SetupPlayerType: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    playerTypes,
    playerType,
    setPlayerType
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();

  const handleNextPress = async () => {
    if (!user) return;

    if (user.player?.playerType?.id !== playerType?.id) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          player_type_id: playerType?.id,
        },
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Unable to update player type. The octo is sad 😢',
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
        Player Type
      </MetaHeading>
      <Text mb={10}>
        Please read the features of each player type below. And select the one
        that suits you best.
      </Text>
      <SimpleGrid columns={[1, null, 3, 3]} spacing={4}>
        {playerTypes.map((p) => (
          <FlexContainer
            key={p.id}
            p={[4, null, 6]}
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
            justify="flex-start"
            border="2px"
            borderColor={
              playerType && playerType.id === p.id
                ? 'purple.400'
                : 'transparent'
            }
          >
            <Text color="white" fontWeight="bold" mb={4}>
              {p.title}
            </Text>
            <Text color="blueLight">{p.description}</Text>
          </FlexContainer>
        ))}
      </SimpleGrid>

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isDisabled={!playerType}
        isLoading={updateAboutYouRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
