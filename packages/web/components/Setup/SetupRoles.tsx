import {
  Box,
  BoxedNextImage,
  Button,
  CloseIcon,
  Flex,
  Heading,
  InfoIcon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import {
  Player,
  PlayerRole,
  useUpdatePlayerRolesMutation as useUpdateRoles,
} from 'graphql/autogen/hasura-sdk';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useSetupFlow } from '#contexts/SetupContext';
import { getPlayerRoles } from '#graphql/queries/enums/getRoles';
import { useUser } from '#lib/hooks';
import { isEmpty } from '#utils/objectHelpers';

import { MaybeModalProps, WizardPane } from './WizardPane';

export type RoleValue = string;

export type SetupRolesProps = {
  choices: Array<PlayerRole>;
};

export const SetupRoles: React.FC<SetupRolesProps> = ({ choices }) => {
  const { user } = useUser();
  return <EditRoles player={user} {...{ choices }} />;
};

export type EditRolesProps = {
  player: Maybe<Player>;
  choices?: Maybe<Array<PlayerRole>>;
} & MaybeModalProps;

const field = 'roles';

export const EditRoles: React.FC<EditRolesProps> = ({
  player: user,
  choices: inputChoices = null,
  onComplete,
  buttonLabel,
  title = 'Roles',
}) => {
  const { onNextPress } = useSetupFlow();
  const [choices, setChoices] = useState<Maybe<PlayerRole[]>>(inputChoices);
  const [, updateRoles] = useUpdateRoles();
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    const fetchRoles = async () => {
      const roleChoices = await getPlayerRoles();
      setChoices(roleChoices.filter(({ basic }) => basic));
    };

    if (!choices) {
      fetchRoles();
    }
  }, [choices]);

  const roles = useMemo(() => user?.roles.map(({ role }) => role), [user]);

  const onSubmit = useCallback(
    async (values: Record<string, string[]>) => {
      if (values.roles) {
        setStatus('Writing to Hasura…');

        const { error } = await updateRoles({
          [field]: values.roles.map((role, rank) => ({ rank, role })),
        });

        if (error) {
          throw new Error(`Unable to update roles. Error: ${error}`);
        }
      } else {
        setStatus('No Change. Skipping Save…');
        await new Promise((resolve) => {
          setTimeout(resolve, 10);
        });
      }
      (onComplete ?? onNextPress)();
    },
    [onComplete, onNextPress, updateRoles],
  );

  const formMethods = useForm<{ [field]: string[] }>();

  return (
    <FormProvider {...formMethods}>
      <WizardPane
        {...{ field, onComplete, onSubmit, status, buttonLabel }}
        title={title}
        prompt={
          <Text mb={[4, 6]} textAlign="center">
            Unlike other role-playing games, in MetaGame a player is free to
            take multiple roles at the same time.
          </Text>
        }
        fetching={!user}
      >
        <SetupRolesInput {...{ choices, roles }} />
      </WizardPane>
    </FormProvider>
  );
};

type SetupRolesInputProps = {
  choices: Maybe<PlayerRole[]>;
  roles?: string[];
};

const SetupRolesInput: React.FC<SetupRolesInputProps> = ({
  choices,
  roles,
}) => {
  const { register, setValue, watch } = useFormContext();
  const mobile = useBreakpointValue({ base: true, sm: false }) ?? false;

  useEffect(() => {
    setValue(field, roles);
  }, [roles, setValue]);

  const current = watch(field, roles) as Maybe<string[]>;

  if (!choices) {
    return <Text>Loading Role Choices…</Text>;
  }

  const availableRoles =
    choices
      ?.filter(({ role, basic }) => !current?.includes(role) && basic)
      .map(({ role }) => role) ?? [];

  const select = ({ role }: PlayerRole, isPrimary?: boolean) => {
    let out = null;
    const otherRoles = current?.filter((r) => r !== role) ?? [];
    if (isPrimary || isEmpty(otherRoles)) {
      out = [role, ...otherRoles];
    } else {
      out = [...otherRoles, role];
    }
    setValue(field, out);
  };

  const remove = ({ role }: PlayerRole) => {
    if (current) {
      const out = current.filter((r) => r !== role);
      setValue(field, out);
    }
  };

  return (
    <Stack mb={[4, 8]} align="center" w="100%">
      <Input type="hidden" {...register(field, {})} />
      {current ? (
        <>
          <RoleGroup
            title="Primary Role"
            active={true}
            primary={true}
            roles={current.slice(0, 1)}
            numSelectedRoles={current.length}
            {...{ mobile, choices, select, remove }}
          />
          <RoleGroup
            title="Secondary Role"
            active={true}
            roles={current.slice(1)}
            numSelectedRoles={current.length}
            {...{ mobile, choices, select, remove }}
          />
        </>
      ) : null}
      <RoleGroup
        title="Available Role"
        roles={availableRoles}
        {...{ mobile, choices, select }}
      />
    </Stack>
  );
};

export type RoleGroupProps = {
  roles: Array<string>;
  choices: Array<PlayerRole>;
  title: string;
  active?: boolean;
  primary?: boolean;
  numSelectedRoles?: number;
  select?: (role: PlayerRole, primary?: boolean) => void;
  remove?: (role: PlayerRole, primary?: boolean) => void;
  mobile: boolean;
};

