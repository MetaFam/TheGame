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
  useAddGuildLinkMutation
} from 'graphql/autogen/types';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export interface GuildLinkFormInputs {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const AddGuildLink: React.FC<{
  guildId: string;
  onClose?: any;
}> = ({ guildId, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<GuildLinkFormInputs>({
    mode: 'onTouched',
  });

  const [, addLink] = useAddGuildLinkMutation()

  const toast = useToast();

  const onSubmit = useCallback(
    async (link: GuildLinkFormInputs) => {
      console.log('guildId', guildId)
      const guildLink = {
        guildId: guildId,
        name: link.name || link.type,
        url: link.url,
        type: link.type,
      };
      const { error } = await addLink(guildLink);

      if (error) {
        toast({
          title: 'Error creating link!',
          description:
            'Oops! We were unable to create this link. Please try again.',
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
        onClose()
        throw new Error(`Unable to add link. Error: ${error}`);
      } else {
        toast({
          title: 'Link created successfully!',
          description:
            'The link was successfully created! Please refresh the page to see the changes.',
          status: 'success',
          isClosable: true,
          duration: 8000,
        });
        onClose()
      }
    },
    [addLink, guildId, toast],
  );

  return (
    <Box w="100%">
      <VStack spacing={2}>
        <Field label="Name" error={errors.name}>
          <Input
            {...register('name')}
            isInvalid={!!errors.name}
            background="dark"
          />
        </Field>
        <Field label="Type" error={errors.url}>
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
        <MetaButton
          loadingText="Adding link..."
          onClick={handleSubmit(onSubmit)}
          bg="purple.500"
        >
          Add Link
        </MetaButton>
      </VStack>
    </Box>
  );
};