import { isAddress } from '@ethersproject/address';
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Input,
  LoadingState,
  MetaButton,
  MultiSelect,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@metafam/ds';
import FileOpenIcon from 'assets/file-open-icon.svg';
import { Field, FieldDescription } from 'components/Forms/Field';
import { MetaLink } from 'components/Link';
import {
  GuildDaoInput,
  GuildFragment,
  GuildType_ActionEnum,
  GuildType_Enum,
  LinkType_Enum,
  Maybe,
  Player,
  useAddGuildLinkMutation,
  useAddGuildMemberMutation,
} from 'graphql/autogen/types';
import { useImageReader } from 'lib/hooks/useImageReader';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { errorHandler } from 'utils/errorHandler';
import { uploadFile } from 'utils/uploadHelpers';

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
  twitterUrl: {
    required: true,
  },
  discordInviteUrl: {
    required: true,
  },
  githubUrl: {
    required: true,
  },
  websiteUrl: {
    required: true,
  },
  joinUrl: {
    required: true,
  },
};

export interface CreateGuildFormInputs {
  guildname: string;
  name: string;
  description?: Maybe<string>;
  logoUrl?: Maybe<string>;
  logoFile?: Maybe<FileList>;
  websiteUrl?: Maybe<string>;
  joinUrl?: Maybe<string>;
  twitterUrl?: Maybe<string>;
  discordInviteUrl?: Maybe<string>;
  githubUrl?: Maybe<string>;
  type: GuildType_Enum;
  legitimacy: string;
}

