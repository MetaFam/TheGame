import { Box, FormHelperText, Input, VStack } from '@metafam/ds';
import { Field } from 'components/Forms/Field';
import { GuildFragmentFragment, GuildType_Enum } from 'graphql/autogen/types';
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
  onSubmit: (data: EditGuildFormInputs) => void;
};

export const GuildForm: React.FC<Props> = ({ 
  workingGuild,
  onSubmit,
}) => {
  const defaultValues = useMemo<EditGuildFormInputs>(
    () => getDefaultFormValues(workingGuild),
    [workingGuild],
  );

  const { register, errors, handleSubmit } = useForm<EditGuildFormInputs>({
    defaultValues,
  });

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
            />
            <FormHelperText>A unique name for your guild, like a username.</FormHelperText>
          </Field>
        </form>
      </VStack>
    </Box>
  );
};
