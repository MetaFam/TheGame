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
import React, { useState } from 'react';

import { Player, useUpsertDeworkProfileMutation } from '#graphql/autogen/hasura-sdk';

export const SetupDeworkLink: React.FC<{
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
      <FormControl id="deworkURL" mb={4}>
        <FormLabel>
          Input Dework Username
          <Tooltip
            label="It is not currently possible to obtain the username from the Dework API. Please enter your Dework username exactly as it appears on Dework."
            aria-label="It is not currently possible to obtain the username from the Dework API. Please enter your Dework username exactly as it appears on Dework."
            placement="top"
            bgColor={'purple.400'}
            hasArrow
          >
            <InfoIcon ml={2} />
          </Tooltip>
        </FormLabel>
        <Input
          value={deworkURL}
          pl={2}
          type="text"
          inputMode="text"
          placeholder="Example: Sero | Hunters Workshop"
          step="any"
          onChange={({ target: { value } }) => setDeworkURL(value)}
        />
        <FormHelperText color="white">
          Enter exactly as written on Dework
        </FormHelperText>
      </FormControl>
      <Button
        // onClick={() => setPlayerDeworkURL(deworkURL)}
        onClick={() => handleSetUserDeworkURL()}
        _disabled={{
          cursor: 'not-allowed',
        }}
      >
        Proceed
      </Button>
    </>
  );
};