type Props = {
  workingGuild?: GuildFragment;
  onSubmit: (data: any) => void;
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
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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

  const onFileChange = useCallback(
    async (file: File | undefined) => {
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
      const {
        type,
        logoFile,
        logoUrl,
        websiteUrl,
        githubUrl,
        twitterUrl,
        description,
        guildname,
        name,
        discordInviteUrl,
        joinUrl,
      } = createUnverifiedGuild;

      let newLogoUrl = logoUrl;

      if (logoFile?.[0]) {
        try {
          const ipfsHash = await uploadFile(logoFile[0]);
          newLogoUrl = `ipfs://${ipfsHash}`;
        } catch (error) {
          toast({
            title: 'Error Saving Logo',
            description: (error as Error).message,
            status: 'warning',
            isClosable: true,
            duration: 8000,
          });
          errorHandler(error as Error);
          return;
        }
      }

      try {
        const response: any = await onSubmit({
          guildname,
          name,
          description,
          logo: newLogoUrl,
          websiteUrl,
          joinUrl,
          type,
          legitimacy: 'UNVERIFIED',
        });
        const saveGuildResponse = response.data.insert_guild.returning[0].id;

        if (saveGuildResponse) {
          toast({
            title: 'Guild information submitted',
            description: 'Thanks! Your guild will go live shortly 🚀',
            status: 'success',
            isClosable: true,
            duration: 5000,
          });
          await addGuildMember({
            playerId: player?.id,
            guildId: saveGuildResponse,
          });
          if (twitterUrl) {
            await addLink({
              guildId: saveGuildResponse,
              name: 'Find Us On Twitter',
              url: twitterUrl,
              type: 'TWITTER' as LinkType_Enum,
            });
          }
          if (discordInviteUrl) {
            await addLink({
              guildId: saveGuildResponse,
              name: 'Join Us On Discord',
              url: discordInviteUrl,
              type: 'DISCORD' as LinkType_Enum,
            });
          }
          if (githubUrl) {
            await addLink({
              guildId: saveGuildResponse,
              name: 'Find Us On Github',
              url: githubUrl,
              type: 'GITHUB' as LinkType_Enum,
            });
          }
        }
        hydratePlayer();
        setIsSubmitting(false);
      } catch (error) {
        console.error({ error });
        toast({
          title: 'Error Saving Guild',
          description:
            (error as Error).message ?? 'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
      setIsSubmitting(false);
    },
    [toast, onSubmit, hydratePlayer, addGuildMember, player?.id, addLink],
  );

  return (
    <Box w="100%" pl="5%" pr="5%">
      <VStack>
        <Field label="Logo" error={errors.logoUrl}>
          <Flex
            w="100%"
            h="10em"
            borderRadius="full"
            display="inline-flex"
            overflow="hidden"
            align="center"
            justify="center"
            position="relative"
            border="2px solid"
            borderColor={active ? 'blue.400' : 'transparent'}
          >
            <Image
              onLoad={() => setLoading(false)}
              onError={() => setErrored(true)}
              display={loading ? 'none' : 'inherit'}
              src={logoURI}
              borderRadius="full"
              objectFit="cover"
              h="full"
              w="full"
            />
            {loading &&
              (!logoURI || errored ? (
                <Image w="5em" mx="2.5em" src={FileOpenIcon} opacity={0.5} />
              ) : (
                <Spinner size="xl" color="purple.500" thickness="4px" />
              ))}
            <Controller
              {...{ control }}
              name="logoFile"
              render={({ field: { onChange, value, ...props } }) => (
                <Input
                  {...props}
                  type="file"
                  onChange={(evt) => {
                    onChange(evt.target.files);
                    const file = evt.target.files?.[0];
                    onFileChange(file);
                  }}
                  accept="image/png,image/gif,image/jpeg,image/svg+xml"
                  position="absolute"
                  top={0}
                  bottom={0}
                  left={0}
                  right={0}
                  opacity={0}
                  w="100%"
                  h="100%"
                  onFocus={() => setActive(true)}
                  onBlur={() => setActive(false)}
                />
              )}
            />
          </Flex>
          <FieldDescription>
            Logos should be square (same width and height) and reasonably
            high-resolution.
          </FieldDescription>
        </Field>
        <Field label="Guildname" error={errors.guildname}>
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
            A unique identifier for your guild, like a username.
          </FieldDescription>
        </Field>
        <Field label="Name" error={errors.name}>
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
            Your guild&apos;s name. This is what will show throughout MetaGame.
          </FieldDescription>
        </Field>
        <Field label="Description" error={errors.description}>
          <Textarea
            placeholder="What's your guild all about?"
            {...register('description')}
            background="dark"
          />
        </Field>
        <Field label="Website URL" error={errors.websiteUrl}>
          <Input {...register('websiteUrl')} background="dark" />
          <FieldDescription>Your guild&apos;s main website.</FieldDescription>
        </Field>
        <Field label="Discord Invite URL" error={errors.discordInviteUrl}>
          <Input
            placeholder="https://discord.gg/fHvx7gu"
            {...register('discordInviteUrl')}
            background="dark"
          />
          <FieldDescription>
            A public invite URL for your Discord server.
          </FieldDescription>
        </Field>
        <Field label="Join URL" error={errors.joinUrl}>
          <Input {...register('joinUrl')} background="dark" />
          <FieldDescription>
            The URL that the <q>JOIN</q> button will point to.
          </FieldDescription>
        </Field>
        <Field label="Twitter URL" error={errors.twitterUrl}>
          <Input
            placeholder="https://twitter.com/…"
            {...register('twitterUrl')}
            background="dark"
          />
          <FieldDescription>
            Your guild&apos;s home on Twitter.
          </FieldDescription>
        </Field>
        <Field label="GitHub URL" error={errors.githubUrl}>
          <Input
            placeholder="https://github.com/…"
            {...register('githubUrl')}
            background="dark"
          />
          <FieldDescription>Your guild&apos;s home on GitHub.</FieldDescription>
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
            background="dark"
            color="white"
          >
            {Object.entries(GuildType_Enum).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Select>
        </Field>

        <HStack justify="space-between" mt={10} w="100%">
          <MetaButton
            isLoading={submitting}
            loadingText="Submitting information…"
            onClick={handleSubmit(submitForm)}
            isDisabled={success || isSubmitting}
            bg="purple.500"
          >
            {isSubmitting ? 'Submitting, please wait..' : 'Submit Guild Information'}
          </MetaButton>
        </HStack>
      </VStack>
    </Box>
  );
};
