import {
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
import { useUser } from 'lib/hooks';
import Image from 'next/image';
import React, { useState } from 'react';

export type RoleValue = string;

export type SetupRolesProps = {
  roleChoices: Array<PlayerRole>;
  roles: RoleValue[];
  setRoles: React.Dispatch<React.SetStateAction<RoleValue[]>>;
};

export const SetupRoles: React.FC<SetupRolesProps> = ({
  roleChoices,
  roles,
  setRoles,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateRolesResult, updateRoles] = useUpdatePlayerRolesMutation();
  const [loading, setLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<PlayerRole[]>(
    roleChoices,
  );

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);

    const { error } = await updateRoles({
      roles: roles.map((r, i) => ({
        player_id: user.player?.id,
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

  const handleSelection = (isPrimary: boolean, role: PlayerRole) => {
    if (!isPrimary && roles.length < 1) {
      return;
    }
    let newRoles: RoleValue[] = [];
    if (isPrimary) {
      newRoles = [role.role, ...roles.slice(1)];
    } else {
      newRoles = [...roles, role.role];
    }
    setRoles(newRoles);
    setAvailableRoles(roleChoices.filter((r) => !newRoles.includes(r.role)));
  };

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Select your role(s)
      </MetaHeading>
      {roles.length === 0 ? (
        <Text mb={10}>
          Unlike other role-playing games, in MetaGame, anyone is free to play
          multiple roles at the same time.
          <p>
            Players are required to specify their primary role, whereas any
            secondary roles are optional.
          </p>
        </Text>
      ) : (
        roles.map((r, i) => {
          const choice = roleChoices.find(
            (roleChoice) => roleChoice.role === r,
          );
          return choice ? (
            <Role
              key={r}
              role={choice}
              selectionIndex={i}
              onSelect={handleSelection}
            />
          ) : (
            <></>
          );
        })
      )}
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
  onSelect: (isPrimary: boolean, role: PlayerRole) => void;
  selectionIndex?: number | undefined;
  onRemove?: (role: PlayerRole) => void;
};

const Role: React.FC<RoleProps> = ({ role }) => {
  const roleAssetPath = `../../../assets/roles/${role.role.toLowerCase()}`;

  return (
    <FlexContainer
      key={role.role}
      p={[4, null, 6]}
      bgColor="purpleBoxLight"
      borderRadius="0.5rem"
      _hover={{ bgColor: 'purpleBoxDark' }}
      transition="background 0.25s"
      align="stretch"
      justify="flex-start"
      border="2px"
      borderColor="purple.400"
    >
      <Image src={roleAssetPath} alt={role.label} height={14} width={14} />
      <Text color="white" fontWeight="bold" casing="uppercase">
        {role.label}
      </Text>
    </FlexContainer>
  );
};
