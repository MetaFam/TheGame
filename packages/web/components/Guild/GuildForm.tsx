import { Box, Input, MultiSelect, Select, Textarea, VStack } from '@metafam/ds';
import { Field } from 'components/Forms/Field';
import {
  DiscordRole,
  GuildFragmentFragment,
  GuildType_Enum,
} from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

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
  discord_admin_roles: {
    required: true,
    min: 1,
  },
  discord_membership_roles: {
    required: true,
    min: 1,
  },
};

export interface EditGuildFormInputs {
  guildname: string;
  name: string;
  description: string | undefined | null;
  discord_invite_url: string | undefined | null;
  join_url: string | undefined | null;
  logo_url: string | undefined | null;
  website_url: string | undefined | null;
  dao_address: string | undefined | null;
  type: GuildType_Enum;
  discord_admin_roles: string[];
  discord_membership_roles: string[];
}

const getDefaultFormValues = (
  guild: GuildFragmentFragment,
): EditGuildFormInputs => ({
  guildname: guild.guildname,
  name: guild.name,
  description: guild.description || '',
  discord_invite_url: guild.discord_invite_url || '',
  join_url: guild.join_button_url || '',
  logo_url: guild.logo || '',
  website_url: guild.website_url || '',
  dao_address: guild.moloch_address || '',
  type: guild.type,
  discord_admin_roles: [],
  discord_membership_roles: [],
});

type Props = {
  workingGuild: GuildFragmentFragment;
  allDiscordRoles: DiscordRole[];
  onSubmit: (data: EditGuildFormInputs) => void;
};

export const GuildForm: React.FC<Props> = ({
  workingGuild,
  allDiscordRoles,
  onSubmit,
}) => {
  const defaultValues = useMemo<EditGuildFormInputs>(
    () => getDefaultFormValues(workingGuild),
    [workingGuild],
  );

  const { register, errors, handleSubmit } = useForm<EditGuildFormInputs>({
    defaultValues,
  });

  const roleOptions = useMemo(
    () =>
      allDiscordRoles.map((role) => ({
        label: role.name,
        value: role.id,
      })),
    [allDiscordRoles],
  );

  return (
    <Box w="100%" maxW="30rem">
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              Your guild&apos;s name. This is what will show throughout
              MetaGame.
            </span>
          </Field>
          <Field label="Description" error={errors.description}>
            <Textarea
              background="dark"
              placeholder="What's your guild all about?"
              name="description"
            />
          </Field>
          <Field label="Logo URL" error={errors.logo_url}>
            <Input type="text" name="logo_url" background="dark" />
            <span>
              Logos should be square (same width and height) and reasonably
              high-resolution.
            </span>
          </Field>
          <Field label="Website URL" error={errors.website_url}>
            <Input type="text" name="join_url" background="dark" />
            <span>Your guild&apos;s main website.</span>
          </Field>
          <Field label="Discord Invite URL" error={errors.discord_invite_url}>
            <Input
              type="text"
              name="discord_invite_url"
              background="dark"
              placeholder="https://discord.gg/fHvx7gu"
            />
            <span>Your public invite URL for your Discord server.</span>
          </Field>
          <Field label="Join URL" error={errors.join_url}>
            <Input type="text" name="join_url" background="dark" />
            <span>The URL that the &quot;JOIN&quot; button will point to.</span>
          </Field>
          <Field label="DAO Address" error={errors.dao_address}>
            <Input
              type="text"
              name="dao_address"
              background="dark"
              placeholder="0x..."
            />
            <span>If your guild has a DAO, enter its address here.</span>
          </Field>
          <Field label="Type">
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
          <Field label="Administrator Roles">
            <MultiSelect
              isRequired
              name="discord_admin_roles"
              isInvalid={!!errors.discord_admin_roles}
              isMulti
              options={roleOptions}
            />
            <span>
              Members of your server with these roles will have administration
              privileges.
            </span>
          </Field>
          <Field label="Membership Roles">
            <MultiSelect
              isRequired
              name="discord_membership_roles"
              isInvalid={!!errors.discord_membership_roles}
              isMulti
              options={roleOptions}
            />
            <span>
              Members of your server with these roles will be considered members
              of this guild.
            </span>
          </Field>
        </form>
      </VStack>
    </Box>
  );
};
