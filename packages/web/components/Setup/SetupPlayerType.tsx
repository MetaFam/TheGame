import {
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { Player_Type, useUpdateAboutYouMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { SetStateAction, useState } from 'react';

export type SetupPlayerTypeProps = {
  playerTypeChoices: Array<Player_Type>;
  playerType: Player_Type | undefined;
  setPlayerType: React.Dispatch<React.SetStateAction<Player_Type | undefined>>;
}

export const SetupPlayerType: React.FC<SetupPlayerTypeProps> = ({
  playerTypeChoices, playerType, setPlayerType
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();
  const [updateAboutYouRes, updateAboutYou] = (
    useUpdateAboutYouMutation()
  );
  const [focused, setFocused] = (
    useState<SetStateAction<number | null>>(null)
  );

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
        console.warn(error); // eslint-disable-line no-console
        toast({
          title: 'Error',
          description: 'Unable to update player type. The octo is sad. 😢',
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
        Please read the features of each player type below.
        Then, select the one that suits you best.
      </Text>
      <SimpleGrid columns={[1, null, 3, 3]} spacing={4} grow={1}>
        {playerTypeChoices.map((p) => (
          <FlexContainer
            key={p.id}
            p={[4, null, 6]}
            tabIndex={0}
            align='stretch'
            justify='flex-start'
            cursor='pointer'
            onClick={() => setPlayerType(p)}
            onFocus={() => setFocused(p.id)}
            onBlur={() => setFocused(null)}
            onKeyPress={(e) => {
              if (p.id === focused && ['Enter', ' '].includes(e.key)) {
                setPlayerType(p)
              }
            }}
            bgColor={
              playerType?.id === p.id
              ? 'purpleBoxDark'
              : 'purpleBoxLight'
            }
            _hover={{
              bgColor: 'purpleBoxDark',
              filter: 'hue-rotate(15deg)',
            }}
            transition="background 0.25s"
            borderWidth={2}
            borderRadius="0.5rem"
            borderColor={
              playerType?.id === p.id
              ? 'purple.400'
              : 'transparent'
            }
          >
            <Text color='white' fontWeight='bold' mb={4}>
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
