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
  Link,
  LinkType_Enum,
  useUpdatePlayerLinkMutation,
} from 'graphql/autogen/hasura-sdk';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BoxMetadata } from '#utils/boxTypes';

export interface PlayerLinkFormInputs {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const EditPlayerLink: React.FC<{
  linkToEdit?: Link;
  metadata?: BoxMetadata;
  setMetadata?: (d: BoxMetadata) => void;
  onClose?: () => void;
}> = ({ linkToEdit, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PlayerLinkFormInputs>({
    mode: 'onTouched',
  });
  const toast = useToast();
  const [, updateLink] = useUpdatePlayerLinkMutation();

  useEffect(() => {
    const values: PlayerLinkFormInputs = {
      name: linkToEdit?.name || '',
      url: linkToEdit?.url || '',
      type: linkToEdit?.type || LinkType_Enum.Other,
    };
    reset(values);
  }, [linkToEdit, reset]);

  const onSubmit = useCallback(
    async (link: PlayerLinkFormInputs) => {
      if (!linkToEdit?.id) throw new Error('Missing link to edit id.');
      const playerLink = {
        id: linkToEdit.id,
        name: link.name || link.type,
        url: link.url,
        type: link.type,
      };
      const { error } = await updateLink(playerLink);

      if (error) {
        const msg = `Unable to update link: "${error}`;
        toast({
          title: 'Error updating link!',
          description: msg,
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
        throw new Error(msg);
      }
      onClose?.();
    },
    [linkToEdit?.id, updateLink, onClose, toast],
  );

  return (
    <Box w="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2}>
        <Field label="Name" error={errors.name}>
          <Input
            {...register('name')}
            isInvalid={!!errors.name}
            background="dark"
          />
        </Field>
        <Field label="Type" error={errors.type}>
          <Select
            sx={{
              textTransform: 'capitalize',
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
            loadingText="Updating link…"
            ml="1rem"
            bg="green.500"
            type="submit"
          >
            Update Link
          </MetaButton>
        </Box>
      </VStack>
    </Box>
  );
};
