import {
  Box,
  Field,
  Flex,
  Input,
  MetaButton,
  MetaTheme,
  Select,
  Text,
  VStack,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Link, LinkType_Enum, Maybe, Player } from 'graphql/autogen/types';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BoxMetadata, BoxTypes } from 'utils/boxTypes';

import LinkIcon from './LinkIcon';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export interface PlayerLinkFormInputs {
  name: string;
  url?: Maybe<string>;
  type: LinkType_Enum;
}

export const AddPlayerLink: React.FC<{
  player?: Player;
  metadata: BoxMetadata;
  setMetadata: (d: BoxMetadata) => void;
}> = ({ player }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PlayerLinkFormInputs>({
    mode: 'onTouched',
  });

  const onSubmit = useCallback(
    (link: PlayerLinkFormInputs) => {
      const playerLink = { player_id: player?.id, ...link } as Link;
    },
    [player?.id],
  );

  return (
    <Box w="100%">
      <VStack spacing={2}>
        <Field label="Name" error={errors.name}>
          <Input
            {...register('name', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
            })}
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
}) => (
  <ProfileSection
    title="Links"
    type={BoxTypes.PLAYER_LINKS}
    {...{ isOwnProfile, editing }}
  >
    <VStack mt={4} w="full">
      {player.links.map((link) => (
        <a
          href={link.url || ''}
          target="_blank"
          rel="noreferrer"
          style={{ width: '100%' }}
          role="group"
          key={link.id}
        >
          <Flex
            justifyContent="start"
            alignContent="center"
            color={'violet'}
            width={'full'}
            px={4}
            py={3}
            background={'blackAlpha.300'}
            transition={'ease-in-out'}
            transitionDuration={'300'}
            _hover={{
              background: 'blackAlpha.500',
            }}
            _active={{
              background: 'blackAlpha.700',
            }}
            rounded={'md'}
          >
            <LinkIcon type={link.type} />
            <Text mx="auto" fontWeight={600}>
              {link.name}
            </Text>
            <Box
              my="auto"
              mr={1}
              opacity={0}
              _groupHover={{ opacity: 0.8 }}
              _groupActive={{ opacity: 1 }}
            >
              <FaExternalLinkAlt fill="currentColor" />
            </Box>
          </Flex>
        </a>
      ))}
    </VStack>
  </ProfileSection>
);
