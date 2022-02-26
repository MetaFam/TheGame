import {
  Box,
  BoxedNextImage,
  Button,
  CloseIcon,
  Flex,
  InfoIcon,
  LoadingState,
  MetaButton,
  MetaHeading,
  ModalBody,
  ModalFooter,
  Spacer,
  Text,
  useBreakpointValue,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  PlayerRole,
  useUpdatePlayerRolesMutation,
} from 'graphql/autogen/types';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { useUser } from 'lib/hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export type RoleValue = string;

export type SetupRolesProps = {
  roleChoices?: Array<PlayerRole>;
  isEdit?: boolean;
  onClose?: () => void;
};

export const SetupRoles: React.FC<SetupRolesProps> = ({
  roleChoices: inputRoleChoices = [],
  isEdit,
  onClose,
}) => {
  const isWizard = !isEdit;
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const toast = useToast();
  const { fetching: fetchingUser, user } = useUser({
    requestPolicy: 'network-only',
  });
  const [fetchingRoleChoices, setFetchingRoleChoices] = useState(true);
  const [roleChoices, setRoleChoices] = useState<PlayerRole[]>(
    inputRoleChoices,
  );
  useEffect(() => {
    if (inputRoleChoices.length === 0 && roleChoices.length === 0) {
      getPlayerRoles().then((s) => {
        setRoleChoices(s.filter(({ basic }) => basic));
        setFetchingRoleChoices(false);
      });
    } else {
      setFetchingRoleChoices(false);
    }
  }, [inputRoleChoices, roleChoices]);
  const fetching = useMemo(() => fetchingUser || fetchingRoleChoices, [
    fetchingUser,
    fetchingRoleChoices,
  ]);
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    setRoles(user?.roles.map((r) => r.role) ?? []);
  }, [user]);

  const availableRoles = useMemo(
    () =>
      roleChoices.filter(({ role, basic }) => !roles.includes(role) && basic),
    [roles, roleChoices],
  );

  const [updateRolesResult, updateRoles] = useUpdatePlayerRolesMutation();
  const [loading, setLoading] = useState(false);

  const save = useCallback(async () => {
    if (!user) return;

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
    }
  }, [user, roles, toast, updateRoles]);

  const handleNextPress = useCallback(async () => {
    setLoading(true);
    await save();
    onNextPress();
  }, [save, onNextPress]);

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
  };

  const handleRemoval = (role: PlayerRole) => {
    const newRoles = roles.filter((r) => r !== role.role);
    setRoles(newRoles);
  };

  const roleContainerStyles = {
    width: {
      base: 'calc(100% - 4px)',
      md: 'calc(50% - 16px)',
      lg: 'calc(33% - 20px)',
    },
    mr: { base: 0, md: 4 },
    mb: { base: 2, md: 4 },
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  const setup = (
    <FlexContainer
      align="center"
      mx={isWizard ? { base: 0, md: 8, lg: 16 } : 0}
      color="white"
      mb={isWizard ? 'auto' : 0}
    >
      {isWizard && (
        <MetaHeading mb={[0, 5]} alignSelf="center">
          Roles
        </MetaHeading>
      )}
      {fetching && <LoadingState />}
      {!fetching &&
        (roles.length === 0 ? (
          <Box maxW="30rem">
            <Text mb={[6, 10]} textAlign="justify" style={{ textIndent: 25 }}>
              Unlike other role-playing games, in MetaGame, anyone is free to
              play multiple roles at the same time.
            </Text>
            <Text mb={[6, 10]} textAlign="justify" style={{ textIndent: 25 }}>
              Players are required to specify their primary role, whereas any
              secondary roles are optional.
            </Text>
          </Box>
        ) : (
          <Flex wrap="wrap" mb={{ base: 4, md: 16 }} w="100%">
            {roles.map((r, i) => {
              const choice = roleChoices.find(
                (roleChoice) => roleChoice.role === r,
              );
              return (
                choice && (
                  <>
                    <Box key={r} {...roleContainerStyles}>
                      <Text
                        color="cyan.500"
                        fontWeight="bold"
                        casing="uppercase"
                        my="2"
                      >
                        {i === 0 && 'Primary Role'}
                        {i > 0 && roles.length === 2 && 'Secondary Role'}
                        {i === 1 && roles.length > 2 && 'Secondary Roles'}
                        {/* we still need a placeholder */}
                        {!isMobile && roles.length > 2 && i > 1 && (
                          <span>&nbsp;</span>
                        )}
                      </Text>

                      <Role
                        role={choice}
                        selectionIndex={i}
                        numSelectedRoles={roles.length}
                        onSelect={handleSelection}
                        onRemove={handleRemoval}
                      />
                    </Box>
                    {/* wrap after the primary */}
                    {i === 0 && <Box flexBasis="100%" />}
                  </>
                )
              );
            })}
          </Flex>
        ))}
      {availableRoles.length > 0 && !fetching && (
        <>
          <Text
            alignSelf="flex-start"
            color="white"
            fontWeight="bold"
            casing="uppercase"
            my="2"
          >
            Available Roles
          </Text>
          <Flex wrap="wrap" mb={{ base: 6, md: 16 }}>
            {availableRoles.map((r) => (
              <Box key={r.role} {...roleContainerStyles}>
                <Role role={r} onSelect={handleSelection} />
              </Box>
            ))}
          </Flex>
        </>
      )}

      {isWizard && !fetching && (
        <FlexContainer pb={8}>
          <MetaButton
            onClick={handleNextPress}
            isDisabled={roles.length < 1}
            isLoading={updateRolesResult.fetching || loading}
            loadingText="Saving"
          >
            {nextButtonLabel}
          </MetaButton>
        </FlexContainer>
      )}
    </FlexContainer>
  );
  return isWizard ? (
    setup
  ) : (
    <>
      <ModalBody>{setup} </ModalBody>
      {isEdit && onClose && (
        <FlexContainer>
          <ModalFooter py={8}>
            <MetaButton
              mr={3}
              isLoading={loading}
              loadingText="Saving…"
              onClick={async () => {
                await save();
                onClose();
              }}
            >
              Save Changes
            </MetaButton>
            <Button
              variant="ghost"
              onClick={onClose}
              color="white"
              _hover={{ bg: '#FFFFFF11' }}
              _active={{ bg: '#FF000011' }}
              disabled={loading}
            >
              Close
            </Button>
          </ModalFooter>
        </FlexContainer>
      )}
    </>
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
    onRemove?.(role);
  };

  const [showDetails, setShowDetails] = useState(false);
  const selected = selectionIndex != null;
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      onClick={handleContainerClick}
      h={selected ? 'auto' : '100%'}
    >
      <Flex
        direction={{ base: 'row', md: 'column' }}
        align="center"
        justify={{ base: 'space-between', md: 'stretch' }}
      >
        <BoxedNextImage
          src={`/assets/roles/${role.role.toLowerCase()}.svg`}
          alt={role.label}
          h={{ base: 6, md: 14 }}
          minW={{ base: selected ? 4 : 6, md: 14 }}
          mr={2}
        />
        <Text
          color="white"
          fontWeight="bold"
          casing="uppercase"
          my={{ base: 0, md: 2 }}
          onClick={(evt) => {
            if (selected) {
              evt.stopPropagation();
              setShowDetails((show) => !show);
            }
          }}
        >
          {role.label}
        </Text>
        {!isMobile && <Text color="white">{role.description}</Text>}
        <Spacer />
        {isMobile && (numSelectedRoles == null || numSelectedRoles <= 1) && (
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
          <Flex
            w="100%"
            justifyContent={{ base: 'end', md: 'space-between' }}
            mt={{ base: 0, md: 4 }}
            ml={2}
          >
            {numSelectedRoles != null &&
              numSelectedRoles > 1 &&
              (isMobile ? (
                <Button
                  variant="solid"
                  textTransform="uppercase"
                  color="white"
                  bgColor="purple.200"
                  borderColor="purple.200"
                  size="xs"
                  whiteSpace="pre-wrap"
                  mr={2}
                  px={1}
                  onClick={() => onSelect(role, selectionIndex !== 0)}
                >
                  Make {selectionIndex === 0 ? 'Secondary' : 'Primary'}
                </Button>
              ) : (
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
                  fontSize={{ md: '0.875rem', lg: '1rem' }}
                  borderWidth={2}
                  whiteSpace="pre-wrap"
                  onClick={() => onSelect(role, selectionIndex !== 0)}
                >
                  Make {selectionIndex === 0 ? 'Secondary' : 'Primary'}
                </Button>
              ))}
            {isMobile ? (
              <Button
                variant="solid"
                fontWeight="bold"
                textTransform="uppercase"
                color="white"
                bgColor="red.500"
                size="xs"
                onClick={handleRemoveClick}
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
                fontSize={{ md: '0.875rem', lg: '1rem' }}
                onClick={handleRemoveClick}
              >
                Remove
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      {showDetails && (
        <Text color="white" mt={4}>
          {role.description}
        </Text>
      )}
    </Box>
  );
};
