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
  useGetPlayerLinksNoCacheMutation,
} from 'graphql/autogen/types';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { BoxMetadata } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
  admin?: boolean;
  switchToEdit?: any;
  onClose?: any;
};

export interface PlayerLinkFormInputs {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const AddPlayerLink: React.FC<{
  player?: Player;
  metadata?: BoxMetadata;
  setMetadata?: (d: BoxMetadata) => void;
  onClose?: any;
}> = ({ player }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PlayerLinkFormInputs>({
    mode: 'onTouched',
  });

  const [, getPlayerLinks] = useGetPlayerLinksNoCacheMutation();
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
        toast({
          title: 'Error creating link!',
          description:
            'Oops! We were unable to create this link. Please try again.',
          status: 'error',
          isClosable: true,
          duration: 8000,
        });
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
      }
      const now = new Date().toISOString();
      await getPlayerLinks({ playerId: player?.id, updatedAt: now });
    },
    [addLink, player?.id, toast, getPlayerLinks],
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
