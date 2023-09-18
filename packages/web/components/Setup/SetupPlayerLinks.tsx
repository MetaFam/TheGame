import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InfoIcon,
  Input,
  Tooltip,
  useToast,
} from '@metafam/ds';
import { Player, useUpsertDeworkProfileMutation } from 'graphql/autogen/types';
import React, { useState } from 'react';

export const SetupPlayerLinks: React.FC<{
  onComplete: () => void;
  player: Player;
}> = ({ player, onComplete }) => {
  const [deworkURL, setDeworkURL] = useState<string>('');
  const [, upsertPlayerDework] = useUpsertDeworkProfileMutation();
  const toast = useToast();

  const handleSetUserDeworkURL = async () => {
    try {
      const response = await upsertPlayerDework({
        playerId: player?.id,
        identifier: deworkURL,
      });
      // Handle the response if necessary.
      // For example, you might want to update the UI based on the mutation's result:
      if (response && response.data) {
        toast({
          title: 'Dework URL successfully changed',
          description: `Please refresh the page to see changes.`,
          status: 'info',
          isClosable: true,
          duration: 8000,
        });
        await onComplete();
      }
    } catch (error) {
      throw Error(
        `Error upserting the Dework profile: ${(error as Error).message}`,
      );
    }
  };

  return (
    <>
      <AddPlayerLink player={player} />
    </>
  );
};
