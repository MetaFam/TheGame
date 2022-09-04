import { isAddress } from '@ethersproject/address';
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Input,
  LoadingState,
  MetaButton,
  MultiSelect,
  Select,
  Text,
  Textarea,
  VStack,
} from '@metafam/ds';
import { SelectOption } from '@metafam/ds/src/MultiSelect';
import { Field, FieldDescription } from 'components/Forms/Field';
import { MetaLink } from 'components/Link';
import {
  DiscordRole,
  GuildDaoInput,
  GuildFragment,
  GuildType_Enum,
  Maybe,
  useGetGuildMetadataQuery,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from 'react-hook-form';

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
  daoAddress: {
    required: true,
    validate: (address: string) => isAddress(address),
  },
  daoNetwork: {
    required: true,
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
  type: GuildType_Enum;
  discordAdminRoles: SelectOption[];
  discordMembershipRoles: SelectOption[];
  daos?: Maybe<GuildDaoInput[]>;
}

const placeholderDaoInput = {
  contractAddress: '',
  network: 'mainnet',
  label: null,
  url: null,
};

const getDefaultFormValues = (
  guild: GuildFragment,
  metadata: GuildMetadata | undefined,
  roleOptions: SelectOption[],
): EditGuildFormInputs => {
  const discordAdminRoleIds = metadata?.discordMetadata.administratorRoleIds;
  const discordAdminRoleOptions =
    metadata == null || discordAdminRoleIds == null
      ? []
      : roleOptions.filter((r) => discordAdminRoleIds.includes(r.value));

  const discordMembershipRoleIds = metadata?.discordMetadata.membershipRoleIds;
  const discordMembershipRoleOptions =
    metadata == null || discordMembershipRoleIds == null
      ? []
      : roleOptions.filter((r) => discordMembershipRoleIds.includes(r.value));

  let daos: GuildDaoInput[] = [];
  if (guild.daos?.length > 0) {
    daos = guild.daos.map((d) => ({
      contractAddress: d.contractAddress,
      network: d.network,
      label: d.label,
      url: d.url,
    }));
  } else if (metadata?.discordMetadata?.administratorRoleIds == null) {
    // Only stub out a DAO if they are going through the guild setup process
    daos = [placeholderDaoInput];
  }

  return {
    guildname: guild.guildname,
    name: guild.name,
    description: guild.description || '',
    discordInviteUrl: guild.discordInviteUrl || '',
    joinUrl: guild.joinButtonUrl || '',
    logoUrl: guild.logo || '',
    websiteUrl: guild.websiteUrl || '',
    twitterUrl: guild.twitterUrl || '',
    githubUrl: guild.githubUrl || '',
    type: guild.type,
    discordAdminRoles: discordAdminRoleOptions,
    discordMembershipRoles: discordMembershipRoleOptions,
    daos,
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
  discordMetadata: {
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
  const fetchingMetadata =
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

  const {
    fields: daoFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'daos',
  });

  useEffect(() => {
    const values = getDefaultFormValues(
      workingGuild,
      guildMetadata,
      roleOptions,
    );
    // https://react-hook-form.com/api#useForm
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
        <Box
          borderWidth="1px"
          borderRadius="lg"
          borderColor="rgba(255, 255, 255, 0.25)"
          p={4}
        >
          <Text mb={2}>DAO information</Text>
          <Text fontSize="sm" mb={4}>
            If your guild has one or more DAOs, enter their information here. If
            your DAO is in DAOHaus, we will look up its information from the{' '}
            <MetaLink
              isExternal
              href="https://thegraph.com/hosted-service/subgraph/odyssy-automaton/daohaus"
            >
              DAOHaus Subgraph
            </MetaLink>
            . Otherwise you can provide your own URL to link to.
          </Text>
          {daoFields.map((_, index) => (
            <Box
              key={index}
              background="rgba(255, 255, 255, 0.1)"
              borderRadius="lg"
              p={2}
              mb={4}
            >
              <HStack justifyContent="space-between">
                <Text size="lg" ml={2}>
                  {index + 1}.
                </Text>
                <CloseButton size="sm" onClick={() => remove(index)} />
              </HStack>
              <Box borderRadius="lg" p={2}>
                <Flex direction="row">
                  <Box mr={4}>
                    <Field label="Label">
                      <Input
                        placeholder="DAO, Multisig, etc"
                        {...register(`daos.${index}.label`)}
                        background="dark"
                      />
                    </Field>
                  </Box>
                  <Box flex="1">
                    <Field label="URL">
                      <Input
                        placeholder="https://"
                        {...register(`daos.${index}.url`)}
                        background="dark"
                      />
                      <FieldDescription>
                        An optional URL to link this address to
                      </FieldDescription>
                    </Field>
                  </Box>
                </Flex>
                <Flex direction="row">
                  <Box maxWidth="10rem" mr={4}>
                    <Field label="Network">
                      <Select
                        {...register(`daos.${index}.network`, {
                          required: {
                            value: true,
                            message: 'This is a required field.',
                          },
                        })}
                        background="dark"
                        color="white"
                      >
                        <option key="mainnet" value="mainnet">
                          Mainnet
                        </option>
                        <option key="polygon" value="polygon">
                          Polygon
                        </option>
                        <option key="gnosis" value="gnosis">
                          Gnosis
                        </option>
                      </Select>
                    </Field>
                  </Box>
                  <Box flex="1">
                    <Field
                      label="Address"
                      error={
                        (
                          errors.daos as {
                            contractAddress?: FieldError | undefined;
                          }[]
                        )?.[index]?.contractAddress
                      }
                    >
                      <Input
                        placeholder="0x…"
                        {...register(`daos.${index}.contractAddress`, {
                          required: validations.daoAddress.required,
                          pattern: {
                            value: /^0x([a-zA-Z0-9-]{40})$/,
                            message: 'Invalid contract address',
                          },
                        })}
                        background="dark"
                      />
                      <FieldDescription>
                        The address of the DAO contract, multisig, treasury,
                        etc.
                      </FieldDescription>
                    </Field>
                  </Box>
                </Flex>
              </Box>
            </Box>
          ))}
          <MetaButton size="sm" onClick={() => append(placeholderDaoInput)}>
            Add another
          </MetaButton>
        </Box>

        <Box py={5} w="100%">
          {fetchingMetadata ? (
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
                  render={({ field }) => (
                    <MultiSelect isMulti options={roleOptions} {...field} />
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
                  render={({ field }) => (
                    <MultiSelect isMulti options={roleOptions} {...field} />
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
          {!fetchingMetadata && guildMetadata == null ? (
            <Box>Only a guild administrator can add or modify a guild.</Box>
          ) : (
            <>
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
                isDisabled={fetchingMetadata}
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
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};
