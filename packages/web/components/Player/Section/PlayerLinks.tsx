import {
  Box,
  Button,
  DeleteIcon,
  EditIcon,
  Field,
  Flex,
  Input,
  MetaButton,
  MetaTheme,
  Select,
  Text,
  useToast,
  VStack,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  Link,
  LinkType_Enum,
  Player,
  useAddPlayerLinkMutation,
  useDeletePlayerLinkMutation,
  useGetPlayerLinksNoCacheMutation,
  useUpdatePlayerLinkMutation,
} from 'graphql/autogen/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BoxMetadata, BoxTypes } from 'utils/boxTypes';

import LinkIcon from './LinkIcon';
import { Links } from './Links';

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

export const PlayerLinks: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
  admin,
  switchToEdit,
  onClose,
}) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [, deleteLink] = useDeletePlayerLinkMutation();
  const toast = useToast();
  const [, getPlayerLinks] = useGetPlayerLinksNoCacheMutation();

  useEffect(() => {
    if (!player?.id) return;
    (async () => {
      const now = new Date().toISOString();
      getPlayerLinks({ playerId: player.id, updatedAt: now }).then((res) => {
        setLinks(res?.data?.update_player?.returning[0].links || []);
      });
    })();
  }, [player.id, admin, getPlayerLinks]);

  const deleteSingleLink = async (id: string) => {
    const { error } = await deleteLink({ id });

    if (error) {
      toast({
        title: 'Error deleting link!',
        description:
          'Oops! We were unable to delete this link. Please try again.',
        status: 'error',
        isClosable: true,
        duration: 8000,
      });
      throw new Error(`Unable to delete link. Error: ${error}`);
    } else {
      toast({
        title: 'Link deleted successfully!',
        description:
          'The link was successfully deleted! Please refresh the page to see the changes.',
        status: 'success',
        isClosable: true,
        duration: 8000,
      });
    }
    if (admin) {
      onClose();
    }
  };

  return (
    <ProfileSection
      title="Links"
      type={BoxTypes.PLAYER_LINKS}
      {...{ isOwnProfile, editing }}
    >
      <Links
        player={player}
        admin={admin}
        switchToEdit={switchToEdit}
        onClose={onClose}
      />
    </ProfileSection>
  );
};

export const EditPlayerLink: React.FC<{
  linkToEdit?: Link;
  metadata?: BoxMetadata;
  setMetadata?: (d: BoxMetadata) => void;
  onClose?: any;
  editId?: string;
}> = ({ linkToEdit, editId, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PlayerLinkFormInputs>({
    mode: 'onTouched',
  });
  const toast = useToast();

  const [, addLink] = useAddPlayerLinkMutation();
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
      if (!editId) return;
      const playerLink = {
        id: editId,
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
      } else {
        toast({
          title: 'Link updated successfully!',
          description:
            'The link was successfully updated! Please refresh the page to see the changes.',
          status: 'success',
          isClosable: true,
          duration: 8000,
        });
      }
      onClose();
    },
    [updateLink, editId, toast, onClose],
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
