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
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
} from '@metafam/ds';
import { Maybe, Optional } from '@metafam/utils';
import {
  PlayerRole,
  useUpdatePlayerRolesMutation as useUpdateRoles,
} from 'graphql/autogen/types';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { useOverridableField, useUser } from 'lib/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { isEmpty } from 'utils/objectHelpers';

import { WizardPane, WizardPaneCallbackProps } from './WizardPane';

export type RoleValue = string;

export type SetupRolesProps = {
  choices?: Maybe<Array<PlayerRole>>;
  isEdit?: boolean;
  onClose?: () => void;
  buttonLabel?: Optional<string | ReactElement>;
};

export const SetupRoles: React.FC<SetupRolesProps> = ({
  choices: inputChoices = null,
  onClose,
  buttonLabel,
}) => {
  const field = 'roles';
  const { user } = useUser();
  const [choices, setChoices] = useState<Maybe<Array<PlayerRole>>>(
    inputChoices,
  );
  const [, updateRoles] = useUpdateRoles();
  const { value: roles, setter: setRoles } = useOverridableField<Array<string>>(
    {
      field,
      loaded: !!user,
    },
  );
  const mobile = useBreakpointValue({ base: true, sm: false }) ?? false;

  useEffect(() => {
    const fetchRoles = async () => {
      const roleChoices = await getPlayerRoles();
      setChoices(roleChoices.filter(({ basic }) => basic));
    };

    if (!choices) {
      fetchRoles();
    }
  }, [choices]);

  useEffect(() => {
    if (user && setRoles && !roles) {
      setRoles(user.roles.map(({ role }) => role));
    }
  }, [user, setRoles, roles]);

  const onSave = async ({
    values,
    setStatus,
  }: {
    values: Record<string, unknown>;
    setStatus?: (msg: string) => void;
  }) => {
    const { roles: toSet } = values as { ['roles']: Array<string> };

    setStatus?.('Writing to Hasura…');

    const { error } = await updateRoles({
      [field]: toSet.map((role, rank) => ({ rank, role })),
    });

    if (error) {
      throw new Error(`Unable to update roles. Error: ${error}`);
    }

    if (setRoles) {
      setStatus?.('Setting Local State…');
      setRoles(toSet);
    }
  };

  return (
    <WizardPane<Array<string>>
      {...{ field, onClose, onSave, buttonLabel }}
      value={roles}
      title="Roles"
      prompt={
        <Text mb={[4, 6]} textAlign="center">
          Unlike other role-playing games, in MetaGame a player is free to take
          multiple roles at the same time.
        </Text>
      }
      fetching={!user}
    >
      {({
        register,
        current,
        setter,
      }: WizardPaneCallbackProps<Array<string>>) => {
        if (!choices) {
          return <Text>Loading Role Choices…</Text>;
        }

        if (!current) return null;

        const availableRoles =
          choices
            ?.filter(({ role, basic }) => !current?.includes(role) && basic)
            .map(({ role }) => role) ?? [];

        const select = ({ role }: PlayerRole, isPrimary?: boolean) => {
          if (current) {
            let out = null;
            const otherRoles = current.filter((r) => r !== role);
            if (isPrimary || isEmpty(otherRoles)) {
              out = [role, ...otherRoles];
            } else {
              out = [...otherRoles, role];
            }
            setter(out);
          }
        };

        const remove = ({ role }: PlayerRole) => {
          if (current) {
            const out = current.filter((r) => r !== role);
            setter(out);
          }
        };

        return (
          <Stack mb={[4, 8]}>
            <Input type="hidden" {...register(field, {})} />
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
            <RoleGroup
              title="Available Role"
              roles={availableRoles}
              {...{ mobile, choices, select }}
            />
          </Stack>
        );
      }}
    </WizardPane>
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
    <Box mr={[0, 4]} my={[2, 4]}>
      {title && (
        <Heading
          align="center"
          flexDirection="column"
          color={active ? 'cyan.500' : 'white'}
          fontWeight="bold"
          casing="uppercase"
          my={2}
          fontSize={['xs', 'sm']}
        >
          {title}
          {roles.length > 1 ? 's' : null}
        </Heading>
      )}
      <SimpleGrid
        gap={[1.5, 5]}
        mx="auto"
        maxW={['16rem', '17rem', '35rem', '35rem', '55rem', '72rem']}
        columns={[1, 1, 2, 2, 3, 4]}
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
    </Box>
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
      py={{ base: selected ? 1.5 : 2, lg: 6 }}
      bgColor="purpleBoxLight"
      borderRadius="0.5rem"
      _hover={!selected ? { bgColor: 'purpleBoxDark' } : undefined}
      cursor={!selected ? 'pointer' : 'default'}
      transition="background 0.25s"
      border="2px"
      borderColor="purple.400"
      px={[selected ? 1.5 : 3, 4]}
      h={selected ? 'auto' : '100%'}
      w="full"
      {...{ onClick }}
    >
      <Flex h="100%" direction={['row', 'column']} align="center">
        <BoxedNextImage
          src={`/assets/roles/${role.role.toLowerCase()}.svg`}
          alt={role.label}
          h={[6, 14]}
          minW={[selected ? 4 : 6, 14]}
          mr={2}
        />
        <Text
          color="white"
          fontWeight="bold"
          casing="uppercase"
          my={[0, 2]}
          letterSpacing="tight"
          onClick={(evt) => {
            if (selected) {
              evt.stopPropagation();
              setShowDetails((show) => !show);
            }
          }}
        >
          {role.label}
        </Text>
        {!mobile && (
          <Text color="white" textAlign="justify">
            {role.description}
          </Text>
        )}
        <Spacer direction="column" />
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
          <Flex justifyContent={['end', 'space-between']} mt={[0, 4]} ml={2}>
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
                  mr={1}
                  px={1}
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
                  _hover={{
                    borderColor: 'purple.900',
                    bgColor: 'blackAlpha.300',
                  }}
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
