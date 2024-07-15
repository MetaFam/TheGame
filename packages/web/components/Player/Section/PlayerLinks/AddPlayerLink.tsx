import {
  Box,
  Field,
  Input,
  MetaButton,
  MetaTheme,
  Select,
  useToast,
  VStack,
} from '@metafam/ds';
import {
  LinkType_Enum,
  Player,
  useAddPlayerLinkMutation,
} from 'graphql/autogen/hasura-sdk';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { BoxMetadata } from '#utils/boxTypes';

export interface PlayerLinkFormInputs {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const AddPlayerLink: React.FC<{
  player?: Player;
  metadata?: BoxMetadata;
  setMetadata?: (d: BoxMetadata) => void;
  onClose?: () => void;
}> = ({ player, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<PlayerLinkFormInputs>({
    mode: 'onTouched',
  });

  const [, addLink] = useAddPlayerLinkMutation();

  const toast = useToast();

  const onSubmit = useCallback(
    async (link: PlayerLinkFormInputs) => {
      const playerLink = {
        playerId: player?.id,
        name: link.name || link.type,
        url: link.url,
        type: link.type,
      };
      const { error } = await addLink(playerLink);

      if (error) {
        const msg = `Unable to create link: "${error}"`;
        toast({
          title: 'Error creating link!',
          description: msg,
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
        throw new Error(msg);
      } else {
        setValue('url', '');
        setValue('name', '');
        setValue('type', LinkType_Enum.Other);
      }
      await onClose?.();
    },
    [player?.id, addLink, onClose, toast, setValue],
  );

  return (
    <Box w="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2}>
        <Field label="Name" error={errors.name}>
          <Input
            {...register('name')}
            isInvalid={!!errors.name}
            background="dark"
            autoFocus={true}
          />
        </Field>
        <Field label="Type" error={errors.type}>
          <Select
            sx={{
              '& > option': {
                backgroundColor: MetaTheme.colors.purpleBoxLight,
              },
              '& > option[value=""]': {
                fontStyle: 'italic',
                opacity: 0.75,
              },
            }}
            {...register('type', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
            })}
            isInvalid={!!errors.type}
            background="dark"
          >
            {Object.entries(LinkType_Enum).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="URL" error={errors.url}>
          <Input
            {...register('url', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
            })}
            isInvalid={!!errors.url}
            background="dark"
          />
        </Field>
        <Box>
          <MetaButton bg="red.500" onClick={onClose} type="button">
            Cancel
          </MetaButton>
          <MetaButton
            loadingText="Adding link…"
            bg="green.500"
            ml="1rem"
            type="submit"
          >
            Add Link
          </MetaButton>
        </Box>
      </VStack>
    </Box>
  );
};
