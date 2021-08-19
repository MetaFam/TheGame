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
import { Field } from 'components/Forms/Field';
import {
  DiscordRole,
  GuildFragmentFragment,
  GuildType_Enum,
  useGetGuildMetadataQuery,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
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
  description: string | undefined | null;
  discordInviteUrl: string | undefined | null;
  joinUrl: string | undefined | null;
  logoUrl: string | undefined | null;
  websiteUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  githubUrl: string | undefined | null;
  daoAddress: string | undefined | null;
  type: GuildType_Enum;
  discordAdminRoles: SelectOption[];
  discordMembershipRoles: SelectOption[];
}

const getDefaultFormValues = (
  guild: GuildFragmentFragment,
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
  workingGuild: GuildFragmentFragment;
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

  const [getGuildMetadataResponse] = useGetGuildMetadataQuery({
    variables: { id: workingGuild.id },
  });
  const fetchingRoles =
    getGuildMetadataResponse == null || getGuildMetadataResponse.fetching;
  const guildMetadata = getGuildMetadataResponse.data
    ?.guild_metadata[0] as GuildMetadata;

  const roleOptions = useMemo(() => {
    const allDiscordRoles = guildMetadata?.discordRoles || [];
    return allDiscordRoles.map((role) => ({
      label: role.name,
      value: role.id,
    }));
  }, [guildMetadata]);

  const defaultValues = useMemo<EditGuildFormInputs>(
    () => getDefaultFormValues(workingGuild, guildMetadata, roleOptions),
    [workingGuild, guildMetadata, roleOptions],
  );

  const {
    register,
    errors,
    handleSubmit,
    control,
  } = useForm<EditGuildFormInputs>({
    defaultValues,
    mode: 'onTouched',
  });

  return (
    <Box w="100%" maxW="30rem">
      <VStack>
        <Field label="Guildname" error={errors.guildname}>
          <Input
            type="text"
            isRequired
            name="guildname"
            ref={register(validations.guildname)}
            isInvalid={!!errors.guildname}
            minLength={validations.guildname.minLength}
            maxLength={validations.guildname.maxLength}
            background="dark"
          />
          <span>A unique identifier for your guild, like a username.</span>
        </Field>
        <Field label="Name" error={errors.name}>
          <Input
            type="text"
            isRequired
            name="name"
            ref={register(validations.name)}
            isInvalid={!!errors.name}
            minLength={validations.guildname.minLength}
            background="dark"
          />
          <span>
            Your guild&apos;s name. This is what will show throughout MetaGame.
          </span>
        </Field>
        <Field label="Description" error={errors.description}>
          <Textarea
            background="dark"
            placeholder="What's your guild all about?"
            name="description"
            ref={register}
          />
        </Field>
        <Field label="Logo URL" error={errors.logoUrl}>
          <Input type="text" name="logoUrl" background="dark" ref={register} />
          <span>
            Logos should be square (same width and height) and reasonably
            high-resolution.
          </span>
        </Field>
        <Field label="Website URL" error={errors.websiteUrl}>
          <Input
            type="text"
            name="websiteUrl"
            background="dark"
            ref={register}
          />
          <span>Your guild&apos;s main website.</span>
        </Field>
        <Field label="Discord Invite URL" error={errors.discordInviteUrl}>
          <Input
            type="text"
            name="discordInviteUrl"
            background="dark"
            placeholder="https://discord.gg/fHvx7gu"
            ref={register}
          />
          <span>A public invite URL for your Discord server.</span>
        </Field>
        <Field label="Join URL" error={errors.joinUrl}>
          <Input type="text" name="joinUrl" background="dark" ref={register} />
          <span>The URL that the &quot;JOIN&quot; button will point to.</span>
        </Field>
        <Field label="Twitter URL" error={errors.twitterUrl}>
          <Input
            type="text"
            name="twitterUrl"
            background="dark"
            placeholder="https://twitter.com/..."
            ref={register}
          />
          <span>Your guild&apos;s home on Twitter.</span>
        </Field>
        <Field label="GitHub URL" error={errors.githubUrl}>
          <Input
            type="text"
            name="githubUrl"
            background="dark"
            placeholder="https://github.com/..."
            ref={register}
          />
          <span>Your guild&apos;s home on GitHub.</span>
        </Field>
        <Field label="DAO Address" error={errors.daoAddress}>
          <Input
            type="text"
            name="daoAddress"
            background="dark"
            placeholder="0x..."
            ref={register}
          />
          <span>If your guild has a DAO, enter its address here.</span>
        </Field>
        <Field label="Type" error={errors.type}>
          <Select
            isRequired
            name="type"
            ref={register(validations.type)}
            isInvalid={!!errors.type}
            bg="dark"
            color="white"
          >
            {Object.entries(GuildType_Enum).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Select>
        </Field>
        <Box my={10}>
          {fetchingRoles ? (
            <div>
              Fetching roles from Discord...
              <LoadingState />
            </div>
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
                  control={control}
                  rules={validations.discordAdminRoles}
                  defaultValue={defaultValues.discordAdminRoles}
                  isMulti
                  options={roleOptions}
                  as={MultiSelect}
                />
                <span>
                  Members of your Discord server with these roles will have
                  administration privileges.
                </span>
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
                  control={control}
                  rules={validations.discordMembershipRoles}
                  isMulti
                  options={roleOptions}
                  as={MultiSelect}
                />
                <span>
                  Members of your Discord server with these roles will be
                  considered members of this guild.
                </span>
              </Field>
            </>
          )}
        </Box>
        <HStack justify="space-between" mt={10} w="100%">
          <MetaButton
            isLoading={submitting}
            loadingText="Submitting information..."
            onClick={handleSubmit(onSubmit)}
            isDisabled={success}
          >
            Submit guild information
          </MetaButton>
          <MetaButton
            variant="outline"
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
