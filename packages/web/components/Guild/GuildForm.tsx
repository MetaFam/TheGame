import {
  Box,
  HStack,
  Input,
  LoadingState,
  MetaButton,
  MultiSelect,
  Select,
  Textarea,
  VStack,
} from '@metafam/ds';
import { SelectOption } from '@metafam/ds/src/MultiSelect';
import { Field, FieldDescription } from 'components/Forms/Field';
import { MetaLink } from 'components/Link';
import {
  DiscordRole,
  GuildFragment,
  GuildType_Enum,
  Maybe,
  useGetGuildMetadataQuery,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
  discordAdminRoles: {
    validate: (roles: SelectOption[]) => roles != null && roles.length > 0,
  },
  discordMembershipRoles: {
    validate: (roles: SelectOption[]) => roles != null && roles.length > 0,
  },
};

export interface EditGuildFormInputs {
  guildname: string;
  name: string;
  description?: Maybe<string>;
  discordInviteUrl?: Maybe<string>;
  joinUrl?: Maybe<string>;
  logoUrl?: Maybe<string>;
  websiteUrl?: Maybe<string>;
  twitterUrl?: Maybe<string>;
  githubUrl?: Maybe<string>;
  daoAddress?: Maybe<string>;
  type: GuildType_Enum;
  discordAdminRoles: SelectOption[];
  discordMembershipRoles: SelectOption[];
}

const getDefaultFormValues = (
  guild: GuildFragment,
  metadata: GuildMetadata | undefined,
  roleOptions: SelectOption[],
): EditGuildFormInputs => {
  const discordAdminRoleIds = metadata?.discord_metadata.administratorRoleIds;
  const discordAdminRoleOptions =
    metadata == null || discordAdminRoleIds == null
      ? []
      : roleOptions.filter((r) => discordAdminRoleIds.includes(r.value));

  const discordMembershipRoleIds = metadata?.discord_metadata.membershipRoleIds;
  const discordMembershipRoleOptions =
    metadata == null || discordMembershipRoleIds == null
      ? []
      : roleOptions.filter((r) => discordMembershipRoleIds.includes(r.value));

  return {
    guildname: guild.guildname,
    name: guild.name,
    description: guild.description || '',
    discordInviteUrl: guild.discord_invite_url || '',
    joinUrl: guild.join_button_url || '',
    logoUrl: guild.logo || '',
    websiteUrl: guild.website_url || '',
    twitterUrl: guild.twitter_url || '',
    githubUrl: guild.github_url || '',
    daoAddress: guild.moloch_address || '',
    type: guild.type,
    discordAdminRoles: discordAdminRoleOptions,
    discordMembershipRoles: discordMembershipRoleOptions,
  };
};

type Props = {
  workingGuild: GuildFragment;
  onSubmit: (data: EditGuildFormInputs) => void;
  success?: boolean;
  submitting?: boolean;
};

type GuildMetadata = {
  discordRoles: DiscordRole[];
  discord_metadata: {
    membershipRoleIds: string[];
    administratorRoleIds: string[];
  };
};

export const GuildForm: React.FC<Props> = ({
  workingGuild,
  onSubmit,
  success,
  submitting,
}) => {
  const router = useRouter();

  const [getGuildMetadataResponse, getGuildMetadata] = useGetGuildMetadataQuery(
    {
      variables: { id: workingGuild.id },
    },
  );
  const fetchingRoles =
    getGuildMetadataResponse == null || getGuildMetadataResponse.fetching;
  const guildMetadata = getGuildMetadataResponse.data
    ?.guild_metadata[0] as GuildMetadata;

  const loadGuildMetadata = () => {
    getGuildMetadata({ requestPolicy: 'network-only' });
  };

  const roleOptions = useMemo(() => {
    const allDiscordRoles = guildMetadata?.discordRoles || [];
    return allDiscordRoles.map((role) => ({
      label: role.name,
      value: role.id,
    }));
  }, [guildMetadata]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditGuildFormInputs>({
    mode: 'onTouched',
  });

  useEffect(() => {
    const values = getDefaultFormValues(
      workingGuild,
      guildMetadata,
      roleOptions,
    );
    // https://react-hook-form.com/v6/api#useForm
    reset(values);
  }, [workingGuild, guildMetadata, roleOptions, reset]);

  return (
    <Box w="100%" maxW="40rem">
      <VStack>
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
        <Field label="Logo URL" error={errors.logoUrl}>
          <Input {...register('logoUrl')} background="dark" />
          <FieldDescription>
            Logos should be square (same width and height) and reasonably
            high-resolution.
          </FieldDescription>
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
        <Field label="DAO Address" error={errors.daoAddress}>
          <Input
            placeholder="0x…"
            {...register('daoAddress')}
            background="dark"
          />
          <FieldDescription>
            If your guild has a DAO, enter its address here. This is the address
            that will be used to look up your DAO's information from the{' '}
            <MetaLink
              isExternal
              href="https://thegraph.com/hosted-service/subgraph/odyssy-automaton/daohaus"
            >
              DaoHaus Subgraph
            </MetaLink>{' '}
            on Mainnet, Polygon and xDai.
          </FieldDescription>
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
        <Box py={5} w="100%">
          {fetchingRoles ? (
            <Box>
              Fetching roles from Discord…
              <LoadingState />
            </Box>
          ) : (
            <>
              <Field
                label="Administrator Roles"
                error={
                  errors.discordAdminRoles != null
                    ? {
                        type: 'validate',
                        message: 'Required',
                      }
                    : undefined
                }
              >
                <Controller
                  name="discordAdminRoles"
                  {...{ control }}
                  rules={validations.discordAdminRoles}
                  render={(props) => (
                    <MultiSelect isMulti options={roleOptions} {...props} />
                  )}
                />
                <FieldDescription>
                  Members of your Discord server with these roles will have
                  administration privileges.
                </FieldDescription>
              </Field>
              <Field
                label="Membership Roles"
                error={
                  errors.discordMembershipRoles != null
                    ? {
                        type: 'validate',
                        message: 'Required',
                      }
                    : undefined
                }
              >
                <Controller
                  name="discordMembershipRoles"
                  {...{ control }}
                  rules={validations.discordMembershipRoles}
                  render={(props) => (
                    <MultiSelect isMulti options={roleOptions} {...props} />
                  )}
                />
                <FieldDescription>
                  Members of your Discord server with these roles will be
                  considered members of this guild.
                </FieldDescription>
              </Field>
            </>
          )}
        </Box>
        <HStack justify="space-between" mt={10} w="100%">
          <MetaButton
            isLoading={submitting}
            loadingText="Submitting information…"
            onClick={handleSubmit(onSubmit)}
            isDisabled={success}
            bg="purple.500"
          >
            Submit Guild Information
          </MetaButton>
          <MetaButton
            fontSize="xs"
            bg="purple.300"
            colorScheme="facebook"
            isDisabled={fetchingRoles}
            onClick={loadGuildMetadata}
          >
            Reload Roles
          </MetaButton>
          <MetaButton
            onClick={() => router.push('/')}
            isDisabled={submitting || success}
          >
            Cancel
          </MetaButton>
        </HStack>
      </VStack>
    </Box>
  );
};