const RoleGroup: React.FC<RoleGroupProps> = ({
  roles,
  choices,
  title,
  active,
  primary,
  numSelectedRoles,
  select,
  remove,
  mobile,
}) =>
  roles.length === 0 ? null : (
    <Flex
      mr={[0, 4]}
      my={[2, 4]}
      maxW="fit-content"
      direction="column"
      align={['center', 'stretch']}
    >
      {title && (
        <Heading
          color={active ? 'cyan.500' : 'white'}
          fontWeight="bold"
          mt={2}
          mb={4}
          fontSize={['xs', 'sm']}
        >
          {title}
          {roles.length > 1 ? 's' : null}
        </Heading>
      )}
      <SimpleGrid
        gap={[1.5, 5]}
        mx="auto"
        maxW={['16rem', '17rem', '35rem', '45rem', '60rem', '65rem']}
        columns={[1, 1, 2, 2, 2, 3]}
        gridAutoRows="1fr"
      >
        {roles.map((r) => {
          const choice = choices?.find(({ role }) => role === r);

          return (
            <React.Fragment key={r}>
              {!choice ? (
                <Text textStyle="error">Couldn't find role “{r}”.</Text>
              ) : (
                <Role
                  role={choice}
                  selected={active}
                  onSelect={select}
                  onRemove={remove}
                  {...{ primary, numSelectedRoles, mobile }}
                />
              )}
            </React.Fragment>
          );
        })}
      </SimpleGrid>
    </Flex>
  );

type RoleProps = {
  role: PlayerRole;
  selected?: boolean;
  primary?: boolean;
  numSelectedRoles?: number;
  onSelect?: (role: PlayerRole, isPrimary?: boolean) => void;
  onRemove?: (role: PlayerRole) => void;
  mobile: boolean;
};

const Role: React.FC<RoleProps> = ({
  role,
  selected = false,
  primary = false,
  numSelectedRoles,
  onSelect,
  onRemove,
  mobile = false,
}) => {
  const onClick = () => {
    if (!selected && onSelect) {
      onSelect(role);
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box
      py={{ base: selected ? 1.5 : 2, lg: 4 }}
      px={[selected ? 1.5 : 3, 5]}
      bgColor="purpleBoxDark"
      borderRadius="0.5rem"
      _hover={!selected ? { bgColor: 'purpleBoxLight' } : undefined}
      cursor={!selected ? 'pointer' : 'default'}
      transition="background 0.25s"
      border="1px"
      borderColor="purple.400"
      h={selected ? 'auto' : '100%'}
      w="full"
      {...{ onClick }}
    >
      <Flex h="100%" direction={['row', 'column']}>
        <Flex mb={2} alignItems="center">
          <BoxedNextImage
            src={`/assets/roles/${role.role.toLowerCase()}.svg`}
            alt={role.label}
            h={5}
            w={5}
            // minW={[selected ? 4 : 6, 14]}
            mr={3}
          />
          <Text
            color="white"
            fontWeight={600}
            fontSize={{ base: 'sm', md: 'xl' }}
            casing="uppercase"
            onClick={(evt) => {
              if (selected) {
                evt.stopPropagation();
                setShowDetails((show) => !show);
              }
            }}
          >
            {role.label}
          </Text>
        </Flex>
        {!mobile && <Text color="white">{role.description}</Text>}
        {/* <Spacer direction="column" /> */}
        {mobile && (numSelectedRoles == null || numSelectedRoles <= 1) && (
          <InfoIcon
            ml={1}
            cursor="pointer"
            transform={showDetails ? 'rotate(-180deg)' : undefined}
            transition="0.5s"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails((show) => !show);
            }}
          />
        )}
        {selected && (
          <Flex justifyContent={['end', 'space-between']} mt={[0, 4]} w="100%">
            {numSelectedRoles != null &&
              numSelectedRoles > 1 &&
              (mobile ? (
                <Button
                  variant="solid"
                  textTransform="uppercase"
                  color="white"
                  bgColor="purple.200"
                  borderColor="purple.200"
                  size="xs"
                  whiteSpace="pre-wrap"
                  onClick={() => onSelect?.(role, !primary)}
                >
                  Make {primary ? 'Secondary' : 'Primary'}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="purple.200"
                  borderColor="purple.200"
                  _hover={{ color: 'white', bgColor: 'purple.200' }}
                  fontSize="sm"
                  borderWidth={2}
                  mr={3}
                  whiteSpace="pre-wrap"
                  onClick={() => onSelect?.(role, !primary)}
                >
                  Make {primary ? 'Secondary' : 'Primary'}
                </Button>
              ))}
            {mobile ? (
              <Button
                variant="solid"
                fontWeight="bold"
                textTransform="uppercase"
                color="white"
                bgColor="red.500"
                size="xs"
                onClick={() => onRemove?.(role)}
              >
                <CloseIcon />
              </Button>
            ) : (
              <Button
                variant="outline"
                fontWeight="bold"
                textTransform="uppercase"
                color="red.500"
                borderColor="red.500"
                borderWidth={2}
                _hover={{ color: 'white', bgColor: 'red.500' }}
                fontSize="sm"
                onClick={() => onRemove?.(role)}
              >
                Remove
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      {showDetails && (
        <Text color="white" mt={4} textAlign="justify">
          {role.description}
        </Text>
      )}
    </Box>
  );
};
