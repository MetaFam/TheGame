import {
  Box,
  BoxedNextImage,
  Button,
  Flex,
  LoadingState,
  MetaButton,
  MetaHeading,
  SimpleGrid,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  PlayerRole,
  useUpdatePlayerRolesMutation,
} from 'graphql/autogen/types';
import React, { useMemo, useState } from 'react';

export type RoleValue = string;

export type SetupRolesProps = {
  roleChoices: Array<PlayerRole>;
  roles: RoleValue[];
  fetchingExistingRoles: boolean;
  setRoles: React.Dispatch<React.SetStateAction<RoleValue[]>>;
};

export const SetupRoles: React.FC<SetupRolesProps> = ({
  roleChoices,
  roles,
  fetchingExistingRoles,
  setRoles,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const toast = useToast();

  const computeAvailableRoles = (playerRoles: string[]) =>
    roleChoices.filter((r) => !playerRoles.includes(r.role));

  const [updateRolesResult, updateRoles] = useUpdatePlayerRolesMutation();
  const [loading, setLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<PlayerRole[]>(
    computeAvailableRoles(roles),
  );

  useMemo(() => {
    if (roles.length > 0) {
      setAvailableRoles(roleChoices.filter((r) => !roles.includes(r.role)));
    }
  }, [roles, roleChoices]);

  const handleNextPress = async () => {
    setLoading(true);

    const { error } = await updateRoles({
      roles: roles.map((r, i) => ({
        rank: i,
        role: r,
      })),
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update roles. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    onNextPress();
  };

  const handleSelection = (role: PlayerRole, isPrimary?: boolean) => {
    if (isPrimary === false && roles.length < 1) {
      return;
    }
    let newRoles: RoleValue[] = [];
    const otherRoles = roles.filter((r) => r !== role.role);
    if (isPrimary === true) {
      newRoles = [role.role, ...otherRoles];
    } else {
      newRoles = [...otherRoles, role.role];
    }
    setRoles(newRoles);
    setAvailableRoles(computeAvailableRoles(newRoles));
  };

  const handleRemoval = (role: PlayerRole) => {
    const newRoles = roles.filter((r) => r !== role.role);
    setRoles(newRoles);
    setAvailableRoles(computeAvailableRoles(newRoles));
  };

  return (
    <FlexContainer>
      <MetaHeading mb={16} textAlign="center">
        Select your role(s)
      </MetaHeading>
      {fetchingExistingRoles && <LoadingState />}
      {!fetchingExistingRoles && roles.length === 0 ? (
        <Text mb={10}>
          Unlike other role-playing games, in MetaGame, anyone is free to play
          multiple roles at the same time.
          <br />
          Players are required to specify their primary role, whereas any
          secondary roles are optional.
        </Text>
      ) : (
        <SimpleGrid columns={[1, null, 3, 3]} spacing={4} mb={16}>
          {roles.map((r, i) => {
            const choice = roleChoices.find(
              (roleChoice) => roleChoice.role === r,
            );
            return choice ? (
              <Box key={r}>
                <Text
                  color="cyan.500"
                  fontWeight="bold"
                  casing="uppercase"
                  my="2"
                >
                  {i === 0 ? 'Primary' : 'Secondary'} Role
                </Text>
                <Role
                  role={choice}
                  selectionIndex={i}
                  numSelectedRoles={roles.length}
                  onSelect={handleSelection}
                  onRemove={handleRemoval}
                />
              </Box>
            ) : (
              <></>
            );
          })}
        </SimpleGrid>
      )}
      <Text
        alignSelf="flex-start"
        color="white"
        fontWeight="bold"
        casing="uppercase"
        my="2"
      >
        Available Roles
      </Text>
      <SimpleGrid columns={[1, null, 3, 3]} spacing={4}>
        {availableRoles.map((r) => (
          <Role key={r.role} role={r} onSelect={handleSelection} />
        ))}
      </SimpleGrid>

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isDisabled={roles.length < 1}
        isLoading={updateRolesResult.fetching || loading}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};

type RoleProps = {
  role: PlayerRole;
  selectionIndex?: number;
  numSelectedRoles?: number;
  onSelect: (role: PlayerRole, isPrimary?: boolean) => void;
  onRemove?: (role: PlayerRole) => void;
};

const Role: React.FC<RoleProps> = ({
  role,
  selectionIndex,
  numSelectedRoles,
  onSelect,
  onRemove,
}) => {
  const handleContainerClick = () => {
    if (selectionIndex == null) {
      onSelect(role);
    }
  };

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(role);
    }
  };

  return (
    <FlexContainer
      key={role.role}
      p={[4, null, 6]}
      bgColor="purpleBoxLight"
      borderRadius="0.5rem"
      _hover={selectionIndex == null ? { bgColor: 'purpleBoxDark' } : {}}
      cursor={selectionIndex == null ? 'pointer' : 'default'}
      transition="background 0.25s"
      align="center"
      justify="stretch"
      border="2px"
      borderColor="purple.400"
      onClick={handleContainerClick}
    >
      <BoxedNextImage
        src={`/assets/roles/${role.role.toLowerCase()}.svg`}
        alt={role.label}
        height={14}
        width={14}
      />
      <Text color="white" fontWeight="bold" casing="uppercase" my="2">
        {role.label}
      </Text>
      <Text color="white">{role.description}</Text>
      {selectionIndex != null && (
        <Flex w="100%" justifyContent="space-around" mt={4}>
          {numSelectedRoles != null && numSelectedRoles > 1 && (
            <Button
              variant="outline"
              fontWeight="bold"
              textTransform="uppercase"
              color="purple.200"
              borderColor="purple.200"
              _hover={{
                borderColor: 'transparent',
                bgColor: 'blackAlpha.300',
              }}
              borderWidth={2}
              onClick={() => onSelect(role, selectionIndex !== 0)}
            >
              Make {selectionIndex === 0 ? 'Secondary' : 'Primary'}
            </Button>
          )}
          <Button
            variant="outline"
            fontWeight="bold"
            textTransform="uppercase"
            color="red.500"
            borderColor="red.500"
            borderWidth={2}
            _hover={{ color: 'white', bgColor: 'red.500' }}
            onClick={handleRemoveClick}
          >
            Remove Role
          </Button>
        </Flex>
      )}
    </FlexContainer>
  );
};
