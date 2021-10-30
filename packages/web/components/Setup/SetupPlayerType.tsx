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
  const toast = useToast();

  const [updateAboutYouRes, updateAboutYou] = useUpdateAboutYouMutation();
  const [loading, setLoading] = useState(false);
  const [playerTypeChoices, setPlayerTypeChoices] = useState<Player_Type[]>([]);

  const [playerType, setPlayerType] = useState<Player_Type>();
  const { user } = useUser({ redirectTo: '/' });
  const isWizard = !isEdit;

  if (user?.player) {
    const { player } = user;
    if (player.type && !playerType) {
      setPlayerType(player.type);
    }
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getPlayerTypes();
      setPlayerTypeChoices(response);
    }

    fetchMyAPI();
  }, [playerTypeChoices]);

  const handleNextPress = async () => {
    setLoading(true);

    save();

    onNextPress();
  };

  const save = async () => {
    if (!user) return;

    if (user.player?.type?.id !== playerType?.id) {
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
        {playerTypeChoices.map((p) => (
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

      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              save();
              onClose();
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{ bg: 'none' }}
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
          loadingText="Saving"
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
