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
  GuildLinksQuery,
  LinkType_Enum,
  useUpdateGuildLinkMutation,
} from 'graphql/autogen/types';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export type GuildLinkList = GuildLinksQuery['link'];
export type GuildLink = GuildLinkList[0];
export type IdlessGuildLink = Omit<GuildLink, 'id'>;

export const EditGuildLink: React.FC<{
  onClose: () => void;
  linkToEdit: GuildLink;
}> = ({ linkToEdit, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IdlessGuildLink>({
    mode: 'onTouched',
  });
  const toast = useToast();

  const [, updateLink] = useUpdateGuildLinkMutation();

  useEffect(() => {
    const values: IdlessGuildLink = {
      name: linkToEdit?.name || '',
      url: linkToEdit?.url || '',
      type: linkToEdit?.type || LinkType_Enum.Other,
    };
    reset(values);
  }, [linkToEdit, reset]);

  const onSubmit = useCallback(
    async (link: IdlessGuildLink) => {
      if (!linkToEdit.id) throw new Error('Missing link to edit’s `id`.');
      if (!link.url) throw new Error('Missing new links `url`.');

      const playerLink = {
        id: linkToEdit.id,
        name: link.name || link.type,
        url: link.url,
        type: link.type,
      };
      const { error } = await updateLink(playerLink);

      if (error) {
        toast({
          title: 'Error updating link!',
          description:
            'Oops! We were unable to update this link. Please try again',
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
        throw new Error(`Unable to add link. Error: ${error}`);
      }
      onClose();
    },
    [linkToEdit.id, updateLink, onClose, toast],
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
          Update Link
        </MetaButton>
      </VStack>
    </Box>
  );
};
