import {
  Button,
  MetaButton,
  MetaHeading,
  ModalFooter,
  SimpleGrid,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Player_Type, useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { getPlayerTypes } from 'graphql/queries/enums/getPlayerTypes';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

export type Props = {
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupPlayerType: React.FC<Props> = ({ isEdit, onClose }) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const { player } = user ?? {};
  const toast = useToast();

  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();
  const [loading, setLoading] = useState(false);
  const [playerTypeChoices, setPlayerTypeChoices] = useState<Player_Type[]>([]);

  const [playerType, setPlayerType] = useState<Player_Type>();
  const isWizard = !isEdit;

  if (player?.type && !playerType) {
    setPlayerType(player.type);
  }

  useEffect(() => {
    const fetchMyAPI = async () => {
      const response = await getPlayerTypes();
      setPlayerTypeChoices(response);
    };

    fetchMyAPI();
  }, [playerTypeChoices]);

  const handleNextPress = async () => {
    setLoading(true);
    await save();
    onNextPress();
  };

  const save = async () => {
    if (!user) return;

    if (player?.type?.id !== playerType?.id) {
      const { error } = await updateAboutYou({
        playerId: user.id,
        input: {
          playerTypeId: playerType?.id,
        },
      });

      if (error) {
        toast({
          title: 'Error',
          description: `Unable to update player type. Error: ${error}`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <FlexContainer>
      {isWizard && (
        <MetaHeading mb={5} textAlign="center">
          Player Type
        </MetaHeading>
      )}
      <Text mb={10} color={isWizard ? 'current' : 'white'}>
        Please read the features of each player type below. And select the one
        that suits you best.
      </Text>
      <SimpleGrid columns={[1, null, 3, 3]} spacing={4}>
        {playerTypeChoices.map((choice) => (
          <FlexContainer
            key={choice.id}
            p={[4, null, 6]}
            bgColor={
              playerType?.id === choice.id ? 'purpleBoxDark' : 'purpleBoxLight'
            }
            borderRadius="0.5rem"
            _hover={{ bgColor: 'purpleBoxDark' }}
            transition="background 0.25s"
            cursor="pointer"
            onClick={() => setPlayerType(choice)}
            align="stretch"
            justify="flex-start"
            border="2px"
            borderColor={
              playerType?.id === choice.id ? 'purple.400' : 'transparent'
            }
          >
            <Text color="white" fontWeight="bold" mb={4}>
              {choice.title}
            </Text>
            <Text color="blueLight" textAlign="justify">
              {choice.description}
            </Text>
          </FlexContainer>
        ))}
      </SimpleGrid>

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <MetaButton
            mr={3}
            onClick={() => {
              save();
              onClose();
            }}
          >
            Save Changes
          </MetaButton>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{ bg: '#FFFFFF11' }}
          >
            Close
          </Button>
        </ModalFooter>
      )}

      {isWizard && (
        <MetaButton
          onClick={handleNextPress}
          mt={10}
          isDisabled={!playerType}
          isLoading={updateAboutYouRes.fetching || loading}
          loadingText="Saving…"
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
