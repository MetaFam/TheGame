import {
  Box,
  chakra,
  FormLabel,
  HStack,
  Image,
  Input,
  MetaButton,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@metafam/ds';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CombinedError } from 'urql';
import { isAddress } from 'viem';

import FileOpenIcon from '#assets/file-open-icon.svg';
import { Field, FieldDescription } from '#components/Forms/Field';
import {
  AddUnverifiedGuildMutation,
  AddUnverifiedGuildMutationVariables,
  GuildFragment,
  GuildType_Enum,
  LinkType_Enum,
  Maybe,
  Player,
  useAddGuildLinkMutation,
  useAddGuildMemberMutation,
} from '#graphql/autogen/hasura-sdk';
import { useWeb3 } from '#lib/hooks';
import { useImageReader } from '#lib/hooks/useImageReader';
import { errorHandler } from '#utils/errorHandler';

export type NewUnverifiedGuild = {
  error?: CombinedError;
  data?: AddUnverifiedGuildMutation;
};

const validations = {
  guildname: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  name: {
    required: true,
    minLength: 4,
  },
  type: {
    required: true,
  },
  daoAddress: {
    required: true,
    validate: (address: string) => isAddress(address),
  },
  daoNetwork: {
    required: true,
  },
  twitterURL: {
    required: true,
  },
  discordInviteURL: {
    required: true,
  },
  githubURL: {
    required: true,
  },
  websiteURL: {
    required: true,
  },
  joinURL: {
    required: true,
  },
};

export interface CreateGuildFormInputs {
  guildname: string;
  name: string;
  description?: Maybe<string>;
  logoURL?: Maybe<string>;
  logoFile?: Maybe<FileList>;
  websiteURL?: Maybe<string>;
  joinURL?: Maybe<string>;
  twitterURL?: Maybe<string>;
  discordInviteURL?: Maybe<string>;
  githubURL?: Maybe<string>;
  type: GuildType_Enum;
  legitimacy: string;
}

type Props = {
  workingGuild?: GuildFragment;
  onSubmit: (
    data: AddUnverifiedGuildMutationVariables,
  ) => Promise<NewUnverifiedGuild>;
  success?: boolean;
  submitting?: boolean;
  hydratePlayer: () => void;
  player: Player;
};

export const UnverifiedGuildForm: React.FC<Props> = ({
  onSubmit,
  success,
  submitting,
  player,
  hydratePlayer,
}) => {
  const readFile = useImageReader();
  const toast = useToast({
    isClosable: true,
    duration: 8000,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateGuildFormInputs>({
    mode: 'onTouched',
  });
  // @to-do: useTheHasuraPlayerHook to load the data with no refresh
  const [, addGuildMember] = useAddGuildMemberMutation();
  const [, addLink] = useAddGuildLinkMutation();
  const [logoURI, setLogoURI] = useState<string | undefined>();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { w3storage } = useWeb3();
  const [watchedFormValues, setWatchedFormValues] =
    useState<CreateGuildFormInputs | null>(null);

  const onFileChange = useCallback(
    async (file?: File) => {
      if (!file) return;
      setLoading(true);

      try {
        const dataURL = await readFile(file);
        setLogoURI(dataURL);
      } catch (e) {
        setErrored(true);
      } finally {
        setLoading(false);
      }
    },
    [readFile],
  );

  const submitForm = useCallback(
    async (createUnverifiedGuild: CreateGuildFormInputs) => {
      setIsSubmitting(true);
      setWatchedFormValues(createUnverifiedGuild);
      const {
        type,
        logoFile,
        logoURL,
        websiteURL,
        githubURL,
        twitterURL,
        description,
        guildname,
        name,
        discordInviteURL,
        joinURL,
      } = createUnverifiedGuild;
      let newLogoURL = logoURL;

      if (logoFile?.[0]) {
        try {
          const ipfsHash = await w3storage?.uploadFile(logoFile[0]);
          newLogoURL = `ipfs://${ipfsHash}`;
        } catch (error) {
          toast({
            title: 'Error Saving Logo',
            description: (error as Error).message,
            status: 'warning',
          });
          errorHandler(error as Error);
          return;
        }
      }

      if (!newLogoURL) throw new Error('Logo must be set for a new guild.');

      try {
        const {
          error,
          data: { insert_guild: response } = { insert_guild: null },
        }: NewUnverifiedGuild = await onSubmit({
          guildname,
          name,
          description,
          logo: newLogoURL,
          websiteURL,
          joinURL,
          type,
        });

        if (error) throw new Error(error.message);
        if (!response) throw new Error('No response from server.');

        const newGuildId = response.returning[0].id;
        if (newGuildId) {
          toast({
            title: 'Guild Information Submitted',
            description: 'Thanks! Your guild will go live shortly. 🚀',
            status: 'success',
          });
          await addGuildMember({
            playerId: player?.id,
            guildId: newGuildId,
          });
          if (twitterURL) {
            await addLink({
              guildId: newGuildId,
              name: 'Find Us On Twitter',
              url: twitterURL,
              type: 'TWITTER' as LinkType_Enum,
            });
          }
          if (discordInviteURL) {
            await addLink({
              guildId: newGuildId,
              name: 'Join Us On Discord',
              url: discordInviteURL,
              type: 'DISCORD' as LinkType_Enum,
            });
          }
          if (githubURL) {
            await addLink({
              guildId: newGuildId,
              name: 'Find Us On Github',
              url: githubURL,
              type: 'GITHUB' as LinkType_Enum,
            });
          }
        }
        hydratePlayer();
      } catch (error) {
        console.error({ error });
        toast({
          title: 'Error Saving Guild',
          description: (error as Error).message ?? 'unknown error',
          status: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      toast,
      onSubmit,
      hydratePlayer,
      addGuildMember,
      player?.id,
      addLink,
      w3storage,
    ],
  );

  return (
    <Box w="100%" pl="5%" pr="5%">
      {isSubmitting && (
        <Box
          bgColor="#604B8B80"
          w="50%"
          h="50%"
          mx="auto"
          borderRadius="8px"
          paddingY="36px"
          paddingX="96px"
        >
          <VStack gap={6}>
            <Text textAlign="center" fontSize="2xl" mt={3}>
              Adding new guild
            </Text>
            <Image
              display={loading ? 'none' : 'inherit'}
              src={logoURI}
              borderRadius="full"
              objectFit="contain"
              h="50%"
              w="50%"
              opacity={logoURI ? 1 : 0.25}
            />
            <Text textAlign="center" fontSize="2xl" mt={3}>
              {watchedFormValues?.name}
            </Text>
            <Text textAlign="center" fontSize="lg">
              {watchedFormValues?.websiteURL}
            </Text>
            <Text textAlign="center" fontSize="lg">
              {watchedFormValues?.type} GUILD
            </Text>
            <Spinner size="xl" color="white" thickness="4px" />
          </VStack>
        </Box>
      )}
      {!isSubmitting && (
        <VStack as="form" onSubmit={handleSubmit(submitForm)}>
          <Field label="Logo *" error={errors.logoURL}>
            <FormLabel
              w="100%"
              h="10em"
              borderRadius="full"
              display="inline-flex"
              overflow="hidden"
              position="relative"
              border="2px solid"
              borderColor={active ? 'blue.400' : 'transparent'}
            >
              <Image
                onLoad={() => setLoading(false)}
                onError={() => setErrored(true)}
                display={loading ? 'none' : 'inherit'}
                src={logoURI ?? FileOpenIcon.src}
                borderRadius="full"
                objectFit="contain"
                h="full"
                w="full"
                opacity={logoURI ? 1 : 0.25}
              />
              {loading &&
                (!logoURI || errored ? (
                  <Image
                    w="5em"
                    mx="2.5em"
                    src={FileOpenIcon.src}
                    opacity={0.5}
                  />
                ) : (
                  <Spinner size="xl" color="purple.500" thickness="4px" />
                ))}
              <Controller
                {...{ control }}
                name="logoFile"
                rules={{ required: true }}
                render={({ field: { onChange, value, ...props } }) => (
                  <Input
                    {...props}
                    type="file"
                    onChange={(evt) => {
                      onChange(evt.target.files);
                      const file = evt.target.files?.[0];
                      onFileChange(file);
                    }}
                    accept="image/*"
                    position="absolute"
                    inset={0}
                    opacity={0}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                  />
                )}
              />
            </FormLabel>
            <FieldDescription>
              Logos should be square (same width and height) and at least
              250px⨯250px.
            </FieldDescription>
          </Field>
          <Field label="Username *" error={errors.guildname}>
            <Input
              {...register('guildname', {
                required: {
                  value: true,
                  message: 'This is a required field.',
                },
                minLength: {
                  value: validations.guildname.minLength,
                  message: `Must be at least ${validations.guildname.minLength} characters.`,
                },
                maxLength: {
                  value: validations.guildname.maxLength,
                  message: `Must be no more than ${validations.guildname.maxLength} characters.`,
                },
              })}
              isInvalid={!!errors.guildname}
              background="dark"
            />
            <FieldDescription>
              A unique identifier to use in URLs for your guild.
            </FieldDescription>
          </Field>
          <Field label="Display Name *" error={errors.name}>
            <Input
              {...register('name', {
                required: {
                  value: true,
                  message: 'This is a required field.',
                },
                minLength: {
                  value: validations.guildname.minLength,
                  message: `Must be at least ${validations.guildname.minLength} characters.`,
                },
              })}
              isInvalid={!!errors.name}
              background="dark"
            />
            <FieldDescription>
              Your guild’s name. This will show throughout MetaGame.
            </FieldDescription>
          </Field>
          <Field label="Description" error={errors.description}>
            <Textarea
              placeholder="What's your guild all about?"
              {...register('description')}
              background="dark"
            />
          </Field>
          <Field label="Website URL" error={errors.websiteURL}>
            <Input {...register('websiteURL')} background="dark" />
            <FieldDescription>Your guild’s main website.</FieldDescription>
          </Field>
          <Field label="Discord Invite URL" error={errors.discordInviteURL}>
            <Input
              placeholder="https://discord.gg/fHvx7gu"
              {...register('discordInviteURL')}
              background="dark"
            />
            <FieldDescription>
              A public invite URL for your Discord server.
            </FieldDescription>
          </Field>
          <Field label="Join URL" error={errors.joinURL}>
            <Input {...register('joinURL')} background="dark" />
            <FieldDescription>
              The URL that the <q>JOIN</q> button will lead to.
            </FieldDescription>
          </Field>
          <Field label="Twitter URL" error={errors.twitterURL}>
            <Input
              placeholder="https://twitter.com/…"
              {...register('twitterURL')}
              background="dark"
            />
            <FieldDescription>Your guild’s home on Twitter.</FieldDescription>
          </Field>
          <Field label="GitHub URL" error={errors.githubURL}>
            <Input
              placeholder="https://github.com/…"
              {...register('githubURL')}
              background="dark"
            />
            <FieldDescription>Your guild’s home on GitHub.</FieldDescription>
          </Field>
          <Field label="Type" error={errors.type}>
            <Select
              {...register('type', {
                required: {
                  value: true,
                  message: 'This is a required field.',
                },
              })}
              isInvalid={!!errors.type}
              bg="dark"
              color="white"
              sx={{ '& > option': { bg: 'dark' } }}
            >
              {Object.entries(GuildType_Enum).map(([key, value]) => (
                <chakra.option key={value} value={value}>
                  {key}
                </chakra.option>
              ))}
            </Select>
          </Field>

          <HStack justify="space-between" mt={10} w="100%">
            <MetaButton
              type="submit"
              m="auto"
              isLoading={submitting}
              loadingText="Submitting information…"
              isDisabled={success || isSubmitting}
              bg="purple.500"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Guild Information'}
            </MetaButton>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};
